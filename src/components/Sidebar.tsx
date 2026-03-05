import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Search, 
  Stethoscope, 
  Activity, 
  ClipboardList, 
  UserRoundCheck,
  PlusCircle,
  Layers
} from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Cohortes', path: '/cohortes', icon: Layers },
  { name: 'Detección Temprana', path: '/deteccion', icon: Search },
  { name: 'Diagnóstico', path: '/diagnostico', icon: Stethoscope },
  { name: 'Tratamiento', path: '/tratamiento', icon: Activity },
  { name: 'Seguimiento', path: '/seguimiento', icon: UserRoundCheck },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen flex flex-col sticky top-0">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
          <ClipboardList className="w-8 h-8" />
          <span>Navia</span>
        </div>
        <p className="text-xs text-slate-500 mt-1 font-medium uppercase tracking-wider">Gestión de Pacientes</p>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-indigo-50 text-indigo-700 shadow-sm" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
          <PlusCircle className="w-4 h-4" />
          Nuevo Paciente
        </button>
      </div>
    </aside>
  );
};
