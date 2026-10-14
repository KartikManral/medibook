export type PatientStatus = 'waiting' | 'en-route' | 'in-consult' | 'done';
export type PatientType = 'App' | 'Walk-in';
export type AppScreen = 'home' | 'doctor-profile' | 'patient-queue' | 'receptionist';

export interface Patient {
  id: string;
  token: number;
  name: string;
  type: PatientType;
  status: PatientStatus;
  joinedAt: Date;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  clinicName: string;
  location: string;
  experience: number;
  rating: number;
  consultFee: number;
  queueCount: number;
  estWaitMins: number;
  tags: string[];
}
