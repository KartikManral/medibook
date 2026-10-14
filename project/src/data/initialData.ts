import { Doctor, Patient } from '../types';

export const doctors: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Ananya Mehta',
    specialty: 'General Physician & Internal Medicine',
    clinicName: 'Mehta Clinic & Diagnostics',
    location: 'Rajouri Garden, Delhi',
    experience: 14,
    rating: 4.8,
    consultFee: 500,
    queueCount: 6,
    estWaitMins: 42,
    tags: ['Fever', 'Cold & Cough', 'Diabetes'],
  },
  {
    id: 'doc-2',
    name: 'Dr. Suresh Nambiar',
    specialty: 'Cardiologist',
    clinicName: 'HeartCare Centre',
    location: 'Lajpat Nagar, Delhi',
    experience: 22,
    rating: 4.9,
    consultFee: 1200,
    queueCount: 3,
    estWaitMins: 21,
    tags: ['Heart', 'BP', 'ECG'],
  },
  {
    id: 'doc-3',
    name: 'Dr. Priya Joshi',
    specialty: 'Pediatrician',
    clinicName: 'Little Stars Child Clinic',
    location: 'Dwarka, Delhi',
    experience: 9,
    rating: 4.7,
    consultFee: 600,
    queueCount: 8,
    estWaitMins: 56,
    tags: ['Child Health', 'Vaccines', 'Growth'],
  },
];

// Legacy single-doctor export for existing DoctorProfile component
export const doctor = doctors[0];

export const initialPatients: Patient[] = [
  { id: '1', token: 1, name: 'Rahul Sharma', type: 'App', status: 'in-consult', joinedAt: new Date() },
  { id: '2', token: 2, name: 'Priya Patel', type: 'App', status: 'en-route', joinedAt: new Date() },
  { id: '3', token: 3, name: 'Amit Kumar', type: 'Walk-in', status: 'waiting', joinedAt: new Date() },
  { id: '4', token: 4, name: 'Sunita Devi', type: 'App', status: 'waiting', joinedAt: new Date() },
  { id: '5', token: 5, name: 'Vikram Singh', type: 'App', status: 'waiting', joinedAt: new Date() },
  { id: '6', token: 6, name: 'Meera Gupta', type: 'Walk-in', status: 'waiting', joinedAt: new Date() },
];
