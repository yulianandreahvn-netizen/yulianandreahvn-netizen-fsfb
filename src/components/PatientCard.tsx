import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, ChevronRight } from 'lucide-react';
import { Patient, cn } from '../lib/utils';

interface PatientCardProps {
  patient: Patient;
}

export const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  const navigate = useNavigate();
  const priorityColors = {
    Baja: "bg-emerald-100 text-emerald-700",
    Media: "bg-amber-100 text-amber-700",
    Alta: "bg-rose-100 text-rose-700",
  };

  return (
    <div 
      onClick={() => navigate(`/paciente/${patient.id}`)}
      className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-all duration-200 group cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
            {patient.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
              {patient.name}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-xs text-slate-500">{patient.age} años • {patient.gender}</p>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <p className="text-xs font-bold text-indigo-500">{patient.serviceLine}</p>
            </div>
          </div>
        </div>
        <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md", priorityColors[patient.priority])}>
          {patient.priority}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          <span className="bg-slate-100 px-1.5 py-0.5 rounded">{patient.integrationSource}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <Clock className="w-3.5 h-3.5" />
          <span>Última actualización: {patient.lastUpdate}</span>
        </div>
        <p className="text-sm text-slate-600 line-clamp-2 italic">
          "{patient.notes}"
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          ID: {patient.id}
        </div>
        <div className="flex items-center text-indigo-600 text-sm font-semibold gap-1 group-hover:translate-x-1 transition-transform">
          Ver expediente
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
