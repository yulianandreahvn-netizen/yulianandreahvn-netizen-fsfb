import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_PATIENTS, ServiceLine, PatientStatus, cn } from '../lib/utils';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Download,
  MoreHorizontal,
  AlertCircle,
  Clock,
  CheckCircle2,
  Activity
} from 'lucide-react';

export const CohortPhasePage = () => {
  const { cohortName, phase } = useParams<{ cohortName: string, phase: string }>();
  const navigate = useNavigate();
  
  const serviceLine = ['Seno', 'Pulmón', 'Colorrectal', 'Próstata', 'Hematología'].find(
    l => l.toLowerCase() === cohortName?.toLowerCase()
  ) as ServiceLine;

  const statusMap: Record<string, PatientStatus> = {
    deteccion: 'deteccion',
    diagnostico: 'diagnostico',
    tratamiento: 'tratamiento',
    seguimiento: 'seguimiento'
  };

  const currentStatus = statusMap[phase || ''];

  if (!serviceLine || !currentStatus) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-900">Página no encontrada</h2>
        <Link to="/cohortes" className="text-indigo-600 hover:underline mt-4 inline-block">Volver a Cohortes</Link>
      </div>
    );
  }

  const patients = MOCK_PATIENTS.filter(
    p => p.serviceLine === serviceLine && p.status === currentStatus
  );

  const phaseTitles: Record<PatientStatus, string> = {
    deteccion: 'Detección Temprana',
    diagnostico: 'Diagnóstico',
    tratamiento: 'Tratamiento',
    seguimiento: 'Seguimiento'
  };

  const priorityStyles = {
    Baja: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Media: "bg-amber-50 text-amber-700 border-amber-100",
    Alta: "bg-rose-50 text-rose-700 border-rose-100",
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link 
            to={`/cohortes/${cohortName}`} 
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-500"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded">
                Cohorte: {serviceLine}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{phaseTitles[currentStatus]}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar en esta fase..." 
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
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Nombre del Paciente</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Estado de Fase</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Estado de Llegada</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Criticidad</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Resumen Corto</th>
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
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          currentStatus === 'deteccion' && "bg-blue-500",
                          currentStatus === 'diagnostico' && "bg-amber-500",
                          currentStatus === 'tratamiento' && "bg-rose-500",
                          currentStatus === 'seguimiento' && "bg-emerald-500",
                        )}></div>
                        <span className="text-xs font-medium text-slate-600">{phaseTitles[currentStatus]}</span>
                      </div>
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
                      <p className="text-xs text-slate-500 line-clamp-1 max-w-[200px]">
                        {patient.notes}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <Activity className="w-12 h-12 mb-4 opacity-20" />
                      <p className="font-medium">No hay pacientes en esta fase para la cohorte de {serviceLine}</p>
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
