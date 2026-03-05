import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PATIENTS, PatientStatus, cn } from '../lib/utils';
import { 
  LucideIcon, 
  Filter, 
  Download, 
  Search, 
  MoreHorizontal,
  ChevronRight,
  Activity,
  Mail,
  Phone
} from 'lucide-react';

interface ModulePageProps {
  title: string;
  description: string;
  status: PatientStatus;
  icon: LucideIcon;
  colorClass: string;
}

export const ModulePage: React.FC<ModulePageProps> = ({ title, description, status, icon: Icon, colorClass }) => {
  const navigate = useNavigate();
  const patients = MOCK_PATIENTS.filter(p => p.status === status);
  
  const priorityStyles = {
    Baja: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Media: "bg-amber-50 text-amber-700 border-amber-100",
    Alta: "bg-rose-50 text-rose-700 border-rose-100",
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`${colorClass} p-4 rounded-2xl text-white shadow-lg`}>
            <Icon className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                Gestión Operativa
              </span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{title}</h1>
            <p className="text-slate-500 mt-1">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar paciente..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 w-64"
            />
          </div>
          <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50">
            <Filter className="w-5 h-5" />
          </button>
          <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Paciente</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Línea de Servicio</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Origen</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Criticidad</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Última Actualización</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {patients.length > 0 ? (
                patients.map((patient) => (
                  <tr 
                    key={patient.id} 
                    onClick={() => navigate(`/paciente/${patient.id}`)}
                    className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                          {patient.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{patient.name}</p>
                          <p className="text-[10px] text-slate-500">ID: {patient.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium text-slate-600">{patient.serviceLine}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md uppercase tracking-wider">
                        {patient.integrationSource}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-1 rounded-md border",
                        priorityStyles[patient.priority]
                      )}>
                        {patient.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs text-slate-500">{patient.lastUpdate}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {status === 'seguimiento' && (
                          <div className="flex items-center gap-1 mr-2">
                            <button 
                              onClick={(e) => { e.stopPropagation(); /* WhatsApp logic */ }}
                              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                              title="Enviar WhatsApp"
                            >
                              <Phone className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); /* Email logic */ }}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Enviar Correo"
                            >
                              <Mail className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                        <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-400 transition-colors" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <Activity className="w-12 h-12 mb-4 opacity-20" />
                      <p className="font-medium">No hay pacientes en esta etapa actualmente</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
