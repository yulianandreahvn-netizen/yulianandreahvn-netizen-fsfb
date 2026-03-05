import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type PatientStatus = 'deteccion' | 'diagnostico' | 'tratamiento' | 'seguimiento';
export type ServiceLine = 'Seno' | 'Pulmón' | 'Colorrectal' | 'Próstata' | 'Hematología' | 'Respiratorias' | 'Cardiología';

export interface Appointment {
  id: string;
  creationDate: string;
  appointmentDate: string;
  professional: string;
  status: 'Programada' | 'Completada' | 'Cancelada';
  serviceType: string;
  service: string;
  toxicity?: string;
  relapse?: string;
}

export interface ClinicalEvent {
  id: string;
  eventDate: string;
  eventType: string;
  eventNumber: string;
  agreement: string;
  professional: string;
  consultationReason: string;
  indications: string;
  planAnalysis: string;
  encounterOwner: string;
  serviceOrders: string;
  observations: string;
}

export interface ClinicalAlert {
  id: string;
  startDate: string;
  serviceLine: string;
  cups: string;
  cohort: string;
  cancer: string;
  agreement: string;
  reviewDate: string;
  metastasisSuspicion: string;
  requestDate: string;
  cancerSuspicion: string;
  histology: string;
  radsType: string;
  justification: string;
  specimen: string;
  reportType: string;
  recordType: string;
}

export interface Diagnosis {
  id: string;
  diagnosisCode: string;
  diagnosisType: string;
  codeDescription: string;
  diagnosisClassification: string;
}

export interface TreatmentFollowUp {
  routingDate: string;
  metastasis: string;
  treatmentIntention: string;
  surgery: string;
  admissionStage: string;
  location: string;
  continuity: string;
  extraInstitutionalDiagnosis: string;
  nursingManagement: string;
  falseNursingManagement: string;
  education: string;
  offeredCups1: string;
  offeredCups2: string;
  serviceOffer: string;
  patientAcceptsService: string;
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
  treatmentFollowUp?: TreatmentFollowUp;
  followUpPlan: string;
}

const DEFAULT_TREATMENT: TreatmentFollowUp = {
  routingDate: '2024-01-01',
  metastasis: 'No',
  treatmentIntention: 'Curativa',
  surgery: 'No',
  admissionStage: 'I',
  location: 'Localizado',
  continuity: 'Sí',
  extraInstitutionalDiagnosis: 'No',
  nursingManagement: 'Sí',
  falseNursingManagement: 'No',
  education: 'Pendiente',
  offeredCups1: '---',
  offeredCups2: '---',
  serviceOffer: 'Básico',
  patientAcceptsService: 'Sí'
};

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
      { id: 'a1', creationDate: '2024-03-01', appointmentDate: '2024-03-10', professional: 'Dr. Smith', status: 'Programada', serviceType: 'Consulta', service: 'Radiología' }
    ],
    clinicalEvents: [
      { id: 'e1', eventDate: '2024-02-25', eventType: 'Consulta Inicial', eventNumber: 'EV-1001', agreement: 'EPS Sanitas', professional: 'Dra. Casas', consultationReason: 'Tos persistente', indications: 'TAC de tórax', planAnalysis: 'Posible neoplasia', encounterOwner: 'Dra. Casas', serviceOrders: 'TAC Tórax', observations: 'Paciente fumador' }
    ],
    alerts: [
      { id: 'al1', startDate: '2024-03-01', serviceLine: 'Pulmón', cups: '873340', cohort: 'Cáncer de Pulmón', cancer: 'Sí', agreement: 'EPS Sanitas', reviewDate: '2024-03-02', metastasisSuspicion: 'No', requestDate: '2024-03-01', cancerSuspicion: 'Alta', histology: 'Pendiente', radsType: 'BI-RADS 0', justification: 'Sintomatología clara', specimen: 'N/A', reportType: 'Preliminar', recordType: 'Alerta Temprana' }
    ],
    diagnoses: [],
    treatmentFollowUp: { ...DEFAULT_TREATMENT, routingDate: '2024-03-01', location: 'Pulmón Derecho' },
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
    treatmentFollowUp: { ...DEFAULT_TREATMENT, routingDate: '2024-03-04', location: 'Mama Izquierda' },
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
      { id: 'a2', creationDate: '2024-02-20', appointmentDate: '2024-03-15', professional: 'Dr. Ruiz', status: 'Programada', serviceType: 'Especialidad', service: 'Oncología Médica' }
    ],
    clinicalEvents: [
      { id: 'e2', eventDate: '2024-02-20', eventType: 'Biopsia', eventNumber: 'EV-2002', agreement: 'Sura', professional: 'Dr. Mendez', consultationReason: 'Masa palpable', indications: 'Biopsia Trucut', planAnalysis: 'Confirmación diagnóstica', encounterOwner: 'Dr. Mendez', serviceOrders: 'Biopsia', observations: 'Cuadrante superior externo' }
    ],
    alerts: [],
    diagnoses: [
      { id: 'd1', diagnosisCode: 'C50.9', diagnosisType: 'Principal', codeDescription: 'Tumor maligno de la mama', diagnosisClassification: 'Oncológico' }
    ],
    treatmentFollowUp: { ...DEFAULT_TREATMENT, routingDate: '2024-02-20', location: 'Mama Derecha', admissionStage: 'IIA' },
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
      { id: 'al2', startDate: '2024-03-03', serviceLine: 'Colorrectal', cups: '45231', cohort: 'Cáncer de Colon', cancer: 'Sí', agreement: 'Compensar', reviewDate: '2024-03-03', metastasisSuspicion: 'Alta', requestDate: '2024-03-01', cancerSuspicion: 'Confirmado', histology: 'Adenocarcinoma', radsType: 'N/A', justification: 'Hallazgos imagenológicos', specimen: 'Biopsia Colon', reportType: 'Final', recordType: 'Alerta Crítica' }
    ],
    diagnoses: [
      { id: 'd2', diagnosisCode: 'C18.9', diagnosisType: 'Principal', codeDescription: 'Tumor maligno del colon', diagnosisClassification: 'Oncológico' }
    ],
    treatmentFollowUp: { ...DEFAULT_TREATMENT, routingDate: '2024-03-01', metastasis: 'Sí', admissionStage: 'IV', location: 'Colon Descendente' },
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
    treatmentFollowUp: { ...DEFAULT_TREATMENT, routingDate: '2024-03-04', location: 'Próstata' },
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
      { id: 'a3', creationDate: '2024-02-15', appointmentDate: '2024-03-05', professional: 'Enf. Especialista', status: 'Programada', serviceType: 'Procedimiento', service: 'Quimioterapia', toxicity: 'G1 (Leve)', relapse: 'No' }
    ],
    clinicalEvents: [
      { id: 'e3', eventDate: '2024-02-15', eventType: 'Cirugía', eventNumber: 'EV-3003', agreement: 'Aliansalud', professional: 'Dr. Castro', consultationReason: 'Tratamiento quirúrgico', indications: 'Lobectomía', planAnalysis: 'Resección completa', encounterOwner: 'Dr. Castro', serviceOrders: 'Cirugía', observations: 'Sin complicaciones' }
    ],
    alerts: [],
    diagnoses: [
      { id: 'd3', diagnosisCode: 'C34.1', diagnosisType: 'Principal', codeDescription: 'Carcinoma de pulmón de células no pequeñas', diagnosisClassification: 'Oncológico' }
    ],
    treatmentFollowUp: {
      routingDate: '2024-01-15',
      metastasis: 'No',
      treatmentIntention: 'Curativa',
      surgery: 'Sí',
      admissionStage: 'IIB',
      location: 'Lóbulo superior derecho',
      continuity: 'Sí',
      extraInstitutionalDiagnosis: 'No',
      nursingManagement: 'Sí',
      falseNursingManagement: 'No',
      education: 'Realizada',
      offeredCups1: '99213',
      offeredCups2: '99214',
      serviceOffer: 'Integral',
      patientAcceptsService: 'Sí'
    },
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
      { id: 'al3', startDate: '2024-03-04', serviceLine: 'Hematología', cups: '902204', cohort: 'Leucemia', cancer: 'Sí', agreement: 'Nueva EPS', reviewDate: '2024-03-04', metastasisSuspicion: 'N/A', requestDate: '2024-03-04', cancerSuspicion: 'Confirmado', histology: 'LLA', radsType: 'N/A', justification: 'Neutropenia febril', specimen: 'Médula ósea', reportType: 'Urgente', recordType: 'Alerta Hospitalaria' }
    ],
    diagnoses: [
      { id: 'd4', diagnosisCode: 'C91.0', diagnosisType: 'Principal', codeDescription: 'Leucemia linfoblástica aguda', diagnosisClassification: 'Oncológico' }
    ],
    treatmentFollowUp: { ...DEFAULT_TREATMENT, routingDate: '2024-03-04', location: 'Médula Ósea', treatmentIntention: 'Curativa' },
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
      { id: 'a4', creationDate: '2024-02-10', appointmentDate: '2024-05-15', professional: 'Dr. Ruiz', status: 'Programada', serviceType: 'Control', service: 'Control Oncología' }
    ],
    clinicalEvents: [],
    alerts: [],
    diagnoses: [
      { id: 'd5', diagnosisCode: 'C50.9', diagnosisType: 'Antecedente', codeDescription: 'Antecedente de CA de mama', diagnosisClassification: 'Oncológico' }
    ],
    treatmentFollowUp: { ...DEFAULT_TREATMENT, routingDate: '2023-05-10', surgery: 'Sí', location: 'Mama Derecha', continuity: 'Sí' },
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
    treatmentFollowUp: { ...DEFAULT_TREATMENT, routingDate: '2023-11-20', surgery: 'Sí', location: 'Colon' },
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
      { id: 'dr1', diagnosisCode: 'J44.9', diagnosisType: 'Principal', codeDescription: 'Enfermedad pulmonar obstructiva crónica', diagnosisClassification: 'Crónico' }
    ],
    treatmentFollowUp: { ...DEFAULT_TREATMENT, routingDate: '2024-03-04', location: 'Pulmones', treatmentIntention: 'Paliativa/Control' },
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
      { id: 'dc1', diagnosisCode: 'I21.9', diagnosisType: 'Principal', codeDescription: 'Infarto agudo de miocardio', diagnosisClassification: 'Resuelto' }
    ],
    treatmentFollowUp: { ...DEFAULT_TREATMENT, routingDate: '2024-01-10', surgery: 'Sí', location: 'Corazón' },
    followUpPlan: 'Ecocardiograma anual y control de perfil lipídico.'
  },
];
