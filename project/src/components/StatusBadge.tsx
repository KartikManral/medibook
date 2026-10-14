import { PatientStatus } from '../types';

interface Props {
  status: PatientStatus;
}

const config: Record<PatientStatus, { label: string; className: string }> = {
  'in-consult': { label: 'In Consult', className: 'bg-primary-100 text-primary-dark font-semibold' },
  'en-route':   { label: 'En Route',   className: 'bg-blue-100 text-blue-700 font-semibold' },
  'waiting':    { label: 'Waiting',    className: 'bg-amber-100 text-amber-700 font-semibold' },
  'done':       { label: 'Done',       className: 'bg-gray-100 text-gray-500 font-semibold' },
};

export default function StatusBadge({ status }: Props) {
  const { label, className } = config[status];
  return (
    <span className={`inline-block text-xs px-2.5 py-1 rounded-full ${className}`}>
      {label}
    </span>
  );
}
