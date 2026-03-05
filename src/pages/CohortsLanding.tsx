import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Wind, 
  Activity, 
  User, 
  Droplets,
  ArrowRight,
  Stethoscope,
  Zap
} from 'lucide-react';
import { ServiceLine } from '../lib/utils';

interface CohortDef {
  name: ServiceLine;
  icon: any;
  color: string;
  description: string;
  category: 'Cáncer' | 'Otras Condiciones';
}

const cohorts: CohortDef[] = [
  { 
    name: 'Seno', 
    icon: Heart, 
    color: 'bg-pink-500', 
    description: 'Gestión integral de patología mamaria y oncología ginecológica.',
    category: 'Cáncer'
  },
  { 
    name: 'Pulmón', 
    icon: Wind, 
    color: 'bg-blue-500', 
    description: 'Enfoque en neoplasias torácicas y salud respiratoria oncológica.',
    category: 'Cáncer'
  },
  { 
    name: 'Colorrectal', 
    icon: Activity, 
    color: 'bg-orange-500', 
    description: 'Atención especializada en cáncer de colon, recto y sistema digestivo.',
    category: 'Cáncer'
  },
  { 
    name: 'Próstata', 
    icon: User, 
    color: 'bg-indigo-500', 
    description: 'Servicios de urología oncológica y salud masculina.',
    category: 'Cáncer'
  },
  { 
    name: 'Hematología', 
    icon: Droplets, 
    color: 'bg-red-500', 
    description: 'Manejo de leucemias, linfomas y trastornos hematológicos complejos.',
    category: 'Cáncer'
  },
  { 
    name: 'Respiratorias', 
    icon: Stethoscope, 
    color: 'bg-emerald-500', 
    description: 'Tratamiento de enfermedades pulmonares crónicas y agudas.',
    category: 'Otras Condiciones'
  },
  { 
    name: 'Cardiología', 
    icon: Zap, 
    color: 'bg-rose-500', 
    description: 'Cuidado integral del corazón y sistema cardiovascular.',
    category: 'Otras Condiciones'
  },
];

export const CohortsLanding = () => {
  const navigate = useNavigate();

  const cancerCohorts = cohorts.filter(c => c.category === 'Cáncer');
  const otherCohorts = cohorts.filter(c => c.category === 'Otras Condiciones');

  const renderCohortCard = (cohort: CohortDef) => (
    <button
      key={cohort.name}
      onClick={() => navigate(`/cohortes/${cohort.name.toLowerCase()}`)}
      className="group relative bg-white border border-slate-200 rounded-3xl p-8 text-left hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 ${cohort.color} opacity-5 -mr-8 -mt-8 rounded-full group-hover:scale-150 transition-transform duration-500`}></div>
      
      <div className={`${cohort.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg mb-6 group-hover:rotate-6 transition-transform`}>
        <cohort.icon className="w-8 h-8" />
      </div>

      <h3 className="text-2xl font-bold text-slate-900 mb-2">{cohort.name}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-8">
        {cohort.description}
      </p>

      <div className="flex items-center text-indigo-600 font-bold text-sm gap-2">
        Ver Dashboard de Indicadores
        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
      </div>
    </button>
  );

  return (
    <div className="space-y-16 py-6">
      <header className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Líneas de Servicio por Cohorte</h1>
        <p className="text-lg text-slate-500">
          Seleccione una cohorte para visualizar indicadores clave de desempeño y gestión de pacientes.
        </p>
      </header>

      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-slate-900">Condiciones de Cáncer</h2>
          <div className="h-px flex-1 bg-slate-200"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cancerCohorts.map(renderCohortCard)}
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-slate-900">Otras Condiciones</h2>
          <div className="h-px flex-1 bg-slate-200"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherCohorts.map(renderCohortCard)}
        </div>
      </section>
    </div>
  );
};
