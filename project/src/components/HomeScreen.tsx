import { useState } from 'react';
import { Search, MapPin, Star, Clock, Users, ChevronRight, Stethoscope } from 'lucide-react';
import { useQueue } from '../context/QueueContext';
import { doctors } from '../data/initialData';
import { Doctor } from '../types';

export default function HomeScreen() {
  const { setScreen, setSelectedDoctorId } = useQueue();
  const [query, setQuery] = useState('');

  const filtered = doctors.filter(doc =>
    query === '' ||
    doc.name.toLowerCase().includes(query.toLowerCase()) ||
    doc.specialty.toLowerCase().includes(query.toLowerCase()) ||
    doc.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
  );

  function handleJoin(doc: Doctor) {
    setSelectedDoctorId(doc.id);
    setScreen('doctor-profile');
  }

  function getQueueColor(count: number) {
    if (count <= 3) return 'text-emerald-600';
    if (count <= 6) return 'text-amber-500';
    return 'text-red-500';
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-emerald-600 px-4 pt-10 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <Stethoscope className="text-white" size={22} />
          <span className="text-white text-xl font-bold tracking-wide">MediBook</span>
        </div>
        <p className="text-emerald-100 text-sm mb-4">Skip the waiting room — join from home</p>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by symptom or doctor name…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
          />
        </div>
      </div>

      {/* Doctor Cards */}
      <div className="px-4 py-4 space-y-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          {filtered.length} doctor{filtered.length !== 1 ? 's' : ''} nearby
        </p>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Search size={36} className="mx-auto mb-2 opacity-40" />
            <p className="text-sm">No doctors match "{query}"</p>
          </div>
        )}

        {filtered.map(doc => (
          <div key={doc.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Card top */}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{doc.name}</h3>
                  <p className="text-sm text-gray-500 truncate">{doc.specialty}</p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                    <MapPin size={11} />
                    <span>{doc.clinicName} · {doc.location}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 justify-end">
                    <Star size={13} className="text-amber-400 fill-amber-400" />
                    <span className="text-sm font-medium text-gray-700">{doc.rating}</span>
                  </div>
                  <p className="text-xs text-gray-400">{doc.experience} yrs exp</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex gap-1.5 mt-3 flex-wrap">
                {doc.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Queue info strip */}
            <div className="border-t border-gray-50 bg-gray-50 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  {/* Live pulse dot */}
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className={`text-sm font-semibold ${getQueueColor(doc.queueCount)}`}>
                    {doc.queueCount} in queue
                  </span>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <Clock size={13} />
                  <span className="text-xs">~{doc.estWaitMins} min wait</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Users size={12} />
                <span>₹{doc.consultFee}</span>
              </div>
            </div>

            {/* Join button */}
            <div className="px-4 pb-4 pt-3">
              <button
                onClick={() => handleJoin(doc)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
              >
                Join Queue
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ))}

        {/* Receptionist shortcut */}
        <button
          onClick={() => setScreen('receptionist')}
          className="w-full text-center text-xs text-gray-400 hover:text-emerald-600 py-2 transition-colors"
        >
          Clinic staff? → Open Receptionist Dashboard
        </button>
      </div>
    </div>
  );
}
