import { MapPin, Star, Clock, Users, Stethoscope, ShieldCheck, ChevronRight, ArrowLeft } from 'lucide-react';
import { useQueue } from '../context/QueueContext';
import { doctor } from '../data/initialData';

export default function DoctorProfile() {
  const { joinQueue, getQueueSizeForDoctor, setScreen } = useQueue();
  const queueSize = getQueueSizeForDoctor();
  const estWait = queueSize * 7;

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="relative bg-primary pb-20 pt-6 px-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setScreen('home')}
              className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <ArrowLeft size={15} className="text-white" />
            </button>
            <div className="flex items-center gap-1.5">
              <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center">
                <Stethoscope size={15} className="text-primary" />
              </div>
              <span className="text-white font-bold text-lg tracking-tight">MediBook</span>
            </div>
          </div>
          <button
            onClick={() => setScreen('receptionist')}
            className="text-white/70 text-xs flex items-center gap-1 hover:text-white transition-colors"
          >
            Staff View <ChevronRight size={12} />
          </button>
        </div>
        <p className="text-primary-100 text-xs mt-1">Virtual Queue · Skip the waiting room</p>
      </div>

      <div className="px-4 -mt-14">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5">
            <div className="flex gap-4 items-start">
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 rounded-xl bg-primary-50 flex items-center justify-center border-2 border-primary-100">
                  <span className="text-3xl font-bold text-primary">A</span>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-primary rounded-full w-5 h-5 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h1 className="text-gray-900 font-bold text-xl leading-tight">{doctor.name}</h1>
                <p className="text-primary text-sm font-medium mt-0.5">{doctor.specialty}</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1">
                    <Star size={13} className="fill-amber-400 text-amber-400" />
                    <span className="text-gray-700 text-sm font-semibold">{doctor.rating}</span>
                  </div>
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-500 text-sm">{doctor.experience} yrs exp.</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <div className="w-6 h-6 rounded-md bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <Stethoscope size={13} className="text-gray-400" />
                </div>
                <span className="font-medium text-gray-800">{doctor.clinicName}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <div className="w-6 h-6 rounded-md bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <MapPin size={13} className="text-gray-400" />
                </div>
                <span>{doctor.location}</span>
              </div>
            </div>
          </div>

          <div className="mx-4 mb-4 rounded-xl bg-primary-50 border border-primary-100 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-gray-700 text-sm font-medium">Live Queue</span>
              </div>
              <span className="text-xs text-primary font-semibold bg-white px-2 py-0.5 rounded-full border border-primary-100">
                Open
              </span>
            </div>
            <div className="flex items-center gap-6 mt-3">
              <div className="flex items-center gap-1.5">
                <Users size={16} className="text-primary" />
                <span className="text-gray-800 text-sm font-semibold">{queueSize} people in queue</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={16} className="text-primary" />
                <span className="text-gray-800 text-sm font-semibold">Est. {estWait} mins</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-4">
            <h2 className="text-gray-800 font-semibold text-sm mb-3">About this Visit</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-500">Consultation Fee</p>
                <p className="text-gray-800 font-bold text-base mt-0.5">₹{doctor.consultFee}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-500">Type</p>
                <p className="text-gray-800 font-bold text-base mt-0.5">In-Clinic</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
          <ShieldCheck size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-800 text-sm font-semibold">₹50 Refundable Deposit</p>
            <p className="text-amber-700 text-xs mt-0.5 leading-relaxed">
              A refundable ₹50 deposit is required to join the queue. It will be returned at the clinic.
            </p>
          </div>
        </div>

        <button
          onClick={joinQueue}
          className="mt-5 w-full bg-primary text-white rounded-xl py-4 font-bold text-base shadow-md shadow-primary/20 active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          <Users size={18} />
          Join Queue · Get Token #{queueSize + 1}
        </button>

        <p className="text-center text-xs text-gray-400 mt-3">
          You'll receive live updates as your turn approaches
        </p>
      </div>
    </div>
  );
}
