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

      {/* Phases Navigation Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900">Fases de Gestión</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {phases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => navigate(`/cohortes/${cohortName}/${phase.id}`)}
              className="bg-white border border-slate-200 rounded-2xl p-6 text-left hover:shadow-lg transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`${phase.color} p-3 rounded-xl text-white shadow-md`}>
                  <phase.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md">
                  {phase.count} pacientes
                </span>
              </div>
              <h3 className="font-bold text-slate-900 mb-1">{phase.name}</h3>
              <div className="flex items-center text-indigo-600 text-xs font-bold gap-1 group-hover:translate-x-1 transition-transform">
                Ver listado detallado
                <ChevronRight className="w-3 h-3" />
              </div>
            </button>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Distribution Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-500" />
              Distribución por Etapa
            </h3>
            <div className="flex gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Últimos 30 días</span>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Resumen de Cohorte</h3>
          <div className="space-y-6 flex-1">
            {chartData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm font-medium text-slate-600">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-slate-900">{item.value} pacientes</span>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-widest mb-4">
              <Calendar className="w-3.5 h-3.5" />
              Próximos Hitos
            </div>
            <div className="space-y-3">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p className="text-xs font-bold text-slate-900">Comité de Tumores</p>
                <p className="text-[10px] text-slate-500">Mañana, 09:00 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Patient List Section */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Pacientes en {serviceLine}</h2>
            <p className="text-slate-500">Listado completo de la cohorte actual</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cohortPatients.map(patient => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      </section>
    </div>
  );
};
