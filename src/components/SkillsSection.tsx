import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Plus, Trash2, Sliders, Cpu, Terminal, Palette } from 'lucide-react';
import { SkillItem, PersonalInfo } from '../types';

interface SkillsSectionProps {
  skills: SkillItem[];
  setSkills: (skills: SkillItem[]) => void;
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

const skillsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const skillItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function SkillsSection({ skills, setSkills, editMode, info, setInfo }: SkillsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Categories
  const categories = ['All', 'Frontend', 'Backend', 'Tools'];

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === selectedCategory);

  const getProficiencyLabel = (level: number) => {
    if (level >= 90) return 'Expert';
    if (level >= 80) return 'Advanced';
    if (level >= 65) return 'Proficient';
    return 'Intermediate';
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Frontend': return <Cpu className="w-3.5 h-3.5 mr-1" />;
      case 'Backend': return <Terminal className="w-3.5 h-3.5 mr-1" />;
      case 'Tools': return <Palette className="w-3.5 h-3.5 mr-1" />;
      default: return null;
    }
  };

  const handleSkillChange = (id: string, field: keyof SkillItem, value: any) => {
    setSkills(skills.map((s) => s.id === id ? { ...s, [field]: value } : s));
  };

  const addSkill = () => {
    const newSkill: SkillItem = {
      id: `skill-${Date.now()}`,
      name: "New Capability",
      level: 80,
      category: selectedCategory === 'All' ? 'Frontend' : selectedCategory
    };
    setSkills([...skills, newSkill]);
  };

  const deleteSkill = (idToRemove: string) => {
    setSkills(skills.filter((s) => s.id !== idToRemove));
  };

  return (
    <section id="skills-section" className="py-12 md:py-20">
      
      {/* Header */}
      <motion.div
        variants={sectionHeaderVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
      >
        <div className="space-y-2 flex-1 mr-4">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-dusty-blue-50 dark:bg-charcoal-800 text-dusty-blue-600 dark:text-dusty-blue-400">
            <Sparkles className="w-3.5 h-3.5 mr-1.5 shrink-0" />
            {editMode ? (
              <input
                type="text"
                value={info.skillsBadge || "Core Stack"}
                onChange={(e) => setInfo({ ...info, skillsBadge: e.target.value })}
                className="bg-transparent border-b border-dusty-blue-100 dark:border-charcoal-700 focus:outline-none font-semibold text-xs py-0.5"
                placeholder="Section badge"
              />
            ) : (
              info.skillsBadge || "Core Stack"
            )}
          </div>
          {editMode ? (
            <div className="space-y-2 max-w-xl">
              <input
                type="text"
                value={info.skillsTitle || "Skills & Competencies"}
                onChange={(e) => setInfo({ ...info, skillsTitle: e.target.value })}
                className="font-display font-extrabold text-2xl md:text-3xl text-charcoal-900 dark:text-warm-cream bg-transparent border-b border-dusty-blue-100 dark:border-charcoal-700 focus:outline-none w-full py-0.5"
                placeholder="Section title"
              />
              <textarea
                value={info.skillsDesc || "A granular breakdown of languages, design systems, and cloud infrastructure pipelines that I command."}
                onChange={(e) => setInfo({ ...info, skillsDesc: e.target.value })}
                rows={2}
                className="text-xs text-charcoal-700/60 dark:text-warm-cream/50 bg-transparent border border-dusty-blue-100 dark:border-charcoal-700 focus:outline-none w-full rounded p-1"
                placeholder="Section description"
              />
            </div>
          ) : (
            <>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-charcoal-900 dark:text-warm-cream">
                {info.skillsTitle || "Skills & Competencies"}
              </h2>
              <p className="text-sm text-charcoal-700/60 dark:text-warm-cream/50 max-w-xl">
                {info.skillsDesc || "A granular breakdown of languages, design systems, and cloud infrastructure pipelines that I command."}
              </p>
            </>
          )}
        </div>

        {/* Categories Tab Filters */}
        <div id="skills-categories-tabs" className="flex flex-wrap items-center gap-1.5 bg-dusty-blue-50/50 dark:bg-charcoal-800/40 p-1.5 rounded-2xl border border-dusty-blue-100/10 dark:border-charcoal-700/20 self-start">
          {categories.map((cat) => (
            <button
              id={`skills-tab-${cat}`}
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`relative px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white dark:bg-charcoal-700 text-charcoal-900 dark:text-warm-cream shadow-sm font-bold'
                  : 'text-charcoal-700/60 dark:text-warm-cream/60 hover:text-charcoal-900 dark:hover:text-warm-cream'
              }`}
            >
              <span className="flex items-center justify-center">
                {getCategoryIcon(cat)}
                {cat}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Skills Grid */}
      <motion.div
        variants={skillsContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 bg-white dark:bg-charcoal-800/20 p-6 md:p-8 rounded-[2rem] border border-dusty-blue-50/5 dark:border-charcoal-800/10"
      >
        <AnimatePresence>
          {filteredSkills.map((skill, index) => {
            return (
              <motion.div
                id={`skill-row-${skill.id}`}
                key={skill.id}
                layout
                variants={skillItemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  layout: { type: 'spring', stiffness: 220, damping: 28 },
                  default: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
                }}
                className="space-y-2.5 relative group"
              >
                
                {/* Header of skill */}
                {editMode ? (
                  <div className="space-y-3 p-3.5 bg-dusty-blue-50/10 dark:bg-charcoal-800/20 rounded-2xl border border-dusty-blue-100/10 dark:border-charcoal-700/10">
                    <div className="flex items-center justify-between gap-3">
                      <input
                        id={`edit-skill-name-${skill.id}`}
                        type="text"
                        value={skill.name}
                        onChange={(e) => handleSkillChange(skill.id, 'name', e.target.value)}
                        className="font-medium text-charcoal-900 dark:text-warm-cream border-b border-dusty-blue-100 dark:border-charcoal-700 bg-transparent py-0.5 focus:outline-none flex-1 text-sm font-display font-bold"
                        placeholder="Skill Name"
                      />
                      <button
                        id={`delete-skill-${skill.id}`}
                        onClick={() => deleteSkill(skill.id)}
                        className="text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 p-1.5 rounded-lg cursor-pointer shrink-0 transition-colors"
                        title="Remove Skill"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] uppercase font-mono text-charcoal-700/50 dark:text-warm-cream/40">Category:</span>
                        <select
                          id={`edit-skill-cat-${skill.id}`}
                          value={skill.category}
                          onChange={(e) => handleSkillChange(skill.id, 'category', e.target.value)}
                          className="text-xs text-charcoal-700 dark:text-warm-cream bg-white dark:bg-charcoal-800 px-2 py-1 rounded-lg border border-dusty-blue-100/50 dark:border-charcoal-700 focus:outline-none cursor-pointer"
                        >
                          <option value="Frontend">Frontend</option>
                          <option value="Backend">Backend</option>
                          <option value="Tools">Tools</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-2 text-charcoal-700/60 dark:text-warm-cream/50">
                        <Sliders className="w-3.5 h-3.5 text-sage-500" />
                        <input
                          id={`edit-skill-slider-${skill.id}`}
                          type="range"
                          min="0"
                          max="100"
                          value={skill.level}
                          onChange={(e) => handleSkillChange(skill.id, 'level', parseInt(e.target.value))}
                          className="w-20 h-1 bg-dusty-blue-100 dark:bg-charcoal-700 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="font-mono font-semibold min-w-[2.5rem] text-right text-xs text-charcoal-800 dark:text-warm-cream">{skill.level}%</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-display font-bold text-charcoal-900 dark:text-warm-cream tracking-tight flex items-center">
                      {skill.name}
                      <span className="ml-2 text-[10px] font-semibold text-dusty-blue-500 bg-dusty-blue-500/10 px-1.5 py-0.5 rounded-md uppercase">
                        {skill.category}
                      </span>
                    </span>

                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs text-charcoal-700/60 dark:text-warm-cream/50">
                        {skill.level}%
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        skill.level >= 90
                          ? 'bg-emerald-500/10 text-emerald-500'
                          : skill.level >= 80
                          ? 'bg-dusty-blue-500/10 text-dusty-blue-600'
                          : 'bg-sage-500/10 text-sage-600'
                      }`}>
                        {getProficiencyLabel(skill.level)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Progress bar line */}
                <div className="h-2 w-full bg-dusty-blue-100/30 dark:bg-charcoal-800/50 rounded-full overflow-hidden">
                  <motion.div
                    id={`skill-bar-${skill.id}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} // smooth ease-out-expo
                    className={`h-full rounded-full ${
                      skill.category === 'Frontend'
                        ? 'bg-gradient-to-r from-dusty-blue-500 to-dusty-blue-600'
                        : skill.category === 'Backend'
                        ? 'bg-gradient-to-r from-sage-500 to-sage-600'
                        : 'bg-gradient-to-r from-charcoal-700 to-charcoal-800 dark:from-charcoal-500 dark:to-charcoal-600'
                    }`}
                  />
                </div>

              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredSkills.length === 0 && (
          <div className="col-span-1 md:col-span-2 text-center py-12 text-gray-400 text-sm">
            No competencies found in category "{selectedCategory}". Add one below!
          </div>
        )}
      </motion.div>

      {/* Floating Plus Button for additions inside edit mode */}
      {editMode && (
        <div className="flex justify-center mt-6">
          <button
            id="add-skill-btn"
            onClick={addSkill}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-sage-500 hover:bg-sage-600 text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Skill to "{selectedCategory === 'All' ? 'Frontend' : selectedCategory}"
          </button>
        </div>
      )}

    </section>
  );
}
