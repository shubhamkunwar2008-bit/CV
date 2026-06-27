import { motion } from 'motion/react';
import { Briefcase, Plus, Trash2, Calendar, MapPin, Sparkles, PlusCircle, MinusCircle } from 'lucide-react';
import { ExperienceItem, PersonalInfo } from '../types';

interface ExperienceSectionProps {
  experience: ExperienceItem[];
  setExperience: (exp: ExperienceItem[]) => void;
  editMode: boolean;
  info: PersonalInfo;
  setInfo: (info: PersonalInfo) => void;
}

const sectionHeaderVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const timelineContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const timelineItemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function ExperienceSection({ experience, setExperience, editMode, info, setInfo }: ExperienceSectionProps) {
  
  const handleItemChange = (id: string, field: keyof ExperienceItem, value: any) => {
    setExperience(
      experience.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleAchievementChange = (itemId: string, index: number, value: string) => {
    setExperience(
      experience.map((item) => {
        if (item.id === itemId) {
          const newAchievements = [...item.achievements];
          newAchievements[index] = value;
          return { ...item, achievements: newAchievements };
        }
        return item;
      })
    );
  };

  const addAchievement = (itemId: string) => {
    setExperience(
      experience.map((item) => {
        if (item.id === itemId) {
          return { ...item, achievements: [...item.achievements, 'New bullet achievement'] };
        }
        return item;
      })
    );
  };

  const removeAchievement = (itemId: string, index: number) => {
    setExperience(
      experience.map((item) => {
        if (item.id === itemId) {
          const newAchievements = item.achievements.filter((_, idx) => idx !== index);
          return { ...item, achievements: newAchievements };
        }
        return item;
      })
    );
  };

  const addNewExperience = () => {
    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: "Creative Engineer / Senior Developer",
      company: "New Company Inc.",
      location: "San Francisco, CA",
      period: "2026 - Present",
      description: "Brief summary of roles, responsibilities, and key architectures built.",
      achievements: [
        "Led frontend engineering strategy, migrating legacy views to modern React 19 architecture.",
        "Improved web core vitals score by 45 points across primary search workflows."
      ]
    };
    setExperience([newExp, ...experience]);
  };

  const deleteExperience = (id: string) => {
    setExperience(experience.filter((item) => item.id !== id));
  };

  return (
    <section id="experience-section" className="py-12 md:py-20">
      
      {/* Header */}
      <motion.div
        variants={sectionHeaderVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="flex items-center justify-between mb-12"
      >
        <div className="space-y-2 flex-1 mr-4">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-dusty-blue-50 dark:bg-charcoal-800 text-dusty-blue-600 dark:text-dusty-blue-400">
            <Briefcase className="w-3.5 h-3.5 mr-1.5 shrink-0" />
            {editMode ? (
              <input
                type="text"
                value={info.experienceBadge || "Timeline of Craft"}
                onChange={(e) => setInfo({ ...info, experienceBadge: e.target.value })}
                className="bg-transparent border-b border-dusty-blue-100 dark:border-charcoal-700 focus:outline-none font-semibold text-xs py-0.5 text-dusty-blue-600 dark:text-dusty-blue-400"
                placeholder="Section badge"
              />
            ) : (
              info.experienceBadge || "Timeline of Craft"
            )}
          </div>
          {editMode ? (
            <div className="space-y-2 max-w-xl">
              <input
                type="text"
                value={info.experienceTitle || "Professional Experience"}
                onChange={(e) => setInfo({ ...info, experienceTitle: e.target.value })}
                className="font-display font-extrabold text-2xl md:text-3xl text-charcoal-900 dark:text-warm-cream bg-transparent border-b border-dusty-blue-100 dark:border-charcoal-700 focus:outline-none w-full py-0.5"
                placeholder="Section title"
              />
              <textarea
                value={info.experienceDesc || "A chronological roadmap detailing past engineering achievements, team mentorship, and product launches."}
                onChange={(e) => setInfo({ ...info, experienceDesc: e.target.value })}
                rows={2}
                className="text-xs text-charcoal-700/60 dark:text-warm-cream/50 bg-transparent border border-dusty-blue-100 dark:border-charcoal-700 focus:outline-none w-full rounded p-1"
                placeholder="Section description"
              />
            </div>
          ) : (
            <>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-charcoal-900 dark:text-warm-cream">
                {info.experienceTitle || "Professional Experience"}
              </h2>
              <p className="text-sm text-charcoal-700/60 dark:text-warm-cream/50 max-w-xl">
                {info.experienceDesc || "A chronological roadmap detailing past engineering achievements, team mentorship, and product launches."}
              </p>
            </>
          )}
        </div>

        {editMode && (
          <button
            id="add-exp-btn"
            onClick={addNewExperience}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl bg-sage-500 hover:bg-sage-600 text-white transition-all shadow-md shadow-sage-500/10 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" /> Add Experience
          </button>
        )}
      </motion.div>

      {/* Main Timeline */}
      <motion.div
        variants={timelineContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative border-l-2 border-dusty-blue-100 dark:border-charcoal-800 ml-4 md:ml-6 pl-6 md:pl-10 space-y-12"
      >
        
        {/* Animated Drawing Timeline Line - A visual accent mimicking scroll loading (hidden on mobile to prevent GPU gradient scaling glitches) */}
        <div className="hidden md:block absolute top-0 bottom-0 left-[-2px] w-[2px] bg-gradient-to-b from-dusty-blue-500 via-sage-500 to-transparent pointer-events-none" />

        {experience.map((item, index) => (
          <motion.div
            id={`exp-card-${item.id}`}
            key={item.id}
            variants={timelineItemVariants}
            initial="hidden"
            animate="visible"
            className="relative group"
          >
            {/* Timeline Dot Indicator */}
            <div className="absolute -left-[31px] md:-left-[47px] top-1.5 flex items-center justify-center">
              <div className="h-4 w-4 rounded-full bg-white dark:bg-charcoal-900 border-2 border-dusty-blue-500 dark:border-sage-500 group-hover:scale-125 transition-transform duration-300 shadow-md" />
              <div className="absolute h-2 w-2 rounded-full bg-dusty-blue-500 dark:bg-sage-500 group-hover:animate-ping" />
            </div>

            {/* Main Content Card */}
            <div className="bg-white dark:bg-charcoal-800/40 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md border border-dusty-blue-50/5 dark:border-charcoal-800/10 transition-all duration-300 group-hover:translate-y-[-2px]">
              
              {/* Header inside Card */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-b border-dusty-blue-100/20 dark:border-charcoal-800/20 pb-4 mb-4">
                <div className="space-y-1">
                  {editMode ? (
                    <div className="space-y-2">
                      <input
                        id={`edit-role-${item.id}`}
                        type="text"
                        value={item.role}
                        onChange={(e) => handleItemChange(item.id, 'role', e.target.value)}
                        className="font-display font-extrabold text-lg text-charcoal-900 dark:text-warm-cream w-full border-b border-dusty-blue-100 dark:border-charcoal-700 bg-transparent py-0.5 focus:outline-none"
                        placeholder="Role / Title"
                      />
                      <input
                        id={`edit-company-${item.id}`}
                        type="text"
                        value={item.company}
                        onChange={(e) => handleItemChange(item.id, 'company', e.target.value)}
                        className="font-semibold text-sm text-dusty-blue-600 dark:text-sage-500 w-full border-b border-dusty-blue-100 dark:border-charcoal-700 bg-transparent py-0.5 focus:outline-none"
                        placeholder="Company"
                      />
                    </div>
                  ) : (
                    <>
                      <h3 className="font-display font-extrabold text-xl text-charcoal-900 dark:text-warm-cream tracking-tight group-hover:text-dusty-blue-600 dark:group-hover:text-sage-500 transition-colors">
                        {item.role}
                      </h3>
                      <p className="font-semibold text-sm text-dusty-blue-500 dark:text-sage-500/80">
                        {item.company}
                      </p>
                    </>
                  )}
                </div>

                <div className="flex flex-col md:items-end gap-1.5 text-xs text-charcoal-700/60 dark:text-warm-cream/50">
                  <div className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1.5 text-sage-500" />
                    {editMode ? (
                      <input
                        id={`edit-period-${item.id}`}
                        type="text"
                        value={item.period}
                        onChange={(e) => handleItemChange(item.id, 'period', e.target.value)}
                        className="border-b border-dusty-blue-100 dark:border-charcoal-700 bg-transparent py-0.5 focus:outline-none text-right text-charcoal-800 dark:text-warm-cream/90 text-xs md:text-sm font-medium w-24 md:w-32"
                      />
                    ) : (
                      <span className="font-medium">{item.period}</span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-3.5 h-3.5 mr-1.5 text-sage-500" />
                    {editMode ? (
                      <input
                        id={`edit-location-${item.id}`}
                        type="text"
                        value={item.location}
                        onChange={(e) => handleItemChange(item.id, 'location', e.target.value)}
                        className="border-b border-dusty-blue-100 dark:border-charcoal-700 bg-transparent py-0.5 focus:outline-none text-right text-charcoal-700 dark:text-warm-cream/80 text-xs md:text-sm w-24 md:w-32"
                      />
                    ) : (
                      <span>{item.location}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-4">
                {editMode ? (
                  <textarea
                    id={`edit-desc-${item.id}`}
                    value={item.description}
                    onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                    rows={2}
                    className="w-full border border-dusty-blue-100 dark:border-charcoal-700 bg-transparent p-2 rounded focus:outline-none text-sm font-sans text-charcoal-850 dark:text-warm-cream"
                  />
                ) : (
                  <p className="text-sm text-charcoal-800 dark:text-warm-cream/90 font-medium">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Achievements (Bullets) */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-charcoal-900/40 dark:text-warm-cream/30 uppercase tracking-widest">
                    Core Achievements & Deliverables
                  </h4>
                  {editMode && (
                    <button
                      id={`add-bullet-${item.id}`}
                      onClick={() => addAchievement(item.id)}
                      className="text-xs text-sage-600 hover:text-sage-700 flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      <PlusCircle className="w-3.5 h-3.5" /> Add Bullet
                    </button>
                  )}
                </div>

                <ul className="space-y-2.5 list-none">
                  {item.achievements.map((bullet, bIdx) => (
                    <li id={`exp-${item.id}-bullet-${bIdx}`} key={bIdx} className="flex items-start text-sm text-charcoal-700/80 dark:text-warm-cream/70">
                      <div className="h-1.5 w-1.5 rounded-full bg-sage-500 mt-2 mr-3 shrink-0" />
                      <div className="flex-1">
                        {editMode ? (
                          <div className="flex items-center gap-2">
                            <input
                              id={`edit-bullet-${item.id}-${bIdx}`}
                              type="text"
                              value={bullet}
                              onChange={(e) => handleAchievementChange(item.id, bIdx, e.target.value)}
                              className="w-full border-b border-dusty-blue-100 dark:border-charcoal-700 bg-transparent py-0.5 focus:outline-none text-charcoal-800 dark:text-warm-cream/90 text-sm"
                            />
                            <button
                              id={`remove-bullet-${item.id}-${bIdx}`}
                              onClick={() => removeAchievement(item.id, bIdx)}
                              className="text-red-400 hover:text-red-500 p-0.5 cursor-pointer"
                            >
                              <MinusCircle className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <span>{bullet}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Toolbar on Edit Mode inside card */}
              {editMode && (
                <div className="flex justify-end pt-4 mt-6 border-t border-dusty-blue-100/10 dark:border-charcoal-800/10">
                  <button
                    id={`delete-exp-${item.id}`}
                    onClick={() => deleteExperience(item.id)}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete Job
                  </button>
                </div>
              )}

            </div>
          </motion.div>
        ))}

        {experience.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-charcoal-800/20 rounded-3xl border border-dashed border-gray-200">
            <p className="text-sm text-gray-400">No experiences registered yet. Press 'Add Experience' to build your timeline.</p>
          </div>
        )}

      </motion.div>
    </section>
  );
}
