import { CheckCircle, Clock, Users, Bell, MapPin, LogOut, Stethoscope, ChevronRight } from 'lucide-react';
import { useQueue } from '../context/QueueContext';
import { doctor } from '../data/initialData';
import { Patient } from '../types';

function QueueCircles({ patients, userTokenId }: { patients: Patient[]; userTokenId: string | null }) {
  const visible = patients.filter(p => p.status !== 'done' || p.id === userTokenId);
  const allActive = patients.filter(p => p.status !== 'done');
  const displayList = [...patients.filter(p => p.status === 'done').slice(-2), ...allActive];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 px-1 scrollbar-hide">
      {displayList.map((p, i) => {
        const isUser = p.id === userTokenId;
        const isDone = p.status === 'done';
        const isInConsult = p.status === 'in-consult';
        const isEnRoute = p.status === 'en-route';

        let bgClass = 'bg-gray-200';
        if (isDone) bgClass = 'bg-primary';
        else if (isInConsult) bgClass = 'bg-primary-dark';
        else if (isEnRoute) bgClass = 'bg-blue-400';

        return (
          <div key={p.id} className="flex flex-col items-center gap-1.5 flex-shrink-0">
            <div className={`relative w-9 h-9 rounded-full flex items-center justify-center ${bgClass} ${isUser ? 'ring-2 ring-offset-1 ring-blue-500' : ''}`}>
              {isDone ? (
                <CheckCircle size={16} className="text-white" />
              ) : (
                <span className="text-white text-xs font-bold">{p.token}</span>
              )}
              {isInConsult && !isUser && (
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border border-white animate-pulse" />
              )}
            </div>
            {isUser && (
              <span className="text-blue-600 text-[9px] font-bold uppercase tracking-wide">You</span>
            )}
          </div>
        );
      })}
      {visible.length === 0 && (
        <div className="text-gray-400 text-sm">Queue is empty</div>
      )}
    </div>
  );
}

interface NotificationCardProps {
  icon: React.ReactNode;
  title: string;
  message: string;
  time: string;
  active: boolean;
  upcoming?: boolean;
}

function NotificationCard({ icon, title, message, time, active, upcoming }: NotificationCardProps) {
  if (!active && !upcoming) return null;
  return (
    <div className={`flex gap-3 p-3 rounded-xl border transition-all ${
      active
        ? 'bg-white border-primary-100 shadow-sm'
        : 'bg-gray-50 border-gray-100 opacity-50'
    }`}>
      <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
        active ? 'bg-primary-light' : 'bg-gray-100'
      }`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className={`text-sm font-semibold ${active ? 'text-gray-800' : 'text-gray-400'}`}>{title}</p>
          <span className="text-gray-400 text-xs flex-shrink-0">{time}</span>
        </div>
        <p className={`text-xs mt-0.5 leading-relaxed ${active ? 'text-gray-600' : 'text-gray-400'}`}>{message}</p>
      </div>
    </div>
  );
}

export default function PatientQueue() {
  const { patients, userTokenId, leaveQueue, getPeopleAhead, getEstWaitMins, setScreen } = useQueue();
  const user = patients.find(p => p.id === userTokenId);
  const peopleAhead = getPeopleAhead();
  const estWait = getEstWaitMins();
  const isNext = peopleAhead === 0;
  const isSoonish = peopleAhead > 0 && peopleAhead <= 3;

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-gray-500 text-sm">Queue session ended.</p>
          <button onClick={() => setScreen('doctor-profile')} className="mt-4 text-primary font-semibold text-sm">
            Back to Doctor Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <div className="bg-primary pt-6 pb-16 px-4">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center">
              <Stethoscope size={15} className="text-primary" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">MediBook</span>
          </div>
          <button
            onClick={() => setScreen('receptionist')}
            className="text-white/70 text-xs flex items-center gap-1 hover:text-white transition-colors"
          >
            Staff <ChevronRight size={12} />
          </button>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <MapPin size={12} className="text-white/60" />
          <p className="text-white/70 text-xs">{doctor.clinicName} · {doctor.location}</p>
        </div>
      </div>

      <div className="px-4 -mt-10 space-y-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 text-center border-b border-gray-100">
            <p className="text-gray-500 text-xs font-medium uppercase tracking-widest mb-2">Your Token</p>
            <div className={`inline-flex items-center justify-center w-28 h-28 rounded-full border-4 mb-3 transition-all ${
              isNext
                ? 'border-primary bg-primary-50'
                : 'border-gray-200 bg-gray-50'
            }`}>
              <div>
                <p className="text-gray-400 text-xs font-semibold">Token</p>
                <p className={`font-bold text-4xl leading-none ${isNext ? 'text-primary' : 'text-gray-800'}`}>
                  #{user.token}
                </p>
              </div>
            </div>

            {isNext ? (
              <div className="flex items-center justify-center gap-2 text-primary">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="font-bold text-base">You're Next — Please Head In!</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-800">{peopleAhead}</p>
                  <p className="text-xs text-gray-400 mt-0.5">ahead of you</p>
                </div>
                <div className="w-px h-10 bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-800">{estWait}</p>
                  <p className="text-xs text-gray-400 mt-0.5">min est. wait</p>
                </div>
              </div>
            )}
          </div>

          <div className="px-5 py-4">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-3">Queue Position</p>
            <QueueCircles patients={patients} userTokenId={userTokenId} />
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-gray-400 text-xs">Done</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-primary-dark" />
                <span className="text-gray-400 text-xs">In consult</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-blue-400" />
                <span className="text-gray-400 text-xs">En route</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-gray-200 ring-2 ring-blue-500 ring-offset-1" />
                <span className="text-gray-400 text-xs">You</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 pt-4 pb-2 flex items-center gap-2">
            <Bell size={14} className="text-primary" />
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Notifications</p>
          </div>
          <div className="px-4 pb-4 space-y-2">
            <NotificationCard
              icon={<CheckCircle size={16} className="text-primary" />}
              title="Queue joined"
              message={`You're token #${user.token} at ${doctor.clinicName}. ₹50 deposit confirmed.`}
              time="Just now"
              active={true}
            />
            <NotificationCard
              icon={<Clock size={16} className={isSoonish || isNext ? 'text-primary' : 'text-gray-300'} />}
              title={`${peopleAhead} ${peopleAhead === 1 ? 'person' : 'people'} ahead — start heading now`}
              message={`It's a good time to leave home. Est. arrival should match your wait time.`}
              time={isSoonish || isNext ? 'Now' : 'Soon'}
              active={isSoonish || isNext}
              upcoming={!isSoonish && !isNext}
            />
            <NotificationCard
              icon={<Users size={16} className={isNext ? 'text-primary' : 'text-gray-300'} />}
              title="You're next!"
              message="Please proceed to the reception desk at the clinic. The doctor is ready."
              time={isNext ? 'Now' : '--'}
              active={isNext}
              upcoming={!isNext}
            />
          </div>
        </div>

        <div className="bg-primary-50 border border-primary-100 rounded-xl p-4 flex items-center gap-3">
          <Clock size={16} className="text-primary flex-shrink-0" />
          <div>
            <p className="text-primary-dark text-sm font-semibold">Queue is live</p>
            <p className="text-gray-600 text-xs mt-0.5">Updates happen in real time. No need to refresh.</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 max-w-md mx-auto">
        <button
          onClick={leaveQueue}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border border-red-200 text-red-500 font-semibold text-sm hover:bg-red-50 active:scale-95 transition-all"
        >
          <LogOut size={16} />
          Leave Queue
        </button>
        <p className="text-center text-xs text-gray-400 mt-2">Your ₹50 deposit will be refunded at the clinic</p>
      </div>
    </div>
  );
}
