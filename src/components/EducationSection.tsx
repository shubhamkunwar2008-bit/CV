import { motion } from 'motion/react';
import { GraduationCap, Plus, Trash2, Calendar, MapPin, PlusCircle, MinusCircle } from 'lucide-react';
import { EducationItem, PersonalInfo } from '../types';

interface EducationSectionProps {
  education: EducationItem[];
  setEducation: (edu: EducationItem[]) => void;
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

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const gridItemVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function EducationSection({ education, setEducation, editMode, info, setInfo }: EducationSectionProps) {
  
  const handleItemChange = (id: string, field: keyof EducationItem, value: any) => {
    setEducation(
      education.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleAchievementChange = (itemId: string, index: number, value: string) => {
    setEducation(
      education.map((item) => {
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
    setEducation(
      education.map((item) => {
        if (item.id === itemId) {
          return { ...item, achievements: [...item.achievements, 'Academic accolade or course focus'] };
        }
        return item;
      })
    );
  };

  const removeAchievement = (itemId: string, index: number) => {
    setEducation(
      education.map((item) => {
        if (item.id === itemId) {
          const newAchievements = item.achievements.filter((_, idx) => idx !== index);
          return { ...item, achievements: newAchievements };
        }
        return item;
      })
    );
  };

  const addNewEducation = () => {
    const newEdu: EducationItem = {
      id: `edu-${Date.now()}`,
      degree: "B.S. in Software Systems",
      institution: "State University of Technology",
      location: "San Francisco, CA",
      period: "2019 - 2023",
      description: "Focused on computer networks, full-stack design, and human factors.",
      achievements: [
        "Received top ranks in Capstone interactive exhibition.",
        "Undergraduate Teaching Assistant for Web Systems 101."
      ]
    };
    setEducation([newEdu, ...education]);
  };

  const deleteEducation = (id: string) => {
    setEducation(education.filter((item) => item.id !== id));
  };

  return (
    <section id="education-section" className="py-12 md:py-20">
      
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
            <GraduationCap className="w-3.5 h-3.5 mr-1.5 shrink-0" />
            {editMode ? (
              <input
                type="text"
                value={info.educationBadge || "Milestones of Knowledge"}
                onChange={(e) => setInfo({ ...info, educationBadge: e.target.value })}
                className="bg-transparent border-b border-dusty-blue-100 dark:border-charcoal-700 focus:outline-none font-semibold text-xs py-0.5"
                placeholder="Section badge"
              />
            ) : (
              info.educationBadge || "Milestones of Knowledge"
            )}
          </div>
          {editMode ? (
            <div className="space-y-2 max-w-xl">
              <input
                type="text"
                value={info.educationTitle || "Education History"}
                onChange={(e) => setInfo({ ...info, educationTitle: e.target.value })}
                className="font-display font-extrabold text-2xl md:text-3xl text-charcoal-900 dark:text-warm-cream bg-transparent border-b border-dusty-blue-100 dark:border-charcoal-700 focus:outline-none w-full py-0.5"
                placeholder="Section title"
              />
              <textarea
                value={info.educationDesc || "Academic degrees, certifications, and research focuses that shape my analytical foundations."}
                onChange={(e) => setInfo({ ...info, educationDesc: e.target.value })}
                rows={2}
                className="text-xs text-charcoal-700/60 dark:text-warm-cream/50 bg-transparent border border-dusty-blue-100 dark:border-charcoal-700 focus:outline-none w-full rounded p-1"
                placeholder="Section description"
              />
            </div>
          ) : (
            <>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-charcoal-900 dark:text-warm-cream">
                {info.educationTitle || "Education History"}
              </h2>
              <p className="text-sm text-charcoal-700/60 dark:text-warm-cream/50 max-w-xl">
                {info.educationDesc || "Academic degrees, certifications, and research focuses that shape my analytical foundations."}
              </p>
            </>
          )}
        </div>

        {editMode && (
          <button
            id="add-edu-btn"
            onClick={addNewEducation}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl bg-sage-500 hover:bg-sage-600 text-white transition-all shadow-md shadow-sage-500/10 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" /> Add Education
          </button>
        )}
      </motion.div>

      {/* Grid containing educational cards */}
      <motion.div
        variants={gridContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {education.map((item, index) => (
          <motion.div
            id={`edu-card-${item.id}`}
            key={item.id}
            variants={gridItemVariants}
            className="relative bg-white dark:bg-charcoal-800/40 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md border border-dusty-blue-50/5 dark:border-charcoal-800/10 transition-all duration-300 flex flex-col justify-between group"
          >
            
            <div>
              {/* Badge indicating calendar period */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center text-xs font-semibold text-dusty-blue-600 dark:text-sage-500 bg-dusty-blue-50 dark:bg-charcoal-800 px-3 py-1.5 rounded-full">
                  <Calendar className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                  {editMode ? (
                    <input
                      id={`edit-edu-period-${item.id}`}
                      type="text"
                      value={item.period}
                      onChange={(e) => handleItemChange(item.id, 'period', e.target.value)}
                      className="bg-transparent border-b border-dusty-blue-100 py-0.5 focus:outline-none w-24 text-xs text-dusty-blue-600"
                    />
                  ) : (
                    <span>{item.period}</span>
                  )}
                </div>

                <div className="flex items-center text-xs text-charcoal-700/60 dark:text-warm-cream/50">
                  <MapPin className="w-3.5 h-3.5 mr-1.5 text-sage-500" />
                  {editMode ? (
                    <input
                      id={`edit-edu-location-${item.id}`}
                      type="text"
                      value={item.location}
                      onChange={(e) => handleItemChange(item.id, 'location', e.target.value)}
                      className="bg-transparent border-b border-dusty-blue-100 py-0.5 focus:outline-none w-28 text-xs text-right"
                    />
                  ) : (
                    <span>{item.location}</span>
                  )}
                </div>
              </div>

              {/* Title / Degree */}
              <div className="space-y-1 mb-4">
                {editMode ? (
                  <div className="space-y-2">
                    <input
                      id={`edit-edu-degree-${item.id}`}
                      type="text"
                      value={item.degree}
                      onChange={(e) => handleItemChange(item.id, 'degree', e.target.value)}
                      className="font-display font-bold text-lg text-charcoal-900 dark:text-warm-cream w-full border-b border-dusty-blue-100 bg-transparent py-0.5 focus:outline-none"
                      placeholder="Degree / Certificate"
                    />
                    <input
                      id={`edit-edu-inst-${item.id}`}
                      type="text"
                      value={item.institution}
                      onChange={(e) => handleItemChange(item.id, 'institution', e.target.value)}
                      className="font-semibold text-sm text-dusty-blue-500 dark:text-sage-500 w-full border-b border-dusty-blue-100 bg-transparent py-0.5 focus:outline-none"
                      placeholder="Institution"
                    />
                  </div>
                ) : (
                  <>
                    <h3 className="font-display font-extrabold text-lg text-charcoal-900 dark:text-warm-cream tracking-tight group-hover:text-dusty-blue-500 dark:group-hover:text-sage-500 transition-colors">
                      {item.degree}
                    </h3>
                    <p className="font-semibold text-sm text-dusty-blue-500 dark:text-sage-500/80">
                      {item.institution}
                    </p>
                  </>
                )}
              </div>

              {/* Course details */}
              <div className="mb-6">
                {editMode ? (
                  <textarea
                    id={`edit-edu-desc-${item.id}`}
                    value={item.description}
                    onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                    rows={2}
                    className="w-full border border-dusty-blue-100 bg-transparent p-2 rounded focus:outline-none text-sm font-sans"
                  />
                ) : (
                  <p className="text-sm text-charcoal-800 dark:text-warm-cream/90">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Achievements list */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-bold text-charcoal-900/40 dark:text-warm-cream/30 uppercase tracking-widest">
                    Milestones & Accolades
                  </h4>
                  {editMode && (
                    <button
                      id={`edu-add-bullet-${item.id}`}
                      onClick={() => addAchievement(item.id)}
                      className="text-xs text-sage-600 hover:text-sage-700 flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      <PlusCircle className="w-3.5 h-3.5" /> Add Accolade
                    </button>
                  )}
                </div>

                <ul className="space-y-2 list-none">
                  {item.achievements.map((bullet, bIdx) => (
                    <li id={`edu-${item.id}-bullet-${bIdx}`} key={bIdx} className="flex items-start text-xs text-charcoal-700/80 dark:text-warm-cream/70">
                      <div className="h-1 w-1 rounded-full bg-sage-500 mt-1.5 mr-2.5 shrink-0" />
                      <div className="flex-1">
                        {editMode ? (
                          <div className="flex items-center gap-2">
                            <input
                              id={`edit-edu-bullet-${item.id}-${bIdx}`}
                              type="text"
                              value={bullet}
                              onChange={(e) => handleAchievementChange(item.id, bIdx, e.target.value)}
                              className="w-full border-b border-dusty-blue-100 bg-transparent py-0.5 focus:outline-none"
                            />
                            <button
                              id={`remove-edu-bullet-${item.id}-${bIdx}`}
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

            </div>

            {/* Action footer inside card on edit mode */}
            {editMode && (
              <div className="flex justify-end pt-4 mt-6 border-t border-dusty-blue-100/10 dark:border-charcoal-800/10">
                <button
                  id={`delete-edu-${item.id}`}
                  onClick={() => deleteEducation(item.id)}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete School
                </button>
              </div>
            )}

          </motion.div>
        ))}

        {education.length === 0 && (
          <div className="col-span-1 md:col-span-2 text-center py-12 bg-white dark:bg-charcoal-800/20 rounded-3xl border border-dashed border-gray-200">
            <p className="text-sm text-gray-400">No education milestones registered yet. Press 'Add Education' to start.</p>
          </div>
        )}
      </motion.div>
    </section>
  );
}
