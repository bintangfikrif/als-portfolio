import React, { useState, useEffect } from 'react';
import { Award, Briefcase, FileText, Mail, ChevronRight, GraduationCap, Users, Trophy } from 'lucide-react';

const manualTools = [
  { name: 'Microsoft Excel', logo: 'tools/ms_excel.svg' },
  { name: 'Microsoft Word', logo: '/tools/ms_word.svg' },
  { name: 'Microsoft Power Point', logo: '/tools/ms_ppt.svg'},
  { name: 'Python', logo: '/tools/python.svg'},
  { name: 'R', logo: '/tools/r.svg'},
  { name: 'Google Data Studio', logo: '/tools/looker.svg'}
];

function ExperienceTimeline({ items }) {
  const formatDateRange = (item) => {
    const start = item.start_date || item.start_month || item.month_started || item.date_start || item.start;
    const end = item.end_date || item.end_month || item.month_ended || item.date_end || item.end;
    const legacyYear = item.year;

    const normalizedStart = start ? String(start).trim() : '';
    const normalizedEnd = end ? String(end).trim() : '';
    const normalizedYear = legacyYear ? String(legacyYear).trim() : '';

    if (normalizedStart && normalizedEnd) return `${normalizedStart} - ${normalizedEnd}`;
    if (normalizedStart) return normalizedStart;
    if (normalizedEnd) return normalizedEnd;
    if (normalizedYear) return normalizedYear;
    return '';
  };

  return (
    <div className="space-y-10">
      {items.map((item, index) => {
        const dateRange = formatDateRange(item);

        return (
          <div key={index} className="relative pl-8 md:pl-0">
            <div className="md:grid md:grid-cols-4 gap-8 items-start">
              <div className="mb-4 md:mb-0 md:text-right">
                {dateRange && (
                  <span className="text-sm font-bold text-blue-700 uppercase tracking-widest block">{dateRange}</span>
                )}
                <h4 className="font-semibold text-slate-900 mt-1">{item.title}</h4>
                <p className="text-sm text-slate-500">{item.company || item.institution || item.organization}</p>
                {item.tools && item.tools.length > 0 && (
                  <div className="mt-2 flex flex-wrap justify-end gap-2">
                    {item.tools.map((tool, i) => (
                      <span key={i} className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                        {tool}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Garis timeline vertical */}
              <div className={`md:col-span-3 pb-8 md:border-l md:border-slate-200 md:pl-8 relative ${index === items.length - 1 ? 'border-none' : ''}`}>
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
        );
      })}
    </div>
  );
}

function ProjectsGrid({ items }) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {items.map((item, index) => {
        const accessLabel = item.link ? (item.access || item.access_label || item.status || 'Not Public') : 'Not Public';

        return (
          <div key={index} className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="relative aspect-video bg-slate-100 flex items-center justify-center overflow-hidden">
              {item.media ? (
                <img src={item.media} alt={item.title} className="w-full h-full object-cover" />
              ) : (
                <span className="text-slate-400 text-sm font-medium">[Media Proyek]</span>
              )}

              <div className="absolute top-3 right-3">
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center px-3 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-semibold uppercase tracking-wide hover:bg-slate-700 transition-colors"
                  >
                    View Project
                  </a>
                ) : (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-semibold uppercase tracking-wide">
                    {accessLabel}
                  </span>
                )}
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">{item.description}</p>
              {item.tools && item.tools.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {item.tools.map((tool, i) => (
                    <span key={i} className="text-xs font-medium bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">
                      {tool}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AwardsGrid({ items }) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <div key={index} className="text-center p-8 rounded-lg bg-gradient-to-b from-amber-50 to-white border border-amber-100 hover:shadow-md transition-shadow">
          <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center">
            <Trophy className="text-amber-600" size={26} />
          </div>
          <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
          <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-3">
            {item.issuer}{item.issuer && item.year ? ' · ' : ''}{item.year}
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [pengalaman, setPengalaman] = useState([]);
  const [akademik, setAkademik] = useState([]);
  const [organisasi, setOrganisasi] = useState([]);
  const [projects, setProjects] = useState([]);
  const [awards, setAwards] = useState([]);
  const [kredensial, setKredensial] = useState([]);
  const [profil, setProfil] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fungsi untuk mengambil data JSON
    const fetchData = async () => {
      try {
        const [resPengalaman, resAkademik, resOrganisasi, resProjects, resAwards, resKredensial, resProfil] = await Promise.all([
          fetch('/content/pengalaman.json'),
          fetch('/content/akademik.json'),
          fetch('/content/organisasi.json'),
          fetch('/content/projects.json'),
          fetch('/content/awards.json'),
          fetch('/content/kredensial.json'),
          fetch('/content/profil.json') // Ambil data profil
        ]);

        if (resPengalaman.ok) {
          const dataPengalaman = await resPengalaman.json();
          setPengalaman(dataPengalaman.items || []);
        }
        if (resAkademik.ok) {
          const dataAkademik = await resAkademik.json();
          setAkademik(dataAkademik.items || []);
        }
        if (resOrganisasi.ok) {
          const dataOrganisasi = await resOrganisasi.json();
          setOrganisasi(dataOrganisasi.items || []);
        }
        if (resProjects.ok) {
          const dataProjects = await resProjects.json();
          setProjects(dataProjects.items || []);
        }
        if (resAwards.ok) {
          const dataAwards = await resAwards.json();
          setAwards(dataAwards.items || []);
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

            {/* Tampilkan menu Projects HANYA JIKA datanya ada */}
            {projects.length > 0 && (
              <a href="#projects" className="hover:text-blue-700 transition-colors">Projects</a>
            )}

            {/* Tampilkan menu Awards HANYA JIKA datanya ada */}
            {awards.length > 0 && (
              <a href="#awards" className="hover:text-blue-700 transition-colors">Awards</a>
            )}
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
            {/* <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
              <Award size={14} />
              <span>Fellow of the Society of Actuaries</span>
            </div> */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
              Exploring Data, Solving Problems, Creating Insights.
            </h1>
            <p className="text-slate-600 text-lg mb-6 leading-relaxed">
              {profil.deskripsi || "Deskripsi portofolio..."}
            </p>

            {manualTools.length > 0 && (
              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Tools</p>
                <div className="flex flex-wrap gap-3">
                  {manualTools.map((tool, index) => (
                    <div
                      key={`${tool.name}-${index}`}
                      className="inline-flex items-center justify-center w-12 h-12 rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden"
                      title={tool.name}
                    >
                      <img src={tool.logo || '/tool-placeholder.svg'} alt={tool.name} className="w-8 h-8 object-contain" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex space-x-4">
              {/* Render tombol hanya jika profil.resume ada nilainya */}
              {profil.resume && (
                <a 
                  href={profil.resume} 
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="flex items-center space-x-2 bg-blue-700 text-white px-6 py-3 rounded font-medium hover:bg-blue-800 transition-colors shadow-sm"
                >
                  <FileText size={18} />
                  <span>Download Resume</span>
                </a>
              )}
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
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Experience</h2>
          <p className="text-slate-500">Professional, academic, and organizational experience.</p>
        </div>

        <div className="space-y-16">
          {pengalaman.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 mb-8">
                <Briefcase size={18} className="text-blue-700" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Professional</h3>
              </div>
              <ExperienceTimeline items={pengalaman} />
            </div>
          )}

          {akademik.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 mb-8">
                <GraduationCap size={18} className="text-blue-700" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Academic</h3>
              </div>
              <ExperienceTimeline items={akademik} />
            </div>
          )}

          {organisasi.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 mb-8">
                <Users size={18} className="text-blue-700" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Organizational</h3>
              </div>
              <ExperienceTimeline items={organisasi} />
            </div>
          )}
        </div>
      </section>

      {/* Projects Section */}
      {projects.length > 0 && (
        <section id="projects" className="py-20 bg-white border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Projects</h2>
              <p className="text-slate-500">Selected work applying analytical and technical tools to real problems.</p>
            </div>

            <ProjectsGrid items={projects} />
          </div>
        </section>
      )}

      {/* Awards Section */}
      {awards.length > 0 && (
        <section id="awards" className="py-20 max-w-5xl mx-auto px-6 border-t border-slate-200">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Awards</h2>
            <p className="text-slate-500">Recognition earned along the way.</p>
          </div>

          <AwardsGrid items={awards} />
        </section>
      )}

      {}
      {/* Footer / Contact */}
      <section id="contact" className="py-20 bg-slate-100 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Keep in Touch</h2>
          <p className="text-slate-600 mb-8 text-lg">
            Open to discussions about opportunities and technical collaborations. Feel free to reach out via email or connect on LinkedIn and Instagram.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href="mailto:aliyaaaryati754@gmail.com" className="flex items-center space-x-2 bg-white px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-all text-slate-700 hover:text-blue-700 font-medium border border-slate-200 w-full sm:w-auto justify-center">
              <Mail size={20} />
              <span>Email</span>
            </a>
            <a href="https://www.linkedin.com/in/aliyaaryati" className="flex items-center space-x-2 bg-white px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-all text-slate-700 hover:text-blue-700 font-medium border border-slate-200 w-full sm:w-auto justify-center">
              <img src="/linkedin.svg" alt="LinkedIn" className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
            <a href="https://www.instagram.com/aliyaaryti" className="flex items-center space-x-2 bg-white px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-all text-slate-700 hover:text-pink-600 font-medium border border-slate-200 w-full sm:w-auto justify-center">
              <img src="/instagram.svg" alt="Instagram" className="w-5 h-5" />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </section>

      {/* Minimalist Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm">
        <div className="max-w-5xl mx-auto px-6">
          <p>© {new Date().getFullYear()} {profil.nama || "Profil"}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}