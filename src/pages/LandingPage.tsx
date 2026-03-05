import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Layers, 
  BarChart3, 
  ChevronRight, 
  Search, 
  Stethoscope, 
  Activity,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';

export const LandingPage = () => {
  const navigate = useNavigate();

  const modules = [
    {
      id: 'cohortes',
      title: 'Módulo Cohortes',
      description: 'Gestión operativa integral. Incluye el explorador de cohortes, líneas de servicio especializadas y seguimiento por fases.',
      icon: Layers,
      color: 'bg-indigo-600',
      lightColor: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      path: '/cohortes',
      subItems: [
        { name: 'Explorador de Cohortes', icon: Layers, path: '/cohortes' },
        { name: 'Líneas de Servicio (Seno, Pulmón, etc.)', icon: Layers, path: '/cohortes' },
        { name: 'Fases (Detección, Dx, Tratamiento)', icon: Activity, path: '/deteccion' },
      ]
    },
    {
      id: 'indicadores',
      title: 'Indicadores Gerenciales',
      description: 'Análisis de datos de alto nivel, KPIs de rendimiento y distribución de pacientes por líneas de servicio.',
      icon: BarChart3,
      color: 'bg-emerald-600',
      lightColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      path: '/indicadores',
      subItems: [
        { name: 'Dashboard General', icon: BarChart3, path: '/indicadores' },
        { name: 'Análisis por Cohorte', icon: Layers, path: '/cohortes' },
      ]
    }
  ];

  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-12">
      <div className="max-w-4xl mx-auto w-full space-y-12">
        <header className="text-center space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-widest"
          >
            Plataforma Navia
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-bold text-slate-900 tracking-tight"
          >
            Bienvenido al Sistema de Gestión
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500"
          >
            Seleccione un módulo para comenzar a trabajar
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {modules.map((module, idx) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className="group relative bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl hover:border-indigo-100 transition-all duration-500 cursor-pointer overflow-hidden"
              onClick={() => navigate(module.path)}
            >
              <div className={`absolute top-0 right-0 w-40 h-40 ${module.lightColor} opacity-50 -mr-10 -mt-10 rounded-full group-hover:scale-150 transition-transform duration-700`}></div>
              
              <div className="relative z-10 space-y-6">
                <div className={`${module.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform`}>
                  <module.icon className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-slate-900">{module.title}</h2>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {module.description}
                  </p>
                </div>

                <div className="pt-4 space-y-3">
                  {module.subItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-slate-600 group/item">
                      <div className={`w-1.5 h-1.5 rounded-full ${module.color} opacity-40 group-hover/item:opacity-100 transition-opacity`}></div>
                      <span className="text-xs font-bold uppercase tracking-wider">{item.name}</span>
                    </div>
                  ))}
                </div>

                <div className={`pt-6 flex items-center ${module.textColor} font-bold text-sm gap-2 group-hover:gap-4 transition-all`}>
                  Ingresar al módulo
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <button 
            onClick={() => navigate('/cohortes')}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold text-sm transition-colors"
          >
            <Layers className="w-4 h-4" />
            Ir directamente al Explorador de Cohortes
          </button>
        </motion.div>
      </div>
    </div>
  );
};
