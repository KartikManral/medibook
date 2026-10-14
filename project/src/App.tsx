import { QueueProvider, useQueue } from './context/QueueContext';
import HomeScreen from './components/HomeScreen';
import DoctorProfile from './components/DoctorProfile';
import PatientQueue from './components/PatientQueue';
import ReceptionistDashboard from './components/ReceptionistDashboard';

function AppContent() {
  const { screen } = useQueue();

  return (
    <div className="max-w-md mx-auto min-h-screen md:max-w-3xl">
      {screen === 'home' && <HomeScreen />}
      {screen === 'doctor-profile' && <DoctorProfile />}
      {screen === 'patient-queue' && <PatientQueue />}
      {screen === 'receptionist' && <ReceptionistDashboard />}
    </div>
  );
}

export default function App() {
  return (
    <QueueProvider>
      <AppContent />
    </QueueProvider>
  );
}
