import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type PatientStatus = 'deteccion' | 'diagnostico' | 'tratamiento' | 'seguimiento';
export type ServiceLine = 'Seno' | 'Pulmón' | 'Colorrectal' | 'Próstata' | 'Hematología' | 'Respiratorias' | 'Cardiología';

export interface Appointment {
  id: string;
  date: string;
  time: string;
  service: string;
  doctor: string;
  status: 'Programada' | 'Completada' | 'Cancelada';
}

export interface ClinicalEvent {
  id: string;
  date: string;
  type: string;
  description: string;
  location: string;
}

export interface ClinicalAlert {
  id: string;
  date: string;
  severity: 'Baja' | 'Media' | 'Alta';
  message: string;
  resolved: boolean;
}

export interface Diagnosis {
  id: string;
  date: string;
  code: string;
  description: string;
  stage?: string;
  status: 'Activo' | 'Resuelto' | 'Crónico';
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'M' | 'F' | 'Otro';
  status: PatientStatus;
  serviceLine: ServiceLine;
  integrationSource: string;
  lastUpdate: string;
  priority: 'Baja' | 'Media' | 'Alta';
  notes: string;
  // Profile details
  email?: string;
  phone?: string;
  appointments: Appointment[];
  clinicalEvents: ClinicalEvent[];
  alerts: ClinicalAlert[];
  diagnoses: Diagnosis[];
  followUpPlan: string;
}

export const MOCK_PATIENTS: Patient[] = [
  // Detección
  {
    id: 'D-001',
    name: 'Juan Pérez',
    age: 45,
    gender: 'M',
    status: 'deteccion',
    serviceLine: 'Pulmón',
    integrationSource: 'Integración Detección',
    lastUpdate: '2024-03-01',
    priority: 'Alta',
    notes: 'Presenta síntomas persistentes. Pendiente de tamizaje inicial.',
    email: 'juan.perez@email.com',
    phone: '+57 300 123 4567',
    appointments: [
      { id: 'a1', date: '2024-03-10', time: '09:00', service: 'Radiología', doctor: 'Dr. Smith', status: 'Programada' }
    ],
    clinicalEvents: [
      { id: 'e1', date: '2024-02-25', type: 'Consulta Inicial', description: 'Paciente refiere tos seca persistente', location: 'Consultorio 102' }
    ],
    alerts: [
      { id: 'al1', date: '2024-03-01', severity: 'Media', message: 'Pendiente autorizar TAC de tórax', resolved: false }
    ],
    diagnoses: [],
    followUpPlan: 'Realizar tamizaje de baja dosis de TAC.'
  },
  {
    id: 'D-002',
    name: 'Elena Torres',
    age: 42,
    gender: 'F',
    status: 'deteccion',
    serviceLine: 'Seno',
    integrationSource: 'Integración Detección',
    lastUpdate: '2024-03-04',
    priority: 'Media',
    notes: 'Hallazgo en autoexploración. Pendiente de mamografía.',
    appointments: [],
    clinicalEvents: [],
    alerts: [],
    diagnoses: [],
    followUpPlan: 'Agendar mamografía bilateral.'
  },
  // Diagnóstico
  {
    id: 'X-001',
    name: 'María García',
    age: 52,
    gender: 'F',
    status: 'diagnostico',
    serviceLine: 'Seno',
    integrationSource: 'Integración Diagnóstico',
    lastUpdate: '2024-02-28',
    priority: 'Media',
    notes: 'Resultados de biopsia pendientes de revisión por oncología.',
    appointments: [
      { id: 'a2', date: '2024-03-15', time: '11:30', service: 'Oncología Médica', doctor: 'Dr. Ruiz', status: 'Programada' }
    ],
    clinicalEvents: [
      { id: 'e2', date: '2024-02-20', type: 'Biopsia', description: 'Biopsia por aguja gruesa en mama derecha', location: 'Sala de Procedimientos' }
    ],
    alerts: [],
    diagnoses: [
      { id: 'd1', date: '2024-02-20', code: 'C50.9', description: 'Tumor maligno de la mama', stage: 'Pendiente', status: 'Activo' }
    ],
    followUpPlan: 'Discutir resultados de patología en comité.'
  },
  {
    id: 'X-002',
    name: 'Luis Sánchez',
    age: 71,
    gender: 'M',
    status: 'diagnostico',
    serviceLine: 'Colorrectal',
    integrationSource: 'Integración Diagnóstico',
    lastUpdate: '2024-03-03',
    priority: 'Alta',
    notes: 'Urgente: Revisión de TAC de tórax.',
    appointments: [],
    clinicalEvents: [],
    alerts: [
      { id: 'al2', date: '2024-03-03', severity: 'Alta', message: 'Hallazgo crítico en TAC: posible metástasis', resolved: false }
    ],
    diagnoses: [
      { id: 'd2', date: '2024-03-01', code: 'C18.9', description: 'Tumor maligno del colon', stage: 'III', status: 'Activo' }
    ],
    followUpPlan: 'Valoración por cirugía oncológica.'
  },
  {
    id: 'X-003',
    name: 'Roberto Gómez',
    age: 68,
    gender: 'M',
    status: 'diagnostico',
    serviceLine: 'Próstata',
    integrationSource: 'Integración Diagnóstico',
    lastUpdate: '2024-03-04',
    priority: 'Media',
    notes: 'PSA elevado. Pendiente de biopsia transrectal.',
    appointments: [],
    clinicalEvents: [],
    alerts: [],
    diagnoses: [],
    followUpPlan: 'Programar biopsia de próstata.'
  },
  // Tratamiento
  {
    id: 'T-001',
    name: 'Carlos Rodríguez',
    age: 60,
    gender: 'M',
    status: 'tratamiento',
    serviceLine: 'Pulmón',
    integrationSource: 'Integración Tratamiento',
    lastUpdate: '2024-03-02',
    priority: 'Alta',
    notes: 'Segunda sesión de quimioterapia programada para mañana.',
    appointments: [
      { id: 'a3', date: '2024-03-05', time: '08:00', service: 'Quimioterapia', doctor: 'Enf. Especialista', status: 'Programada' }
    ],
    clinicalEvents: [
      { id: 'e3', date: '2024-02-15', type: 'Cirugía', description: 'Lobectomía superior derecha', location: 'Quirófano 4' }
    ],
    alerts: [],
    diagnoses: [
      { id: 'd3', date: '2024-01-10', code: 'C34.1', description: 'Carcinoma de pulmón de células no pequeñas', stage: 'IIB', status: 'Activo' }
    ],
    followUpPlan: 'Completar 4 ciclos de quimioterapia adyuvante.'
  },
  {
    id: 'T-002',
    name: 'Sofía Luna',
    age: 29,
    gender: 'F',
    status: 'tratamiento',
    serviceLine: 'Hematología',
    integrationSource: 'Integración Tratamiento',
    lastUpdate: '2024-03-04',
    priority: 'Alta',
    notes: 'Protocolo de inducción para Leucemia. Monitoreo constante.',
    appointments: [],
    clinicalEvents: [],
    alerts: [
      { id: 'al3', date: '2024-03-04', severity: 'Alta', message: 'Neutropenia febril detectada', resolved: false }
    ],
    diagnoses: [
      { id: 'd4', date: '2024-02-28', code: 'C91.0', description: 'Leucemia linfoblástica aguda', status: 'Activo' }
    ],
    followUpPlan: 'Continuar protocolo de inducción.'
  },
  // Seguimiento
  {
    id: 'S-001',
    name: 'Ana Martínez',
    age: 38,
    gender: 'F',
    status: 'seguimiento',
    serviceLine: 'Seno',
    integrationSource: 'Integración Seguimiento',
    lastUpdate: '2024-02-15',
    priority: 'Baja',
    notes: 'En remisión. Control trimestral satisfactorio.',
    appointments: [
      { id: 'a4', date: '2024-05-15', time: '10:00', service: 'Control Oncología', doctor: 'Dr. Ruiz', status: 'Programada' }
    ],
    clinicalEvents: [],
    alerts: [],
    diagnoses: [
      { id: 'd5', date: '2022-05-10', code: 'C50.9', description: 'Antecedente de CA de mama', status: 'Resuelto' }
    ],
    followUpPlan: 'Controles semestrales con mamografía anual.'
  },
  {
    id: 'S-002',
    name: 'Pedro Ruiz',
    age: 65,
    gender: 'M',
    status: 'seguimiento',
    serviceLine: 'Colorrectal',
    integrationSource: 'Integración Seguimiento',
    lastUpdate: '2024-03-01',
    priority: 'Baja',
    notes: 'Post-cirugía exitosa. Control de marcadores tumorales.',
    appointments: [],
    clinicalEvents: [],
    alerts: [],
    diagnoses: [],
    followUpPlan: 'Colonoscopia de control en 1 año.'
  },
  {
    id: 'R-001',
    name: 'Marta Rivas',
    age: 55,
    gender: 'F',
    status: 'tratamiento',
    serviceLine: 'Respiratorias',
    integrationSource: 'Integración Respiratorias',
    lastUpdate: '2024-03-04',
    priority: 'Media',
    notes: 'EPOC grado II. Manejo con broncodilatadores.',
    appointments: [],
    clinicalEvents: [],
    alerts: [],
    diagnoses: [
      { id: 'dr1', date: '2023-11-15', code: 'J44.9', description: 'Enfermedad pulmonar obstructiva crónica', status: 'Crónico' }
    ],
    followUpPlan: 'Espirometría semestral.'
  },
  {
    id: 'C-001',
    name: 'Jorge Herrera',
    age: 62,
    gender: 'M',
    status: 'seguimiento',
    serviceLine: 'Cardiología',
    integrationSource: 'Integración Cardiología',
    lastUpdate: '2024-03-02',
    priority: 'Media',
    notes: 'Post-infarto. Control de presión arterial y lípidos.',
    appointments: [],
    clinicalEvents: [],
    alerts: [],
    diagnoses: [
      { id: 'dc1', date: '2023-05-20', code: 'I21.9', description: 'Infarto agudo de miocardio', status: 'Resuelto' }
    ],
    followUpPlan: 'Ecocardiograma anual y control de perfil lipídico.'
  },
];
