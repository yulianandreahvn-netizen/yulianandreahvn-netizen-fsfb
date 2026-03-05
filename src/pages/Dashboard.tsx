import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MOCK_PATIENTS } from '../lib/utils';
import { PatientCard } from '../components/PatientCard';
import { 
  Users, 
  AlertCircle, 
  CheckCircle2, 
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';

export const Dashboard = () => {
  const navigate = useNavigate();
  const stats = [
    { label: 'Total Pacientes', value: MOCK_PATIENTS.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'En Diagnóstico', value: MOCK_PATIENTS.filter(p => p.status === 'diagnostico').length, icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'En Tratamiento', value: MOCK_PATIENTS.filter(p => p.status === 'tratamiento').length, icon: TrendingUp, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: 'En Seguimiento', value: MOCK_PATIENTS.filter(p => p.status === 'seguimiento').length, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const serviceLines = ['Seno', 'Pulmón', 'Colorrectal', 'Próstata', 'Hematología', 'Respiratorias', 'Cardiología'];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard General</h1>
        <p className="text-slate-500 mt-1">Resumen del estado actual de la red de atención oncológica.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-emerald-600 text-xs font-bold flex items-center gap-0.5 bg-emerald-50 px-2 py-1 rounded-full">
                <ArrowUpRight className="w-3 h-3" />
                +12%
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      <section>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Cohortes por Línea de Servicio</h2>
            <p className="text-sm text-slate-500">Distribución de pacientes por especialidad</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {serviceLines.map((line) => {
            const count = MOCK_PATIENTS.filter(p => p.serviceLine === line).length;
            return (
              <Link 
                key={line} 
                to={`/cohortes/${line.toLowerCase()}`}
                className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col items-center text-center hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2 font-bold text-xs group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  {line.charAt(0)}
                </div>
                <div className="font-bold text-slate-900">{line}</div>
                <div className="text-xs text-slate-500">{count} pacientes activos</div>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Pacientes Recientes</h2>
            <p className="text-sm text-slate-500">Últimas actualizaciones en el sistema</p>
          </div>
          <Link to="/cohortes" className="text-indigo-600 text-sm font-bold hover:underline">Ver todos</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_PATIENTS.slice(0, 3).map(patient => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      </section>
    </div>
  );
};
