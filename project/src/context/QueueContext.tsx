import React, { createContext, useContext, useState, useCallback } from 'react';
import { Patient, PatientStatus, PatientType, AppScreen } from '../types';
import { initialPatients } from '../data/initialData';

interface QueueContextType {
  patients: Patient[];
  screen: AppScreen;
  selectedDoctorId: string;
  userTokenId: string | null;
  setScreen: (screen: AppScreen) => void;
  setSelectedDoctorId: (id: string) => void;
  joinQueue: () => void;
  leaveQueue: () => void;
  markDone: (id: string) => void;
  addWalkIn: () => void;
  getActiveQueue: () => Patient[];
  getPeopleAhead: () => number;
  getEstWaitMins: () => number;
  getQueueSizeForDoctor: () => number;
  getStats: () => { doneToday: number; avgMins: number; noShows: number };
}

const QueueContext = createContext<QueueContextType | null>(null);

const WALK_IN_NAMES = [
  'Ravi Kumar', 'Anita Singh', 'Deepak Sharma', 'Kavita Rao',
  'Suresh Nair', 'Pooja Mishra', 'Arun Verma', 'Nisha Tiwari',
];
const MINS_PER_PATIENT = 7;

export function QueueProvider({ children }: { children: React.ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [screen, setScreen] = useState<AppScreen>('home');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('doc-1');
  const [userTokenId, setUserTokenId] = useState<string | null>(null);
  const [nextToken, setNextToken] = useState(initialPatients.length + 1);
  const [walkInIdx, setWalkInIdx] = useState(0);
  const [noShows] = useState(1);

  const getActiveQueue = useCallback(() => {
    return patients.filter(p => p.status !== 'done');
  }, [patients]);

  const getPeopleAhead = useCallback(() => {
    if (!userTokenId) return getActiveQueue().length;
    const user = patients.find(p => p.id === userTokenId);
    if (!user) return 0;
    return patients.filter(
      p => p.status !== 'done' && p.token < user.token
    ).length;
  }, [patients, userTokenId, getActiveQueue]);

  const getEstWaitMins = useCallback(() => {
    return getPeopleAhead() * MINS_PER_PATIENT;
  }, [getPeopleAhead]);

  const getQueueSizeForDoctor = useCallback(() => {
    return patients.filter(p => p.status !== 'done').length;
  }, [patients]);

  const getStats = useCallback(() => {
    const doneToday = patients.filter(p => p.status === 'done').length;
    return { doneToday, avgMins: MINS_PER_PATIENT, noShows };
  }, [patients, noShows]);

  const joinQueue = useCallback(() => {
    const id = `user-${Date.now()}`;
    const token = nextToken;
    const newPatient: Patient = {
      id,
      token,
      name: 'You',
      type: 'App' as PatientType,
      status: 'waiting' as PatientStatus,
      joinedAt: new Date(),
    };
    setPatients(prev => [...prev, newPatient]);
    setUserTokenId(id);
    setNextToken(t => t + 1);
    setScreen('patient-queue');
  }, [nextToken]);

  const leaveQueue = useCallback(() => {
    setPatients(prev => prev.filter(p => p.id !== userTokenId));
    setUserTokenId(null);
    setScreen('home');
  }, [userTokenId]);

  const markDone = useCallback((id: string) => {
    setPatients(prev => {
      const sorted = [...prev].sort((a, b) => a.token - b.token);
      const updated = sorted.map(p =>
        p.id === id ? { ...p, status: 'done' as PatientStatus } : p
      );

      const inConsultIdx = updated.findIndex(p => p.status === 'in-consult');
      if (inConsultIdx === -1) {
        const nextActive = updated.find(
          p => p.status === 'en-route' || p.status === 'waiting'
        );
        if (nextActive) {
          const nextIdx = updated.indexOf(nextActive);
          updated[nextIdx] = { ...updated[nextIdx], status: 'in-consult' };
          const afterNext = updated.find(
            (p, i) => i > nextIdx && p.status === 'waiting'
          );
          if (afterNext) {
            const afterIdx = updated.indexOf(afterNext);
            updated[afterIdx] = { ...updated[afterIdx], status: 'en-route' };
          }
        }
      }
      return updated;
    });
  }, []);

  const addWalkIn = useCallback(() => {
    const name = WALK_IN_NAMES[walkInIdx % WALK_IN_NAMES.length];
    const token = nextToken;
    const newPatient: Patient = {
      id: `walkin-${Date.now()}`,
      token,
      name,
      type: 'Walk-in' as PatientType,
      status: 'waiting' as PatientStatus,
      joinedAt: new Date(),
    };
    setPatients(prev => [...prev, newPatient]);
    setNextToken(t => t + 1);
    setWalkInIdx(i => i + 1);
  }, [nextToken, walkInIdx]);

  return (
    <QueueContext.Provider value={{
      patients,
      screen,
      selectedDoctorId,
      userTokenId,
      setScreen,
      setSelectedDoctorId,
      joinQueue,
      leaveQueue,
      markDone,
      addWalkIn,
      getActiveQueue,
      getPeopleAhead,
      getEstWaitMins,
      getQueueSizeForDoctor,
      getStats,
    }}>
      {children}
    </QueueContext.Provider>
  );
}

export function useQueue() {
  const ctx = useContext(QueueContext);
  if (!ctx) throw new Error('useQueue must be used within QueueProvider');
  return ctx;
}
