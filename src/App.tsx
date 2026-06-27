import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Download, Eye, RefreshCw, LayoutDashboard } from 'lucide-react';

import { PersonalInfo, ExperienceItem, EducationItem, SkillItem, ProjectItem, TabId } from './types';
import {
  INITIAL_PERSONAL_INFO,
  INITIAL_EXPERIENCE,
  INITIAL_EDUCATION,
  INITIAL_SKILLS,
  INITIAL_PROJECTS,
  getStoredData,
  setStoredData
} from './data';

import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ExperienceSection from './components/ExperienceSection';
import EducationSection from './components/EducationSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import BackToTop from './components/BackToTop';
import FloatingCustomizeControls from './components/FloatingCustomizeControls';
import LoginModal from './components/LoginModal';

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return getStoredData<boolean>('dark_mode', false);
  });

  // Edit/Customize state
  const [editMode, setEditMode] = useState<boolean>(false);

  // Administrative login credentials protection
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('admin_authorized') === 'true';
  });

  const handleToggleEditMode = (newEditValue: boolean) => {
    if (!newEditValue) {
      setEditMode(false);
      return;
    }
    
    if (isAuthenticated) {
      setEditMode(true);
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoginSuccess = () => {
    sessionStorage.setItem('admin_authorized', 'true');
    setIsAuthenticated(true);
    setEditMode(true);
    setShowLoginModal(false);
  };

  // Active section tab
  const [activeTab, setActiveTab] = useState<TabId>('about');

  // Loading animation state on initial page load
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Mouse cursor tracking state for subtle hover glow
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mobile layout state to prevent loading heavy gradient layers on touch screens
  const [isMobile, setIsMobile] = useState<boolean>(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Core portfolio state
  const [info, setInfo] = useState<PersonalInfo>(() => {
    const loaded = getStoredData<PersonalInfo>('personal_info', INITIAL_PERSONAL_INFO);
    if (loaded && typeof loaded === 'object' && !Array.isArray(loaded)) {
      if (!loaded.avatarUrl || loaded.avatarUrl === "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400") {
        loaded.avatarUrl = INITIAL_PERSONAL_INFO.avatarUrl;
      }
      return loaded;
    }
    return INITIAL_PERSONAL_INFO;
  });
  const [experience, setExperience] = useState<ExperienceItem[]>(() => {
    const loaded = getStoredData<ExperienceItem[]>('experience_list', INITIAL_EXPERIENCE);
    return Array.isArray(loaded) ? loaded : INITIAL_EXPERIENCE;
  });
  const [education, setEducation] = useState<EducationItem[]>(() => {
    const loaded = getStoredData<EducationItem[]>('education_list', INITIAL_EDUCATION);
    return Array.isArray(loaded) ? loaded : INITIAL_EDUCATION;
  });
  const [skills, setSkills] = useState<SkillItem[]>(() => {
    const loaded = getStoredData<SkillItem[]>('skills_list', INITIAL_SKILLS);
    const skillsArray = Array.isArray(loaded) ? loaded : INITIAL_SKILLS;
    return skillsArray.map((skill, index) => ({
      ...skill,
      id: skill.id || `skill-${index}-${Date.now()}`
    }));
  });
  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    const loaded = getStoredData<ProjectItem[]>('projects_list', INITIAL_PROJECTS);
    return Array.isArray(loaded) ? loaded : INITIAL_PROJECTS;
  });

  // Track initial loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Sync state changes with localStorage
  useEffect(() => {
    setStoredData('personal_info', info);
  }, [info]);

  useEffect(() => {
    setStoredData('experience_list', experience);
  }, [experience]);

  useEffect(() => {
    setStoredData('education_list', education);
  }, [education]);

  useEffect(() => {
    setStoredData('skills_list', skills);
  }, [skills]);

  useEffect(() => {
    setStoredData('projects_list', projects);
  }, [projects]);

  useEffect(() => {
    setStoredData('dark_mode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Track cursor position for optional background accent aura
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Export CV to printable standard formatted document
  const handleExportPdf = () => {
    window.print();
  };

  // Reset local state to default high-craft database
  const handleResetData = () => {
    if (window.confirm("Are you sure you want to reset all custom portfolio edits? This will restore original benchmarks.")) {
      setInfo(INITIAL_PERSONAL_INFO);
      setExperience(INITIAL_EXPERIENCE);
      setEducation(INITIAL_EDUCATION);
      setSkills(INITIAL_SKILLS);
      setProjects(INITIAL_PROJECTS);
      setEditMode(false);
    }
  };

  // Helper renderer to load current tab section
  const renderActiveSection = () => {
    switch (activeTab) {
      case 'about':
        return (
          <HeroSection
            info={info}
            setInfo={setInfo}
            editMode={editMode}
            onExportPdf={handleExportPdf}
          />
        );
      case 'experience':
        return (
          <ExperienceSection
            experience={experience}
            setExperience={setExperience}
            editMode={editMode}
            info={info}
            setInfo={setInfo}
          />
        );
      case 'education':
        return (
          <EducationSection
            education={education}
            setEducation={setEducation}
            editMode={editMode}
            info={info}
            setInfo={setInfo}
          />
        );
      case 'skills':
        return (
          <SkillsSection
            skills={skills}
            setSkills={setSkills}
            editMode={editMode}
            info={info}
            setInfo={setInfo}
          />
        );
      case 'projects':
        return (
          <ProjectsSection
            projects={projects}
            setProjects={setProjects}
            editMode={editMode}
            info={info}
            setInfo={setInfo}
          />
        );
      case 'contact':
        return (
          <ContactSection
            emailAddress={info.socials.email || ''}
            phoneNumber={info.socials.phone || ''}
            location={info.location}
            editMode={editMode}
            info={info}
            setInfo={setInfo}
          />
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-warm-cream dark:bg-charcoal-900 transition-colors duration-300">
        <div className="w-full max-w-sm px-6 space-y-6 text-center">
          <div className="flex items-center justify-center space-x-2">
            <div className="h-10 w-10 rounded-xl bg-dusty-blue-500 dark:bg-sage-500 flex items-center justify-center text-white font-display font-bold text-xl animate-pulse">
              S
            </div>
            <span className="font-display font-bold text-2xl text-charcoal-900 dark:text-warm-cream tracking-tight">
              Kunwar<span className="text-dusty-blue-500 dark:text-sage-500">.</span>
            </span>
          </div>

          <div className="space-y-2">
            <div className="h-1.5 w-full bg-dusty-blue-100 dark:bg-charcoal-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.3, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-dusty-blue-500 to-sage-500"
              />
            </div>
            <div className="flex items-center justify-between text-xs font-mono text-charcoal-700/60 dark:text-warm-cream/50">
              <span>Establishing Local Database...</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-cream dark:bg-charcoal-900 text-charcoal-900 dark:text-warm-cream transition-colors duration-300 overflow-x-hidden relative">
      
      {/* Subtle Mouse Following Backdrop Accent Glow (Optional and very premium) */}
      {!isMobile && (
        <div
          className="pointer-events-none fixed inset-0 z-0 opacity-10 dark:opacity-[0.07] transition-opacity duration-300 no-print"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, var(--color-dusty-blue-500) 0%, transparent 100%)`
          }}
        />
      )}

      {/* Background Decorative Mesh Orbs (Hardware-accelerated radial gradients prevent browser-level blur border artifacts) */}
      {!isMobile && (
        <>
          <div
            className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] pointer-events-none -z-10 no-print"
            style={{
              background: 'radial-gradient(circle, rgba(92,136,158,0.18) 0%, transparent 70%)'
            }}
          />
          <div
            className="absolute bottom-[20%] left-[-15%] w-[600px] h-[600px] pointer-events-none -z-10 no-print"
            style={{
              background: 'radial-gradient(circle, rgba(123,156,130,0.18) 0%, transparent 70%)'
            }}
          />
        </>
      )}

      {/* Main sticky top header (hidden during printing) */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        editMode={editMode}
        setEditMode={handleToggleEditMode}
        onResetData={handleResetData}
        onExportPdf={handleExportPdf}
      />

      {/* Main Section Content Wrapper */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-24 md:pt-8 relative z-10 no-print">
        
        {/* Helper Banner for Edit Mode indicating sandbox changes are live */}
        <AnimatePresence>
          {editMode && (
            <motion.div
              id="edit-mode-helper-banner"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 p-4 rounded-2xl bg-sage-50 border border-sage-200 dark:bg-sage-900/20 dark:border-sage-800 text-sage-800 dark:text-sage-400 text-xs font-semibold flex items-center justify-between shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-sage-500 animate-ping shrink-0" />
                <span>
                  <strong>Sandbox Edit Mode Enabled:</strong> You can edit any bio text, timeline record, skills, or projects inline. Changes persist automatically to localStorage.
                </span>
              </div>
              <button
                id="exit-banner-btn"
                onClick={() => setEditMode(false)}
                className="underline hover:no-underline font-bold text-sage-600 dark:text-sage-400 cursor-pointer ml-4"
              >
                Done
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab contents with smooth sliding fade animation */}
        <AnimatePresence mode="wait">
          <motion.div
            id={`content-frame-${activeTab}`}
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {renderActiveSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* FULL PRINTABLE RESUME TEMPLATE (Hidden from normal browser viewport, visible only to print engine) */}
      <div id="printable-resume-template" className="hidden print:block p-8 bg-white text-black text-sm max-w-4xl mx-auto space-y-8 font-sans">
        
        {/* Printable Header Section */}
        <div className="flex justify-between items-start border-b-2 border-black pb-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight">{info.name}</h1>
            <h2 className="text-lg font-bold text-gray-700">{info.title}</h2>
            <p className="text-xs text-gray-600 max-w-xl italic mt-1">"{info.tagline}"</p>
          </div>
          
          <div className="text-right text-xs space-y-1 font-mono text-gray-600 shrink-0">
            <p>{info.location}</p>
            <p>{info.socials.email}</p>
            <p>{info.socials.phone}</p>
            <div className="flex justify-end gap-2 pt-1">
              <span>GitHub: github.com</span>
              <span>•</span>
              <span>LinkedIn: linkedin.com</span>
            </div>
          </div>
        </div>

        {/* Biography */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1">Professional Profile</h3>
          <p className="text-xs text-gray-700 leading-relaxed">{info.bio} {info.detailedBio}</p>
        </div>

        {/* Experience Section */}
        <div className="space-y-4 print-break-inside-avoid">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1">Work History</h3>
          <div className="space-y-4">
            {experience.map((item) => (
              <div key={item.id} className="space-y-1.5">
                <div className="flex justify-between font-semibold text-xs">
                  <div>
                    <span className="font-bold text-black">{item.role}</span>
                    <span className="text-gray-500"> @ </span>
                    <span className="font-bold text-gray-800">{item.company}</span>
                  </div>
                  <span className="text-gray-500 font-mono text-right shrink-0">{item.period} | {item.location}</span>
                </div>
                <p className="text-[11px] text-gray-600 italic">{item.description}</p>
                <ul className="list-disc pl-4 space-y-1">
                  {item.achievements.map((ach, idx) => (
                    <li key={idx} className="text-[11px] text-gray-700 leading-snug">{ach}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="space-y-4 print-break-inside-avoid">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1">Academic Background</h3>
          <div className="space-y-3">
            {education.map((item) => (
              <div key={item.id} className="space-y-1">
                <div className="flex justify-between font-semibold text-xs">
                  <div>
                    <span className="font-bold text-black">{item.degree}</span>
                    <span className="text-gray-400"> - </span>
                    <span className="text-gray-800">{item.institution}</span>
                  </div>
                  <span className="text-gray-500 font-mono text-right shrink-0">{item.period} | {item.location}</span>
                </div>
                <p className="text-[11px] text-gray-600">{item.description}</p>
                <ul className="list-disc pl-4 space-y-1">
                  {item.achievements.map((ach, idx) => (
                    <li key={idx} className="text-[11px] text-gray-700 leading-snug">{ach}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="space-y-2 print-break-inside-avoid">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1">Technical Skills & Competencies</h3>
          <div className="grid grid-cols-3 gap-4 text-xs pt-1">
            {['Frontend', 'Backend', 'Tools'].map((cat) => {
              const catSkills = skills.filter((s) => s.category === cat);
              return (
                <div key={cat} className="space-y-1">
                  <h4 className="font-bold text-gray-900 border-b border-gray-200 pb-0.5">{cat}</h4>
                  <p className="text-[10px] text-gray-700 leading-relaxed font-mono">
                    {catSkills.map((s) => `${s.name} (${s.level}%)`).join(', ')}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Compact Interactive Footer */}
      <footer className="py-8 bg-white dark:bg-charcoal-900 border-t border-dusty-blue-100/20 dark:border-charcoal-800/30 text-center text-xs text-charcoal-700/50 dark:text-warm-cream/40 no-print relative z-10">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p>© 2026 {info.name}. Built with architectural precision and creative micro-interactions.</p>
          <div className="flex items-center justify-center space-x-1">
            <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span>Interactive Sandbox State Synchronized with Browser LocalStorage.</span>
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      <BackToTop />

      {/* Floating Customize Controls for quick sandbox editing access */}
      <FloatingCustomizeControls
        editMode={editMode}
        setEditMode={handleToggleEditMode}
        onResetData={handleResetData}
      />

      {/* Admin Authorization Access Key Gate */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
      />

    </div>
  );
}
