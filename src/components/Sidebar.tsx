import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Search, 
  Stethoscope, 
  Activity, 
  ClipboardList, 
  PlusCircle,
  Layers,
  BarChart3,
  ChevronLeft,
  Menu,
  Home
} from 'lucide-react';
import { cn } from '../lib/utils';

const sidebarStructure = [
  {
    title: 'Módulo Cohortes',
    groups: [
      {
        items: [
          { name: 'Explorador de Cohortes', path: '/cohortes', icon: Layers },
        ]
      },
      {
        label: 'Líneas de Servicio',
        items: [
          { name: 'Seno', path: '/cohortes/seno', icon: Layers },
          { name: 'Pulmón', path: '/cohortes/pulmon', icon: Layers },
          { name: 'Colorrectal', path: '/cohortes/colorrectal', icon: Layers },
          { name: 'Próstata', path: '/cohortes/prostata', icon: Layers },
          { name: 'Hematología', path: '/cohortes/hematologia', icon: Layers },
        ]
      },
      {
        label: 'Fases',
        items: [
          { name: 'Detección Temprana', path: '/deteccion', icon: Search },
          { name: 'Diagnóstico', path: '/diagnostico', icon: Stethoscope },
          { name: 'Tratamiento y Seguimiento', path: '/tratamiento-seguimiento', icon: Activity },
        ]
      }
    ]
  },
  {
    title: 'Indicadores Gerenciales',
    groups: [
      {
        items: [
          { name: 'Dashboard de Indicadores', path: '/indicadores', icon: BarChart3 },
        ]
      }
    ]
  }
];

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={cn(
      "bg-white border-r border-slate-200 h-screen flex flex-col sticky top-0 transition-all duration-300 ease-in-out z-20",
      isCollapsed ? "w-20" : "w-64"
    )}>
      {/* Logo Section */}
      <div className={cn(
        "p-6 border-b border-slate-100 flex items-center justify-between",
        isCollapsed && "px-4 justify-center"
      )}>
        {!isCollapsed && (
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl overflow-hidden whitespace-nowrap">
            <ClipboardList className="w-8 h-8 flex-shrink-0" />
            <span>Navia</span>
          </div>
        )}
        {isCollapsed && <ClipboardList className="w-8 h-8 text-indigo-600" />}
        
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors",
            !isCollapsed && "ml-2"
          )}
        >
          {isCollapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-8 overflow-y-auto scrollbar-hide">
        {/* Home / Landing */}
        <div className="space-y-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-indigo-50 text-indigo-700 shadow-sm" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                isCollapsed && "justify-center px-0"
              )
            }
          >
            <Home className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span>Inicio</span>}
          </NavLink>
        </div>

        {/* Modules */}
        {sidebarStructure.map((module) => (
          <div key={module.title} className="space-y-6">
            {!isCollapsed && (
              <h3 className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">
                {module.title}
              </h3>
            )}
            
            <div className="space-y-6">
              {module.groups.map((group, gIdx) => (
                <div key={gIdx} className="space-y-2">
                  {group.label && !isCollapsed && (
                    <h4 className="px-4 text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                      {group.label}
                    </h4>
                  )}
                  <div className="space-y-1">
                    {group.items.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                            isActive 
                              ? "bg-indigo-50 text-indigo-700 shadow-sm" 
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                            isCollapsed && "justify-center px-0"
                          )
                        }
                        title={isCollapsed ? item.name : ""}
                      >
                        <item.icon className="w-4.5 h-4.5 flex-shrink-0" />
                        {!isCollapsed && <span className="truncate">{item.name}</span>}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button className={cn(
          "w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100",
          isCollapsed ? "px-0" : "px-4"
        )}>
          <PlusCircle className="w-4 h-4 flex-shrink-0" />
          {!isCollapsed && <span className="truncate">Nuevo Paciente</span>}
        </button>
      </div>
    </aside>
  );
};
