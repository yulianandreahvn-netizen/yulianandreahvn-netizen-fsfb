import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PATIENTS, cn } from '../lib/utils';
import { 
  ArrowLeft, 
  Calendar, 
  ClipboardList, 
  AlertCircle, 
  Stethoscope, 
  Activity,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  Plus,
  CheckCircle2
} from 'lucide-react';

type TabType = 'citas' | 'eventos' | 'alertas' | 'diagnosticos' | 'seguimiento';

export const PatientProfile = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [activeTab, setActiveTab] = useState<TabType>('citas');

  const patient = MOCK_PATIENTS.find(p => p.id === patientId);

  if (!patient) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-900">Paciente no encontrado</h2>
        <Link to="/" className="text-indigo-600 hover:underline mt-4 inline-block">Volver al Dashboard</Link>
      </div>
    );
  }

  const tabs = [
    { id: 'citas', label: 'Citas de Servicio', icon: Calendar },
    { id: 'eventos', label: 'Eventos Clínicos', icon: ClipboardList },
    { id: 'alertas', label: 'Alertas Clínicas', icon: AlertCircle },
    { id: 'diagnosticos', label: 'Diagnósticos', icon: Stethoscope },
    { id: 'seguimiento', label: 'Seguimiento', icon: Activity },
  ];

  return (
    <div className="space-y-8">
      {/* Header & Basic Info */}
      <header className="space-y-6">
        <div className="flex items-center gap-4">
          <Link to={-1 as any} className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-500">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded">
                Expediente Digital
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                ID: {patient.id}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{patient.name}</h1>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Información Básica</p>
            <p className="text-sm font-medium text-slate-700">{patient.age} años • {patient.gender}</p>
            <p className="text-xs text-indigo-600 font-bold">{patient.serviceLine}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contacto</p>
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              {patient.phone || 'No registrado'}
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              {patient.email || 'No registrado'}
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Estado Actual</p>
            <div className="flex items-center gap-2">
              <div className={cn(
                "w-2 h-2 rounded-full",
                patient.status === 'deteccion' && "bg-blue-500",
                patient.status === 'diagnostico' && "bg-amber-500",
                patient.status === 'tratamiento' && "bg-rose-500",
                patient.status === 'seguimiento' && "bg-emerald-500",
              )}></div>
              <span className="text-sm font-bold text-slate-700 capitalize">{patient.status}</span>
            </div>
            <p className="text-[10px] text-slate-500">Origen: {patient.integrationSource}</p>
          </div>
          <div className="flex items-center justify-end">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
              Editar Perfil
            </button>
          </div>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all",
              activeTab === tab.id 
                ? "bg-white text-indigo-600 shadow-sm" 
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm min-h-[400px]">
        {activeTab === 'citas' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900">Próximas Citas</h3>
              <button className="flex items-center gap-2 text-indigo-600 font-bold text-sm hover:underline">
                <Plus className="w-4 h-4" />
                Agendar Cita
              </button>
            </div>
            <div className="space-y-4">
              {patient.appointments.length > 0 ? (
                patient.appointments.map(app => (
                  <div key={app.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{app.service}</p>
                        <p className="text-xs text-slate-500">{app.date} • {app.time} • {app.doctor}</p>
                      </div>
                    </div>
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-widest",
                      app.status === 'Programada' ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-500"
                    )}>
                      {app.status}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-center py-10 text-slate-400 italic">No hay citas programadas.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'eventos' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Línea de Tiempo Clínica</h3>
            <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-100">
              {patient.clinicalEvents.length > 0 ? (
                patient.clinicalEvents.map(event => (
                  <div key={event.id} className="relative flex items-start gap-6 pl-10">
                    <div className="absolute left-0 w-10 h-10 rounded-full bg-white border-4 border-slate-50 flex items-center justify-center text-indigo-600 shadow-sm">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-bold text-slate-900">{event.type}</p>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{event.date}</span>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{event.description}</p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-10 text-slate-400 italic">No hay eventos registrados.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'alertas' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Alertas y Notificaciones</h3>
            <div className="space-y-4">
              {patient.alerts.length > 0 ? (
                patient.alerts.map(alert => (
                  <div key={alert.id} className={cn(
                    "p-4 rounded-2xl border flex items-start gap-4",
                    alert.severity === 'Alta' ? "bg-rose-50 border-rose-100" : "bg-amber-50 border-amber-100"
                  )}>
                    <AlertCircle className={cn(
                      "w-5 h-5 mt-0.5",
                      alert.severity === 'Alta' ? "text-rose-600" : "text-amber-600"
                    )} />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <p className={cn(
                          "font-bold text-sm",
                          alert.severity === 'Alta' ? "text-rose-900" : "text-amber-900"
                        )}>{alert.message}</p>
                        <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">{alert.date}</span>
                      </div>
                      <button className="mt-2 text-[10px] font-bold uppercase tracking-widest text-indigo-600 hover:underline">
                        Marcar como resuelta
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4 opacity-20" />
                  <p className="text-slate-400 italic">No hay alertas activas.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'diagnosticos' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Historial de Diagnósticos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {patient.diagnoses.length > 0 ? (
                patient.diagnoses.map(diag => (
                  <div key={diag.id} className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded uppercase tracking-widest">
                        CIE-10: {diag.code}
                      </span>
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest",
                        diag.status === 'Activo' ? "bg-rose-100 text-rose-700" : "bg-slate-200 text-slate-600"
                      )}>
                        {diag.status}
                      </span>
                    </div>
                    <p className="font-bold text-slate-900 mb-1">{diag.description}</p>
                    {diag.stage && (
                      <p className="text-xs text-slate-500 mb-4">Estadificación: <span className="font-bold text-slate-700">{diag.stage}</span></p>
                    )}
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      <Clock className="w-3.5 h-3.5" />
                      Registrado el {diag.date}
                    </div>
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center py-10 text-slate-400 italic">No hay diagnósticos registrados.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'seguimiento' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Plan & Next Steps */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
                  <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Plan de Seguimiento
                  </h3>
                  <p className="text-indigo-800 leading-relaxed italic">
                    "{patient.followUpPlan}"
                  </p>
                </div>
                
                {/* Comments Section */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Comentarios y Notas de Seguimiento</h4>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">
                        AR
                      </div>
                      <div className="flex-1 space-y-2">
                        <textarea 
                          placeholder="Escribe un comentario o actualización..."
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 min-h-[80px]"
                        ></textarea>
                        <div className="flex justify-end">
                          <button className="bg-indigo-600 text-white px-4 py-1.5 rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors">
                            Publicar Comentario
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="p-4 bg-white border border-slate-100 rounded-2xl">
                        <div className="flex justify-between items-start mb-1">
                          <p className="text-xs font-bold text-slate-900">Dra. Claudia Méndez</p>
                          <span className="text-[10px] text-slate-400 font-bold">Ayer, 14:20</span>
                        </div>
                        <p className="text-sm text-slate-600">Paciente reporta buena tolerancia a la medicación oral. Sin signos de recidiva en examen físico.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Documents Section */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Documentos y Archivos</h4>
                    <button className="flex items-center gap-2 text-indigo-600 font-bold text-xs hover:underline">
                      <Plus className="w-3 h-3" />
                      Adjuntar Archivo
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: 'Epicrisis_Final.pdf', size: '1.2 MB', date: '2024-02-10' },
                      { name: 'Resultados_Lab_Marzo.pdf', size: '850 KB', date: '2024-03-01' }
                    ].map((doc, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors group cursor-pointer">
                        <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                          <ClipboardList className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-900 truncate">{doc.name}</p>
                          <p className="text-[10px] text-slate-500">{doc.size} • {doc.date}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-400 transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Communication Tools */}
              <div className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-6">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Canales de Comunicación</h4>
                  
                  <div className="space-y-3">
                    <button className="w-full flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-2xl hover:border-indigo-300 hover:shadow-sm transition-all group">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-slate-900">Enviar Correo</p>
                        <p className="text-[10px] text-slate-500">Plantillas de seguimiento</p>
                      </div>
                    </button>

                    <button className="w-full flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-2xl hover:border-emerald-300 hover:shadow-sm transition-all group">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-slate-900">WhatsApp</p>
                        <p className="text-[10px] text-slate-500">Recordatorios y alertas</p>
                      </div>
                    </button>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Última Interacción</p>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Clock className="w-3.5 h-3.5" />
                      WhatsApp enviado: 02/03/2024
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Próximos Pasos</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                      <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                      <p className="text-xs text-slate-700">Control de marcadores</p>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                      <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                      <p className="text-xs text-slate-700">Tele-consulta nutrición</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
