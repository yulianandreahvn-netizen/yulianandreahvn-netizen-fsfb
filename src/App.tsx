import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { CohortsLanding } from './pages/CohortsLanding';
import { CohortDashboard } from './pages/CohortDashboard';
import { CohortPhasePage } from './pages/CohortPhasePage';
import { PatientProfile } from './pages/PatientProfile';
import { ModulePage } from './components/ModulePage';
import { Search, Stethoscope, Activity, Bell, User as UserIcon } from 'lucide-react';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
        <Sidebar />
        
        <main className="flex-1 flex flex-col min-w-0">
          {/* Top Header */}
          <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-4 bg-slate-100 px-4 py-2 rounded-xl w-96">
              <Search className="w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Buscar paciente por nombre o ID..." 
                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400"
              />
            </div>
            
            <div className="flex items-center gap-6">
              <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="h-8 w-px bg-slate-200"></div>
              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Dr. Alejandro Ruiz</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Oncología Médica</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                  <UserIcon className="w-5 h-5" />
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="p-8 max-w-7xl mx-auto w-full">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/indicadores" element={<Dashboard />} />
              <Route path="/cohortes" element={<CohortsLanding />} />
              <Route path="/cohortes/:cohortName" element={<CohortDashboard />} />
              <Route path="/cohortes/:cohortName/:phase" element={<CohortPhasePage />} />
              <Route path="/paciente/:patientId" element={<PatientProfile />} />
              <Route 
                path="/deteccion" 
                element={
                  <ModulePage 
                    title="Detección Temprana" 
                    description="Tamizaje, identificación de factores de riesgo y síntomas iniciales."
                    status="deteccion"
                    icon={Search}
                    colorClass="bg-blue-500"
                  />
                } 
              />
              <Route 
                path="/diagnostico" 
                element={
                  <ModulePage 
                    title="Diagnóstico" 
                    description="Pruebas diagnósticas, biopsias, patología y estadificación."
                    status="diagnostico"
                    icon={Stethoscope}
                    colorClass="bg-amber-500"
                  />
                } 
              />
              <Route 
                path="/tratamiento-seguimiento" 
                element={
                  <ModulePage 
                    title="Tratamiento y Seguimiento" 
                    description="Gestión de quimioterapia, radioterapia, cirugía y monitoreo post-tratamiento."
                    status={['tratamiento', 'seguimiento']}
                    icon={Activity}
                    colorClass="bg-rose-500"
                  />
                } 
              />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}
