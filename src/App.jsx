import React, { useState, useEffect } from 'react';
import { Award, Briefcase, FileText, Mail, ChevronRight } from 'lucide-react';

export default function App() {
  const [pengalaman, setPengalaman] = useState([]);
  const [kredensial, setKredensial] = useState([]);
  const [profil, setProfil] = useState({}); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fungsi untuk mengambil data JSON
    const fetchData = async () => {
      try {
        const [resPengalaman, resKredensial, resProfil] = await Promise.all([
          fetch('/content/pengalaman.json'),
          fetch('/content/kredensial.json'),
          fetch('/content/profil.json') // Ambil data profil
        ]);
        
        if (resPengalaman.ok) {
          const dataPengalaman = await resPengalaman.json();
          setPengalaman(dataPengalaman.items || []);
        }
        if (resKredensial.ok) {
          const dataKredensial = await resKredensial.json();
          setKredensial(dataKredensial.items || []);
        }
        if (resProfil.ok) {
          const dataProfil = await resProfil.json();
          setProfil(dataProfil);
        }
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
        <div className="animate-pulse text-lg font-medium">Loading Portfolio...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-900 selection:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-bold text-xl tracking-tight text-slate-900">
            {profil.nama || "Nama Klien"}, <span className="text-blue-700">{profil.titel || "Gelar"}</span>
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
            <a href="#about" className="hover:text-blue-700 transition-colors">Profile</a>
            
            {/* Tampilkan menu Kredensial HANYA JIKA datanya ada */}
            {kredensial.length > 0 && (
              <a href="#credentials" className="hover:text-blue-700 transition-colors">Credentials</a>
            )}
            
            <a href="#experience" className="hover:text-blue-700 transition-colors">Experience</a>
          </div>
          <a href="#contact" className="bg-slate-900 text-white px-5 py-2 text-sm font-medium rounded hover:bg-slate-800 transition-colors">
            Contact Me
          </a>
        </div>
      </nav>

      {}
      {/* Hero Section */}
      <header id="about" className="max-w-5xl mx-auto px-6 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
              <Award size={14} />
              <span>Fellow of the Society of Actuaries</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
              Transforming Risk into calculated Strategy.
            </h1>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              {profil.deskripsi || "Deskripsi portofolio..."}
            </p>
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 bg-blue-700 text-white px-6 py-3 rounded font-medium hover:bg-blue-800 transition-colors shadow-sm">
                <FileText size={18} />
                <span>Download Resume</span>
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/5] bg-slate-200 rounded-lg shadow-inner overflow-hidden flex items-center justify-center border-4 border-white shadow-lg">
              {profil.foto ? (
                <img src={profil.foto} alt={`Foto Profil ${profil.nama}`} className="w-full h-full object-cover" />
              ) : (
                <span className="text-slate-400 font-medium">[Foto Profil Profesional]</span>
              )}
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-xl border border-slate-100 hidden md:block">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Specialization</p>
              <p className="font-semibold text-slate-800">{profil.spesialisasi_singkat || "Spesialisasi"}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Tampilkan Section Kredensial HANYA JIKA datanya lebih dari 0 */}
      {kredensial.length > 0 && (
        <section id="credentials" className="bg-white py-20 border-y border-slate-200">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Sertifikasi & Kredensial</h2>
              <p className="text-slate-500">Status ujian profesional dan lisensi praktik aktuaria.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Map data kredensial dari JSON */}
              {kredensial.map((item, index) => (
                <div key={index} className="p-6 border border-slate-200 rounded-lg hover:shadow-md transition-shadow bg-slate-50">
                  <Award className="text-blue-700 mb-4" size={28} />
                  <h3 className="font-bold text-lg text-slate-900 mb-2">{item.name}</h3>
                  <p className="text-sm text-slate-600 font-medium mb-1">{item.issuer}</p>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      <section id="experience" className="py-20 max-w-5xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Profesional Experience</h2>
          <p className="text-slate-500">Record of implementing predictive models and capital efficiency.</p>
        </div>

        <div className="space-y-10">
          {/* Map data pengalaman dari JSON */}
          {pengalaman.map((item, index) => (
            <div key={index} className="relative pl-8 md:pl-0">
              <div className="md:grid md:grid-cols-4 gap-8 items-start">
                <div className="mb-4 md:mb-0 md:text-right">
                  <span className="text-sm font-bold text-blue-700 uppercase tracking-widest">{item.year}</span>
                  <h4 className="font-semibold text-slate-900 mt-1">{item.title}</h4>
                  <p className="text-sm text-slate-500">{item.company}</p>
                </div>
                
                {/* Garis timeline vertical */}
                <div className={`md:col-span-3 pb-8 md:border-l md:border-slate-200 md:pl-8 relative ${index === pengalaman.length - 1 ? 'border-none' : ''}`}>
                  <div className="hidden md:block absolute w-3 h-3 bg-blue-700 rounded-full -left-[6.5px] top-1.5 ring-4 ring-slate-50"></div>
                  
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  
                  {/* Tampilkan list pencapaian jika ada */}
                  {item.achievements && item.achievements.length > 0 && (
                    <ul className="space-y-2 text-sm text-slate-700">
                      {item.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start">
                          <ChevronRight size={16} className="text-blue-500 mr-2 shrink-0 mt-0.5" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tampilkan foto kegiatan jika ada */}
                  {item.foto_kegiatan && (
                    <div className="mt-6 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 group">
                      <img 
                        src={item.foto_kegiatan} 
                        alt={`Dokumentasi ${item.title}`} 
                        className="w-full h-auto max-h-72 object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {}
      {/* Footer / Contact */}
      <footer id="contact" className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-2">Mari Berdiskusi</h3>
            <p className="text-sm text-slate-400">Terbuka untuk peluang konsultasi dan kolaborasi teknis.</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="p-3 bg-slate-800 rounded-full hover:bg-blue-700 transition-colors text-white">
              <Mail size={20} />
            </a>
            <a href="https://www.linkedin.com/in/aliyaaryati" className="p-3 bg-slate-800 rounded-full hover:bg-blue-700 transition-colors">
              <img src="/linkedin.svg" alt="LinkedIn" className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}