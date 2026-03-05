import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MOCK_PATIENTS } from '../lib/utils';
import { 
  Users, 
  AlertCircle, 
  CheckCircle2, 
  TrendingUp,
  ArrowUpRight,
  BarChart3,
  PieChart as PieChartIcon,
  Activity
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

export const Dashboard = () => {
  const stats = [
    { label: 'Total Pacientes', value: MOCK_PATIENTS.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'En Diagnóstico', value: MOCK_PATIENTS.filter(p => p.status === 'diagnostico').length, icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'En Tratamiento', value: MOCK_PATIENTS.filter(p => p.status === 'tratamiento').length, icon: TrendingUp, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: 'En Seguimiento', value: MOCK_PATIENTS.filter(p => p.status === 'seguimiento').length, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const serviceLines = ['Seno', 'Pulmón', 'Colorrectal', 'Próstata', 'Hematología', 'Respiratorias', 'Cardiología'];
  
  const barData = serviceLines.map(line => ({
    name: line,
    pacientes: MOCK_PATIENTS.filter(p => p.serviceLine === line).length
  }));

  const statusData = [
    { name: 'Detección', value: MOCK_PATIENTS.filter(p => p.status === 'deteccion').length, color: '#3b82f6' },
    { name: 'Diagnóstico', value: MOCK_PATIENTS.filter(p => p.status === 'diagnostico').length, color: '#f59e0b' },
    { name: 'Tratamiento', value: MOCK_PATIENTS.filter(p => p.status === 'tratamiento').length, color: '#f43f5e' },
    { name: 'Seguimiento', value: MOCK_PATIENTS.filter(p => p.status === 'seguimiento').length, color: '#10b981' },
  ];

  return (
    <div className="space-y-8">
      <header>
        <div className="flex items-center gap-2 mb-1">
          <BarChart3 className="w-5 h-5 text-indigo-600" />
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Módulo Analítico</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Indicadores Gerenciales</h1>
        <p className="text-slate-500 mt-1">Análisis de rendimiento y distribución de cohortes por línea de servicio.</p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-emerald-600 text-[10px] font-bold flex items-center gap-0.5 bg-emerald-50 px-2 py-1 rounded-full">
                <ArrowUpRight className="w-3 h-3" />
                +8.2%
              </span>
            </div>
            <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart: Patients by Service Line */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Distribución por Línea de Servicio</h3>
            <p className="text-sm text-slate-500">Número total de pacientes activos por especialidad</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="pacientes" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Patients by Status */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Estado de la Cohorte</h3>
            <p className="text-sm text-slate-500">Distribución porcentual por etapa del proceso</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  iconType="circle"
                  formatter={(value) => <span className="text-xs font-bold text-slate-600 uppercase tracking-widest ml-2">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Service Lines Grid */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Exploración por Cohorte</h2>
            <p className="text-sm text-slate-500">Acceso directo a indicadores específicos por línea</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {serviceLines.map((line) => {
            const count = MOCK_PATIENTS.filter(p => p.serviceLine === line).length;
            return (
              <Link 
                key={line} 
                to={`/cohortes/${line.toLowerCase()}`}
                className="bg-white p-6 rounded-3xl border border-slate-200 flex items-center gap-4 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  {line.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-slate-900">{line}</div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{count} Pacientes</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-300 ml-auto group-hover:text-indigo-600 transition-colors" />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};
