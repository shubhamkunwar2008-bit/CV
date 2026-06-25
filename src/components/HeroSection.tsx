import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, FileText, Sparkles, CheckCircle2 } from 'lucide-react';
import { PersonalInfo } from '../types';

interface HeroSectionProps {
  info: PersonalInfo;
  setInfo: (info: PersonalInfo) => void;
  editMode: boolean;
  onExportPdf: () => void;
}

export default function HeroSection({ info, setInfo, editMode, onExportPdf }: HeroSectionProps) {
  const handleInputChange = (field: keyof PersonalInfo, value: any) => {
    setInfo({
      ...info,
      [field]: value
    });
  };

  const handlePillarChange = (index: number, value: string) => {
    const newPillars = [...(info.pillars || [
      "Pixel-perfect Frontend Engineering",
      "Accessible & Performant Layouts",
      "Creative Interactive Prototypes",
      "Modern API & Database Architectures"
    ])];
    newPillars[index] = value;
    setInfo({
      ...info,
      pillars: newPillars
    });
  };

  const handleSocialChange = (field: keyof typeof info.socials, value: string) => {
    setInfo({
      ...info,
      socials: {
        ...info.socials,
        [field]: value
      }
    });
  };

  return (
    <section id="hero-section" className="py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Photo & Quick Contact Card */}
        <motion.div
          id="hero-left-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="lg:col-span-4 flex flex-col items-center"
        >
          {/* Avatar container with interactive floating visual background */}
          <div className="relative group w-60 h-60 md:w-64 md:h-64 mb-6">
            {/* Highly crafted rotating double-ring decoration (completely immune to GPU rendering blurs/glitches on mobile devices) */}
            <div className="absolute -inset-4 rounded-[2.5rem] border-2 border-dashed border-dusty-blue-500/20 dark:border-sage-500/20 md:animate-[spin_120s_linear_infinite] pointer-events-none" />
            <div className="absolute -inset-2 rounded-[2.3rem] border border-sage-500/15 dark:border-dusty-blue-500/15 md:animate-[spin_80s_linear_infinite_reverse] pointer-events-none" />
            
            <div className="relative w-full h-full rounded-[2.2rem] overflow-hidden border-4 border-white dark:border-charcoal-800 shadow-xl group-hover:scale-[1.02] transition-transform duration-300">
              {editMode ? (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4 text-center z-10">
                  <span className="text-white text-xs mb-2">Image URL:</span>
                  <input
                    id="edit-avatar-url"
                    type="text"
                    value={info.avatarUrl}
                    onChange={(e) => handleInputChange('avatarUrl', e.target.value)}
                    className="w-full text-xs p-1 bg-charcoal-800 border border-charcoal-700 text-white rounded focus:outline-none"
                    placeholder="Unsplash / Image URL"
                  />
                </div>
              ) : null}
              <img
                src={info.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400"}
                alt={info.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Micro indicator tag (fully customizable and interactive in edit mode) */}
            <div 
              className={`absolute -bottom-2 -right-2 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center shadow-md transition-all duration-300 ${
                info.isAvailableForHire !== false 
                  ? "bg-emerald-500 shadow-emerald-500/20" 
                  : "bg-charcoal-500 dark:bg-charcoal-700 shadow-charcoal-500/20"
              }`}
            >
              {editMode ? (
                <div className="flex items-center gap-1.5 no-print">
                  <input
                    type="checkbox"
                    checked={info.isAvailableForHire !== false}
                    onChange={(e) => handleInputChange('isAvailableForHire', e.target.checked)}
                    className="cursor-pointer h-3.5 w-3.5 rounded accent-emerald-600 bg-white"
                    title="Toggle active availability"
                  />
                  <input
                    type="text"
                    value={info.availableText || 'Available for Hire'}
                    onChange={(e) => handleInputChange('availableText', e.target.value)}
                    className="bg-transparent text-white w-28 text-xs font-semibold focus:outline-none border-b border-white/40 focus:border-white py-0.5"
                    placeholder="Status badge text"
                  />
                </div>
              ) : (
                <>
                  <span className={`h-2 w-2 rounded-full mr-1.5 ${
                    info.isAvailableForHire !== false ? "bg-white animate-pulse" : "bg-white/40"
                  }`} />
                  {info.availableText || (info.isAvailableForHire !== false ? "Available for Hire" : "Not Looking for Hire")}
                </>
              )}
            </div>
          </div>

          {/* Quick Contact & Details */}
          <div className="w-full bg-white dark:bg-charcoal-800/50 p-6 rounded-3xl shadow-sm border border-dusty-blue-50/10 dark:border-charcoal-800/10 space-y-4">
            <h3 className="font-display font-bold text-charcoal-900 dark:text-warm-cream text-base border-b border-dusty-blue-100/30 dark:border-charcoal-800/30 pb-2">
              Contact Details
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex items-center text-charcoal-800 dark:text-warm-cream/80">
                <MapPin className="w-4 h-4 text-dusty-blue-500 mr-3 shrink-0" />
                {editMode ? (
                  <input
                    id="edit-location"
                    type="text"
                    value={info.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full border-b border-dusty-blue-100 dark:border-charcoal-800 bg-transparent py-0.5 focus:outline-none"
                  />
                ) : (
                  <span>{info.location}</span>
                )}
              </div>

              <div className="flex items-center text-charcoal-800 dark:text-warm-cream/80">
                <Mail className="w-4 h-4 text-dusty-blue-500 mr-3 shrink-0" />
                {editMode ? (
                  <input
                    id="edit-email"
                    type="email"
                    value={info.socials.email}
                    onChange={(e) => handleSocialChange('email', e.target.value)}
                    className="w-full border-b border-dusty-blue-100 dark:border-charcoal-800 bg-transparent py-0.5 focus:outline-none"
                  />
                ) : (
                  <a href={`mailto:${info.socials.email}`} className="hover:text-dusty-blue-500 transition-colors">
                    {info.socials.email}
                  </a>
                )}
              </div>

              <div className="flex items-center text-charcoal-800 dark:text-warm-cream/80">
                <Phone className="w-4 h-4 text-dusty-blue-500 mr-3 shrink-0" />
                {editMode ? (
                  <input
                    id="edit-phone"
                    type="text"
                    value={info.socials.phone}
                    onChange={(e) => handleSocialChange('phone', e.target.value)}
                    className="w-full border-b border-dusty-blue-100 dark:border-charcoal-800 bg-transparent py-0.5 focus:outline-none"
                  />
                ) : (
                  <span>{info.socials.phone}</span>
                )}
              </div>
            </div>

            {/* Social icons */}
            <div className="flex justify-center space-x-3 pt-3 border-t border-dusty-blue-100/30 dark:border-charcoal-800/30">
              {[
                { name: 'github', icon: <Github className="w-4.5 h-4.5" /> },
                { name: 'linkedin', icon: <Linkedin className="w-4.5 h-4.5" /> },
                { name: 'twitter', icon: <Twitter className="w-4.5 h-4.5" /> },
              ].map((s) => {
                const key = s.name as keyof typeof info.socials;
                return editMode ? (
                  <div key={s.name} className="flex flex-col items-center">
                    <span className="text-[10px] text-gray-400 capitalize">{s.name}</span>
                    <input
                      id={`edit-social-${s.name}`}
                      type="text"
                      value={info.socials[key] || ''}
                      onChange={(e) => handleSocialChange(key, e.target.value)}
                      className="w-16 text-[10px] bg-gray-50 dark:bg-charcoal-800 p-0.5 border border-gray-200 dark:border-charcoal-700 text-center rounded focus:outline-none"
                    />
                  </div>
                ) : (
                  info.socials[key] && (
                    <motion.a
                      id={`social-link-${s.name}`}
                      key={s.name}
                      href={info.socials[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3, scale: 1.1 }}
                      className="p-2 rounded-lg bg-dusty-blue-50 dark:bg-charcoal-800 text-charcoal-700 dark:text-warm-cream/80 hover:text-dusty-blue-500 dark:hover:text-sage-500 transition-colors"
                    >
                      {s.icon}
                    </motion.a>
                  )
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Right Side: Introduction & Biography */}
        <motion.div
          id="hero-right-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="lg:col-span-8 space-y-8"
        >
          {/* Main Titles */}
          <div className="space-y-3">
            <div className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-dusty-blue-50 dark:bg-charcoal-800 text-dusty-blue-600 dark:text-dusty-blue-400">
              <Sparkles className="w-3 h-3 mr-1.5" />
              Creative Portfolio
            </div>

            {editMode ? (
              <div className="space-y-2">
                <input
                  id="edit-name"
                  type="text"
                  value={info.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="font-display text-4xl md:text-5xl font-extrabold w-full border-b border-dusty-blue-200 dark:border-charcoal-700 bg-transparent focus:outline-none text-charcoal-900 dark:text-warm-cream"
                />
                <input
                  id="edit-title"
                  type="text"
                  value={info.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="font-display text-xl md:text-2xl font-bold w-full border-b border-dusty-blue-200 dark:border-charcoal-700 bg-transparent focus:outline-none text-dusty-blue-600 dark:text-sage-500"
                />
              </div>
            ) : (
              <>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-charcoal-900 dark:text-warm-cream tracking-tight leading-tight">
                  Hi, I'm <span className="text-dusty-blue-600 dark:text-sage-500">{info.name}</span>
                </h1>
                <h2 className="font-display text-xl md:text-2xl font-semibold text-dusty-blue-600 dark:text-sage-500">
                  {info.title}
                </h2>
              </>
            )}
          </div>

          {/* Slogans/Taglines */}
          <div className="text-lg md:text-xl font-medium text-charcoal-700 dark:text-warm-cream/90 italic border-l-4 border-sage-500 pl-4">
            {editMode ? (
              <textarea
                id="edit-tagline"
                value={info.tagline}
                onChange={(e) => handleInputChange('tagline', e.target.value)}
                rows={2}
                className="w-full border border-dusty-blue-100 dark:border-charcoal-800 bg-transparent p-2 rounded focus:outline-none text-sm font-sans"
              />
            ) : (
              `"${info.tagline}"`
            )}
          </div>

          {/* Interactive Bio Description */}
          <div className="space-y-4 text-charcoal-700 dark:text-warm-cream/80 text-base leading-relaxed">
            {editMode ? (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-400">Short Bio</label>
                  <textarea
                    id="edit-bio"
                    value={info.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={3}
                    className="w-full border border-dusty-blue-100 dark:border-charcoal-800 bg-transparent p-2 rounded focus:outline-none text-sm font-sans"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400">Detailed Bio</label>
                  <textarea
                    id="edit-detailed-bio"
                    value={info.detailedBio}
                    onChange={(e) => handleInputChange('detailedBio', e.target.value)}
                    rows={4}
                    className="w-full border border-dusty-blue-100 dark:border-charcoal-800 bg-transparent p-2 rounded focus:outline-none text-sm font-sans"
                  />
                </div>
              </div>
            ) : (
              <>
                <p>{info.bio}</p>
                <p>{info.detailedBio}</p>
              </>
            )}
          </div>

          {/* Value Pillars / Quick badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(info.pillars || [
              "Pixel-perfect Frontend Engineering",
              "Accessible & Performant Layouts",
              "Creative Interactive Prototypes",
              "Modern API & Database Architectures"
            ]).map((p, idx) => (
              <div key={idx} className="flex items-center space-x-2 text-sm text-charcoal-800 dark:text-warm-cream/80 bg-white dark:bg-charcoal-800/20 p-3.5 rounded-2xl border border-dusty-blue-50/5 dark:border-charcoal-800/10">
                <CheckCircle2 className="w-4 h-4 text-sage-500 shrink-0" />
                {editMode ? (
                  <input
                    type="text"
                    value={p}
                    onChange={(e) => handlePillarChange(idx, e.target.value)}
                    className="w-full bg-transparent border-b border-dusty-blue-100/50 dark:border-charcoal-700 focus:outline-none font-medium text-charcoal-800 dark:text-warm-cream/80 text-sm"
                    placeholder={`Pillar ${idx + 1}`}
                  />
                ) : (
                  <span className="font-medium">{p}</span>
                )}
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              id="hero-export-pdf-btn"
              onClick={onExportPdf}
              className="px-6 py-3.5 rounded-2xl bg-dusty-blue-500 hover:bg-dusty-blue-600 text-white font-medium shadow-lg shadow-dusty-blue-500/10 hover:shadow-dusty-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
            >
              <FileText className="w-4.5 h-4.5" />
              Get Resume as PDF
            </button>
            <a
              id="hero-view-projects-link"
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                const btn = document.getElementById('tab-btn-projects') || document.getElementById('mobile-tab-btn-projects');
                if (btn) btn.click();
              }}
              className="px-6 py-3.5 rounded-2xl bg-white dark:bg-charcoal-800 text-charcoal-800 dark:text-warm-cream hover:bg-dusty-blue-50 dark:hover:bg-charcoal-700/80 font-medium border border-dusty-blue-100/10 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer inline-flex items-center"
            >
              Explore Selected Projects
            </a>
          </div>

          {/* Quantitative Stats Row */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-dusty-blue-100/30 dark:border-charcoal-800/30">
            <div>
              {editMode ? (
                <div className="space-y-1">
                  <input
                    type="text"
                    value={info.yearsActiveStat ?? '6+'}
                    onChange={(e) => handleInputChange('yearsActiveStat', e.target.value)}
                    className="font-display font-extrabold text-xl md:text-2xl text-dusty-blue-500 dark:text-sage-500 bg-warm-cream/50 dark:bg-charcoal-800 border-b border-dusty-blue-100 dark:border-charcoal-700 focus:outline-none w-full p-1 rounded"
                    placeholder="e.g. 6+"
                  />
                  <input
                    type="text"
                    value={info.yearsActiveLabel ?? 'Years Active'}
                    onChange={(e) => handleInputChange('yearsActiveLabel', e.target.value)}
                    className="text-[10px] font-semibold text-charcoal-700 dark:text-warm-cream/70 uppercase tracking-wider bg-warm-cream/50 dark:bg-charcoal-800 border-b border-dusty-blue-100 dark:border-charcoal-700 focus:outline-none w-full p-1 rounded mt-1"
                    placeholder="e.g. Years Active"
                  />
                </div>
              ) : (
                <>
                  <p className="font-display font-extrabold text-3xl md:text-4xl text-dusty-blue-500 dark:text-sage-500">
                    {info.yearsActiveStat ?? '6+'}
                  </p>
                  <p className="text-xs font-semibold text-charcoal-700/60 dark:text-warm-cream/50 uppercase tracking-wider mt-1">
                    {info.yearsActiveLabel ?? 'Years Active'}
                  </p>
                </>
              )}
            </div>
            <div>
              {editMode ? (
                <div className="space-y-1">
                  <input
                    type="text"
                    value={info.completedProjectsStat ?? '24+'}
                    onChange={(e) => handleInputChange('completedProjectsStat', e.target.value)}
                    className="font-display font-extrabold text-xl md:text-2xl text-dusty-blue-500 dark:text-sage-500 bg-warm-cream/50 dark:bg-charcoal-800 border-b border-dusty-blue-100 dark:border-charcoal-700 focus:outline-none w-full p-1 rounded"
                    placeholder="e.g. 24+"
                  />
                  <input
                    type="text"
                    value={info.completedProjectsLabel ?? 'Completed Projects'}
                    onChange={(e) => handleInputChange('completedProjectsLabel', e.target.value)}
                    className="text-[10px] font-semibold text-charcoal-700 dark:text-warm-cream/70 uppercase tracking-wider bg-warm-cream/50 dark:bg-charcoal-800 border-b border-dusty-blue-100 dark:border-charcoal-700 focus:outline-none w-full p-1 rounded mt-1"
                    placeholder="e.g. Projects Done"
                  />
                </div>
              ) : (
                <>
                  <p className="font-display font-extrabold text-3xl md:text-4xl text-dusty-blue-500 dark:text-sage-500">
                    {info.completedProjectsStat ?? '24+'}
                  </p>
                  <p className="text-xs font-semibold text-charcoal-700/60 dark:text-warm-cream/50 uppercase tracking-wider mt-1">
                    {info.completedProjectsLabel ?? 'Completed Projects'}
                  </p>
                </>
              )}
            </div>
            <div>
              {editMode ? (
                <div className="space-y-1">
                  <input
                    type="text"
                    value={info.qualityStat ?? '100%'}
                    onChange={(e) => handleInputChange('qualityStat', e.target.value)}
                    className="font-display font-extrabold text-xl md:text-2xl text-dusty-blue-500 dark:text-sage-500 bg-warm-cream/50 dark:bg-charcoal-800 border-b border-dusty-blue-100 dark:border-charcoal-700 focus:outline-none w-full p-1 rounded"
                    placeholder="e.g. 100%"
                  />
                  <input
                    type="text"
                    value={info.qualityLabel ?? 'Craft Quality'}
                    onChange={(e) => handleInputChange('qualityLabel', e.target.value)}
                    className="text-[10px] font-semibold text-charcoal-700 dark:text-warm-cream/70 uppercase tracking-wider bg-warm-cream/50 dark:bg-charcoal-800 border-b border-dusty-blue-100 dark:border-charcoal-700 focus:outline-none w-full p-1 rounded mt-1"
                    placeholder="e.g. Quality"
                  />
                </div>
              ) : (
                <>
                  <p className="font-display font-extrabold text-3xl md:text-4xl text-dusty-blue-500 dark:text-sage-500">
                    {info.qualityStat ?? '100%'}
                  </p>
                  <p className="text-xs font-semibold text-charcoal-700/60 dark:text-warm-cream/50 uppercase tracking-wider mt-1">
                    {info.qualityLabel ?? 'Craft Quality'}
                  </p>
                </>
              )}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
