import { Plus, CheckCircle2, Clock, UserX, Stethoscope, ChevronLeft, Users } from 'lucide-react';
import { useQueue } from '../context/QueueContext';
import StatusBadge from './StatusBadge';
import { doctor } from '../data/initialData';
import { Patient } from '../types';

function TypeBadge({ type }: { type: Patient['type'] }) {
  return (
    <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-semibold ${
      type === 'App'
        ? 'bg-primary-light text-primary-dark'
        : 'bg-orange-100 text-orange-600'
    }`}>
      {type}
    </span>
  );
}

export default function ReceptionistDashboard() {
  const { patients, markDone, addWalkIn, setScreen, getStats } = useQueue();
  const stats = getStats();

  const sortedPatients = [...patients].sort((a, b) => a.token - b.token);
  const activePatients = sortedPatients.filter(p => p.status !== 'done');
  const donePatients = sortedPatients.filter(p => p.status === 'done');

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setScreen('doctor-profile')}
                className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <ChevronLeft size={16} className="text-gray-600" />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                    <Stethoscope size={13} className="text-white" />
                  </div>
                  <span className="font-bold text-gray-800 text-base">Receptionist</span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{doctor.clinicName}</p>
              </div>
            </div>

            <button
              onClick={addWalkIn}
              className="flex items-center gap-1.5 bg-primary text-white text-sm font-semibold px-3 py-2 rounded-xl hover:bg-primary-dark active:scale-95 transition-all shadow-sm shadow-primary/20"
            >
              <Plus size={15} />
              Add Walk-in
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-5 space-y-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <h2 className="text-gray-800 font-semibold text-sm">Active Queue</h2>
              <span className="bg-primary-50 text-primary-dark text-xs font-bold px-2 py-0.5 rounded-full">
                {activePatients.length}
              </span>
            </div>
          </div>

          {activePatients.length === 0 ? (
            <div className="py-10 flex flex-col items-center text-center px-6">
              <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mb-3">
                <Users size={22} className="text-gray-300" />
              </div>
              <p className="text-gray-500 text-sm font-medium">Queue is empty</p>
              <p className="text-gray-400 text-xs mt-1">Add a walk-in patient to get started</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {activePatients.map(patient => {
                const isInConsult = patient.status === 'in-consult';
                return (
                  <div
                    key={patient.id}
                    className={`flex items-center gap-3 px-5 py-3.5 transition-colors ${
                      isInConsult ? 'bg-primary-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm ${
                      isInConsult ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {patient.token}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-sm font-semibold truncate ${isInConsult ? 'text-primary-dark' : 'text-gray-800'}`}>
                          {patient.name}
                        </span>
                        <TypeBadge type={patient.type} />
                      </div>
                      <div className="mt-1">
                        <StatusBadge status={patient.status} />
                      </div>
                    </div>

                    {isInConsult && (
                      <button
                        onClick={() => markDone(patient.id)}
                        className="flex-shrink-0 flex items-center gap-1.5 bg-primary text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-primary-dark active:scale-95 transition-all shadow-sm"
                      >
                        <CheckCircle2 size={13} />
                        Mark Done
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {donePatients.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-gray-500 font-semibold text-sm">Completed Today</h2>
                <span className="bg-gray-100 text-gray-500 text-xs font-bold px-2 py-0.5 rounded-full">
                  {donePatients.length}
                </span>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {donePatients.map(patient => (
                <div key={patient.id} className="flex items-center gap-3 px-5 py-3 opacity-60">
                  <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={16} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 truncate">{patient.name}</span>
                      <TypeBadge type={patient.type} />
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">Token #{patient.token}</p>
                  </div>
                  <StatusBadge status="done" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 border-b border-gray-100">
            <h2 className="text-gray-800 font-semibold text-sm">Today's Stats</h2>
          </div>
          <div className="grid grid-cols-3 divide-x divide-gray-100">
            <div className="p-5 text-center">
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 size={18} className="text-primary" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{stats.doneToday}</p>
              <p className="text-xs text-gray-400 mt-1 leading-tight">Patients<br />seen</p>
            </div>
            <div className="p-5 text-center">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-2">
                <Clock size={18} className="text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{stats.avgMins}</p>
              <p className="text-xs text-gray-400 mt-1 leading-tight">Avg mins<br />per patient</p>
            </div>
            <div className="p-5 text-center">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mx-auto mb-2">
                <UserX size={18} className="text-red-400" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{stats.noShows}</p>
              <p className="text-xs text-gray-400 mt-1 leading-tight">No-shows<br />today</p>
            </div>
          </div>
        </div>

        <div className="text-center pb-4">
          <p className="text-xs text-gray-300">MediBook Receptionist Dashboard · {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        </div>
      </div>
    </div>
  );
}
