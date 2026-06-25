import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Menu, X, Edit, RotateCcw, Download } from 'lucide-react';
import { TabId, Tab } from '../types';

interface HeaderProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  editMode: boolean;
  setEditMode: (edit: boolean) => void;
  onResetData: () => void;
  onExportPdf: () => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
  editMode,
  setEditMode,
  onResetData,
  onExportPdf
 }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  const tabs: Tab[] = [
    { id: 'about', label: 'Home/About' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  // Track page scroll and direction to hide/reveal top bar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine scrolled styling state
      setScrolled(currentScrollY > 20);

      // Smart header hide-on-scroll-down, show-on-scroll-up
      if (currentScrollY <= 80) {
        // Always show at the top of the page
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down (finger swipes up): hide header
        setVisible(false);
        // Also close mobile menu drawer to keep screen clear
        setMobileMenuOpen(false);
      } else {
        // Scrolling up (finger swipes down): show header
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header
      id="app-header"
      className={`fixed top-4 left-4 right-4 md:sticky md:top-0 md:left-0 md:right-0 md:w-full z-50 transition-all duration-300 transform no-print rounded-2xl md:rounded-none border ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-24 md:-translate-y-full opacity-0 pointer-events-none'
      } ${
        scrolled
          ? 'bg-white/92 dark:bg-charcoal-900/92 backdrop-blur-md shadow-lg border-dusty-blue-100/30 dark:border-charcoal-800/30 py-2.5 md:py-3 px-4 md:px-0'
          : 'bg-white/80 dark:bg-charcoal-900/80 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none py-3 md:py-5 border-dusty-blue-100/10 dark:border-charcoal-800/10 md:border-none px-4 md:px-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand/Logo */}
        <motion.div
          id="header-logo"
          className="flex items-center space-x-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="h-9 w-9 rounded-xl bg-dusty-blue-500 dark:bg-sage-500 flex items-center justify-center shadow-md shadow-dusty-blue-500/20 text-white font-display font-bold text-lg">
            S
          </div>
          <span className="font-display font-bold text-xl text-charcoal-900 dark:text-warm-cream tracking-tight">
            Kunwar<span className="text-dusty-blue-500 dark:text-sage-500">.</span>
          </span>
        </motion.div>

        {/* Desktop Tabs Navigation */}
        <nav id="desktop-nav" className="hidden md:flex items-center space-x-1 bg-dusty-blue-50/50 dark:bg-charcoal-800/40 p-1 rounded-2xl border border-dusty-blue-100/10 dark:border-charcoal-700/20">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                id={`tab-btn-${tab.id}`}
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'text-charcoal-900 dark:text-warm-cream font-semibold'
                    : 'text-charcoal-700/70 dark:text-warm-cream/60 hover:text-charcoal-900 dark:hover:text-warm-cream'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-white dark:bg-charcoal-700 rounded-xl shadow-sm z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Toolbar Controls */}
        <div id="header-controls" className="hidden md:flex items-center space-x-2">
          {/* Print/Download Button */}
          <button
            id="download-resume-btn"
            onClick={onExportPdf}
            title="Download Dynamic CV as PDF"
            className="flex items-center justify-center h-10 px-4 rounded-xl text-sm font-medium bg-dusty-blue-50 dark:bg-charcoal-800 text-dusty-blue-600 dark:text-dusty-blue-500 hover:bg-dusty-blue-100 dark:hover:bg-charcoal-700 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 mr-2" />
            PDF Resume
          </button>

          {/* Quick Edit Mode Button */}
          <button
            id="toggle-edit-mode-btn"
            onClick={() => setEditMode(!editMode)}
            title={editMode ? "Exit Edit Mode" : "Customize CV Data"}
            className={`flex items-center justify-center h-10 w-10 rounded-xl transition-all cursor-pointer ${
              editMode
                ? 'bg-sage-500 text-white shadow-md shadow-sage-500/20'
                : 'bg-dusty-blue-50 dark:bg-charcoal-800 text-charcoal-700 dark:text-warm-cream/80 hover:bg-dusty-blue-100 dark:hover:bg-charcoal-700'
            }`}
          >
            <Edit className="w-4 h-4" />
          </button>

          {/* Reset Changes button (visible only in editMode) */}
          <AnimatePresence>
            {editMode && (
              <motion.button
                id="reset-data-btn"
                onClick={onResetData}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                title="Reset to original developer stats"
                className="flex items-center justify-center h-10 w-10 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Dark Mode Toggle */}
          <button
            id="toggle-dark-mode-btn"
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center justify-center h-10 w-10 rounded-xl bg-dusty-blue-50 dark:bg-charcoal-800 text-charcoal-700 dark:text-warm-cream/80 hover:bg-dusty-blue-100 dark:hover:bg-charcoal-700 transition-all cursor-pointer"
            aria-label="Toggle visual theme"
          >
            {darkMode ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5 text-dusty-blue-600" />}
          </button>
        </div>

        {/* Mobile controls & hamburger button */}
        <div id="mobile-controls" className="flex items-center space-x-2 md:hidden">
          {/* Quick theme toggle */}
          <button
            id="mobile-dark-mode-btn"
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center justify-center h-9 w-9 rounded-lg bg-dusty-blue-50 dark:bg-charcoal-800 text-charcoal-700 dark:text-warm-cream/80"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-dusty-blue-600" />}
          </button>

          {/* Hamburger */}
          <button
            id="hamburger-btn"
            onClick={toggleMobileMenu}
            className="flex items-center justify-center h-9 w-9 rounded-lg bg-dusty-blue-50 dark:bg-charcoal-800 text-charcoal-700 dark:text-warm-cream/80 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer - Beautiful Floating Island Card */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-drawer"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden fixed top-20 left-4 right-4 z-40 bg-white/95 dark:bg-charcoal-900/95 backdrop-blur-lg rounded-2xl shadow-xl border border-dusty-blue-100/30 dark:border-charcoal-800/30 overflow-hidden no-print"
          >
            <div className="px-4 py-4 space-y-2 flex flex-col">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    id={`mobile-tab-btn-${tab.id}`}
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-dusty-blue-500 text-white font-semibold'
                        : 'text-charcoal-700 dark:text-warm-cream/70 hover:bg-dusty-blue-50 dark:hover:bg-charcoal-800/50'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}

              <div className="pt-4 border-t border-dusty-blue-100/20 dark:border-charcoal-800/30 space-y-2">
                <button
                  id="mobile-pdf-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onExportPdf();
                  }}
                  className="flex items-center w-full px-4 py-3 rounded-xl text-base font-medium text-dusty-blue-600 dark:text-dusty-blue-500 hover:bg-dusty-blue-50 dark:hover:bg-charcoal-800"
                >
                  <Download className="w-4 h-4 mr-3" />
                  PDF Resume
                </button>

                <button
                  id="mobile-edit-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setEditMode(!editMode);
                  }}
                  className={`flex items-center w-full px-4 py-3 rounded-xl text-base font-medium ${
                    editMode
                      ? 'bg-sage-100 dark:bg-sage-900/30 text-sage-600'
                      : 'text-charcoal-700 dark:text-warm-cream/70 hover:bg-dusty-blue-50 dark:hover:bg-charcoal-800'
                  }`}
                >
                  <Edit className="w-4 h-4 mr-3" />
                  {editMode ? "Exit Edit Mode" : "Customize CV Info"}
                </button>

                {editMode && (
                  <button
                    id="mobile-reset-btn"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onResetData();
                    }}
                    className="flex items-center w-full px-4 py-3 rounded-xl text-base font-medium text-red-500 hover:bg-red-500/10"
                  >
                    <RotateCcw className="w-4 h-4 mr-3" />
                    Reset CV Data
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
