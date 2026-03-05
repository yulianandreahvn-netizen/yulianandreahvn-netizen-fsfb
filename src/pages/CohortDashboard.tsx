import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_PATIENTS, ServiceLine, cn } from '../lib/utils';
import { PatientCard } from '../components/PatientCard';
import { 
  ArrowLeft, 
  BarChart3, 
  Users, 
  Clock, 
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Search,
  Stethoscope,
  Activity,
  UserRoundCheck,
  ChevronRight
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export const CohortDashboard = () => {
  const { cohortName } = useParams<{ cohortName: string }>();
  const navigate = useNavigate();
  
  // Find the actual service line name (case insensitive)
  const serviceLine = ['Seno', 'Pulmón', 'Colorrectal', 'Próstata', 'Hematología'].find(
    l => l.toLowerCase() === cohortName?.toLowerCase()
  ) as ServiceLine;

  if (!serviceLine) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-900">Cohorte no encontrada</h2>
        <Link to="/cohortes" className="text-indigo-600 hover:underline mt-4 inline-block">Volver a Cohortes</Link>
      </div>
    );
  }

  const cohortPatients = MOCK_PATIENTS.filter(p => p.serviceLine === serviceLine);
  
  const statusCounts = {
    deteccion: cohortPatients.filter(p => p.status === 'deteccion').length,
    diagnostico: cohortPatients.filter(p => p.status === 'diagnostico').length,
    tratamiento: cohortPatients.filter(p => p.status === 'tratamiento').length,
    seguimiento: cohortPatients.filter(p => p.status === 'seguimiento').length,
  };

  const phases = [
    { id: 'deteccion', name: 'Detección Temprana', icon: Search, color: 'bg-blue-500', count: statusCounts.deteccion },
    { id: 'diagnostico', name: 'Diagnóstico', icon: Stethoscope, color: 'bg-amber-500', count: statusCounts.diagnostico },
    { id: 'tratamiento', name: 'Tratamiento', icon: Activity, color: 'bg-rose-500', count: statusCounts.tratamiento },
    { id: 'seguimiento', name: 'Seguimiento', icon: UserRoundCheck, color: 'bg-emerald-500', count: statusCounts.seguimiento },
  ];

  const chartData = [
    { name: 'Detección', value: statusCounts.deteccion, color: '#3b82f6' },
    { name: 'Diagnóstico', value: statusCounts.diagnostico, color: '#f59e0b' },
    { name: 'Tratamiento', value: statusCounts.tratamiento, color: '#f43f5e' },
    { name: 'Seguimiento', value: statusCounts.seguimiento, color: '#10b981' },
  ];

  const indicators = [
    { label: 'Pacientes Activos', value: cohortPatients.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Tiempo Promedio Dx', value: '14 días', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Tasa de Adherencia', value: '94%', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Casos Críticos', value: cohortPatients.filter(p => p.priority === 'Alta').length, icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  return (
    <div className="space-y-10">
      <header className="flex items-center gap-4">
        <Link to="/cohortes" className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-500">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded">
              Dashboard de Cohorte
            </span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Línea de Servicio: {serviceLine}</h1>
        </div>
      </header>

      {/* Indicators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {indicators.map((ind) => (
          <div key={ind.label} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`${ind.bg} ${ind.color} p-3 rounded-xl`}>
                <ind.icon className="w-6 h-6" />
              </div>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-slate-900">{ind.value}</div>
            <div className="text-sm text-slate-500 font-medium">{ind.label}</div>
          </div>
        ))}
      </div>

      {/* Phases Navigation Section - Large Buttons */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-slate-900">Fases de Gestión Operativa</h2>
          <div className="h-px flex-1 bg-slate-200"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {phases.filter(p => p.id !== 'seguimiento').map((phase) => {
            const isTratamiento = phase.id === 'tratamiento';
            const displayName = isTratamiento ? 'Tratamiento y Seguimiento' : phase.name;
            const count = isTratamiento ? (statusCounts.tratamiento + statusCounts.seguimiento) : phase.count;

            return (
              <button
                key={phase.id}
                onClick={() => navigate(`/cohortes/${cohortName}/${phase.id}`)}
                className="group relative bg-white border border-slate-200 rounded-[2.5rem] p-10 text-left hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                {/* Decorative background element */}
                <div className={`absolute top-0 right-0 w-32 h-32 ${phase.color} opacity-5 -mr-8 -mt-8 rounded-full group-hover:scale-150 transition-transform duration-700`}></div>
                
                <div className="relative z-10 space-y-6">
                  <div className={`${phase.color} w-20 h-20 rounded-3xl flex items-center justify-center text-white shadow-xl group-hover:rotate-6 transition-transform duration-500`}>
                    <phase.icon className="w-10 h-10" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{displayName}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Gestión integral de pacientes en etapa de {displayName.toLowerCase()}.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pacientes Activos</span>
                      <span className="text-2xl font-bold text-slate-900">{count}</span>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                      <ChevronRight className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Recent Activity or Summary could go here if needed, but the user asked for large buttons */}
      <section className="bg-indigo-900 rounded-[3rem] p-12 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 tracking-tight">Resumen de Desempeño: {serviceLine}</h2>
            <p className="text-indigo-100 text-lg opacity-80">
              La cohorte presenta un cumplimiento del 92% en los tiempos de respuesta para diagnóstico temprano.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10">
              <div className="text-4xl font-bold mb-1">12.4</div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-60">Días Promedio Dx</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10">
              <div className="text-4xl font-bold mb-1">98%</div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-60">Adherencia Guías</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
