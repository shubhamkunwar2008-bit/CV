import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Plus, Trash2, Calendar, Award, Star, Clock, FileImage, Upload, X, Eye } from 'lucide-react';
import { AchievementItem, PersonalInfo } from '../types';
import { compressImage } from '../lib/imageCompressor';

interface AchievementsSectionProps {
  achievements: AchievementItem[];
  setAchievements: (ach: AchievementItem[]) => void;
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
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

export default function AchievementsSection({
  achievements,
  setAchievements,
  editMode,
  info,
  setInfo
}: AchievementsSectionProps) {
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);

  const handleItemChange = (id: string, field: keyof AchievementItem, value: any) => {
    setAchievements(
      achievements.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const addNewAchievement = () => {
    const newAch: AchievementItem = {
      id: `ach-${Date.now()}`,
      title: "New Professional Award or Recognition",
      issuer: "Award Organization / Industry Issuer",
      date: "2026",
      description: "Describe the significance of the award, key milestones met, or competition parameters solved."
    };
    setAchievements([newAch, ...achievements]);
  };

  const deleteAchievement = (id: string) => {
    setAchievements(achievements.filter((item) => item.id !== id));
  };

  return (
    <section id="achievements-section" className="py-12 md:py-20">
      
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
            <Trophy className="w-3.5 h-3.5 mr-1.5 shrink-0" />
            {editMode ? (
              <input
                type="text"
                value={info.achievementsBadge || "Milestones of Excellence"}
                onChange={(e) => setInfo({ ...info, achievementsBadge: e.target.value })}
                className="bg-transparent border-b border-dusty-blue-100 dark:border-charcoal-700 focus:outline-none font-semibold text-xs py-0.5"
                placeholder="Section badge"
              />
            ) : (
              info.achievementsBadge || "Milestones of Excellence"
            )}
          </div>
          {editMode ? (
            <div className="space-y-2 max-w-xl">
              <input
                type="text"
                value={info.achievementsTitle || "Honors & Achievements"}
                onChange={(e) => setInfo({ ...info, achievementsTitle: e.target.value })}
                className="font-display font-extrabold text-2xl md:text-3xl text-charcoal-900 dark:text-warm-cream bg-transparent border-b border-dusty-blue-100 dark:border-charcoal-700 focus:outline-none w-full py-0.5"
                placeholder="Section title"
              />
              <textarea
                value={info.achievementsDesc || "A timeline of prestigious recognition, hackathon victories, academic honors, and engineering milestones."}
                onChange={(e) => setInfo({ ...info, achievementsDesc: e.target.value })}
                rows={2}
                className="text-xs text-charcoal-700/60 dark:text-warm-cream/50 bg-transparent border border-dusty-blue-100 dark:border-charcoal-700 focus:outline-none w-full rounded p-1"
                placeholder="Section description"
              />
            </div>
          ) : (
            <>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-charcoal-900 dark:text-warm-cream">
                {info.achievementsTitle || "Honors & Achievements"}
              </h2>
              <p className="text-sm text-charcoal-700/60 dark:text-warm-cream/50 max-w-2xl leading-relaxed">
                {info.achievementsDesc || "A timeline of prestigious recognition, hackathon victories, academic honors, and engineering milestones."}
              </p>
            </>
          )}
        </div>

        {editMode && (
          <button
            onClick={addNewAchievement}
            className="flex items-center gap-1.5 px-4 py-2 bg-dusty-blue-500 hover:bg-dusty-blue-600 dark:bg-sage-600 dark:hover:bg-sage-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-dusty-blue-500/10 cursor-pointer transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Award</span>
          </button>
        )}
      </motion.div>

      {/* Grid List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {achievements.map((item, index) => (
          <motion.div
            key={item.id}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="group relative flex flex-col justify-between bg-white dark:bg-charcoal-800 rounded-2xl border border-dusty-blue-100/30 dark:border-charcoal-700/30 p-6 shadow-sm hover:shadow-md dark:hover:border-sage-500/30 transition-all duration-300"
          >
            {/* Top row with graphic badge icon and delete action */}
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500 group-hover:scale-110 transition-transform duration-300">
                {index === 0 ? (
                  <Trophy className="w-5 h-5" />
                ) : index === 1 ? (
                  <Award className="w-5 h-5" />
                ) : (
                  <Star className="w-5 h-5" />
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-[10px] font-mono text-charcoal-700/40 dark:text-warm-cream/30 bg-dusty-blue-50/50 dark:bg-charcoal-900/30 px-2 py-1 rounded-md">
                  <Clock className="w-3 h-3 text-dusty-blue-400" />
                  {editMode ? (
                    <input
                      type="text"
                      value={item.date}
                      onChange={(e) => handleItemChange(item.id, 'date', e.target.value)}
                      className="bg-transparent border-none text-right font-mono font-bold w-12 focus:outline-none p-0"
                      placeholder="Year"
                    />
                  ) : (
                    <span>{item.date}</span>
                  )}
                </div>

                {editMode && (
                  <button
                    onClick={() => deleteAchievement(item.id)}
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 cursor-pointer transition-colors"
                    title="Delete item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Achievement Info */}
            <div className="space-y-2 flex-1">
              {editMode ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleItemChange(item.id, 'title', e.target.value)}
                    className="w-full text-sm font-bold text-charcoal-900 dark:text-warm-cream bg-transparent border-b border-dusty-blue-100 dark:border-charcoal-700 focus:outline-none py-0.5"
                    placeholder="Award/Honors Title"
                  />
                  <input
                    type="text"
                    value={item.issuer}
                    onChange={(e) => handleItemChange(item.id, 'issuer', e.target.value)}
                    className="w-full text-xs font-semibold text-dusty-blue-500 dark:text-dusty-blue-400 bg-transparent border-b border-dusty-blue-100 dark:border-charcoal-700 focus:outline-none py-0.5"
                    placeholder="Issuer Organization"
                  />
                  <textarea
                    value={item.description}
                    onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                    rows={3}
                    className="w-full text-xs text-charcoal-700/60 dark:text-warm-cream/50 bg-transparent border border-dusty-blue-100 dark:border-charcoal-700 rounded p-1 focus:outline-none"
                    placeholder="Brief description"
                  />
                </div>
              ) : (
                <>
                  <h3 className="font-display font-bold text-base text-charcoal-900 dark:text-warm-cream leading-snug group-hover:text-dusty-blue-600 dark:group-hover:text-sage-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-dusty-blue-500 dark:text-dusty-blue-400">
                    {item.issuer}
                  </p>
                  <p className="text-xs text-charcoal-700/60 dark:text-warm-cream/50 leading-relaxed pt-1">
                    {item.description}
                  </p>
                </>
              )}
            </div>

            {/* Certificate Verification Attachment */}
            <div className="mt-4 pt-4 border-t border-dusty-blue-100/30 dark:border-charcoal-700/50 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-bold text-charcoal-900/40 dark:text-warm-cream/30 uppercase tracking-widest">
                  Verification Certificate
                </h4>
              </div>

              {item.certificateUrl ? (
                <div className="relative rounded-2xl overflow-hidden bg-dusty-blue-50/10 dark:bg-charcoal-900/20 border border-dusty-blue-100/30 dark:border-charcoal-700/50 p-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-charcoal-100 dark:bg-charcoal-900 border border-dusty-blue-100/20 shrink-0">
                      <img
                        src={item.certificateUrl}
                        alt={`${item.title} Certificate`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-semibold text-charcoal-800 dark:text-warm-cream/90 line-clamp-1">
                        Certificate file attached
                      </p>
                      <button
                        type="button"
                        onClick={() => setSelectedCertificate(item.certificateUrl || null)}
                        className="text-[10px] font-bold text-dusty-blue-600 dark:text-sage-400 hover:underline flex items-center gap-1 cursor-pointer mt-0.5"
                      >
                        <Eye className="w-3 h-3" /> View original photo
                      </button>
                    </div>
                  </div>
                  {editMode && (
                    <button
                      type="button"
                      onClick={() => handleItemChange(item.id, 'certificateUrl', null)}
                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 cursor-pointer transition-colors shrink-0"
                      title="Remove certificate"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ) : editMode ? (
                <div className="relative border border-dashed border-dusty-blue-100 dark:border-charcoal-700 rounded-2xl p-4 hover:bg-dusty-blue-50/10 dark:hover:bg-charcoal-800/10 transition-colors flex flex-col items-center justify-center gap-1 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        try {
                          const base64 = await compressImage(file);
                          handleItemChange(item.id, 'certificateUrl', base64);
                        } catch (err) {
                          alert(err instanceof Error ? err.message : 'Error uploading file');
                        }
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="w-4 h-4 text-dusty-blue-400 dark:text-sage-500" />
                  <span className="text-[11px] font-semibold text-charcoal-800 dark:text-warm-cream/80">Upload Certificate Photo</span>
                  <span className="text-[9px] text-charcoal-500/60 dark:text-warm-cream/40 font-mono">PNG, JPG up to 10MB (auto-compressed)</span>
                </div>
              ) : (
                <div className="text-[11px] italic text-charcoal-500/50 dark:text-warm-cream/40 flex items-center gap-1.5 pl-1">
                  <FileImage className="w-3.5 h-3.5 text-charcoal-400/40" />
                  <span>No verification certificate uploaded</span>
                </div>
              )}
            </div>

          </motion.div>
        ))}
      </motion.div>
      
      {achievements.length === 0 && (
        <div className="text-center py-12 border border-dashed border-dusty-blue-100 dark:border-charcoal-800 rounded-2xl">
          <p className="text-sm text-charcoal-700/40 dark:text-warm-cream/30">No achievements added yet. Click Add Award to begin logging records.</p>
        </div>
      )}

      {/* Image Lightbox Overlay */}
      <AnimatePresence>
        {selectedCertificate && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal-950/80 backdrop-blur-md no-print">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCertificate(null)}
              className="absolute inset-0 cursor-zoom-out"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-3xl bg-white dark:bg-charcoal-900 border border-white/10 p-2 shadow-2xl flex flex-col items-center justify-center"
            >
              <button
                onClick={() => setSelectedCertificate(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-charcoal-900/80 text-white hover:bg-charcoal-800 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={selectedCertificate}
                alt="Certificate Preview"
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[80vh] object-contain rounded-2xl"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
