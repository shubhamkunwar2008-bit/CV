import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  RotateCcw,
  Cloud,
  Database,
  History,
  X,
  Check,
  Plus,
  Trash2,
  Clock,
  ArrowRight,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { PersonalInfo, ExperienceItem, EducationItem, SkillItem, ProjectItem, AchievementItem, PortfolioData } from '../types';

export interface Checkpoint {
  id: string;
  timestamp: string;
  label: string;
  isManual: boolean;
  data: PortfolioData;
}

interface ResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: PortfolioData;
  lastSyncedData: PortfolioData | null;
  onRestoreData: (data: PortfolioData, label: string) => void;
  onFactoryReset: () => void;
}

export default function ResetModal({
  isOpen,
  onClose,
  currentData,
  lastSyncedData,
  onRestoreData,
  onFactoryReset,
}: ResetModalProps) {
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
  const [manualLabel, setManualLabel] = useState('');
  const [showFactoryConfirm, setShowFactoryConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState<'revert' | 'history' | 'factory'>('revert');

  // Load checkpoints on open
  useEffect(() => {
    if (isOpen) {
      const stored = localStorage.getItem('portfolio_checkpoints');
      if (stored) {
        try {
          setCheckpoints(JSON.parse(stored));
        } catch (e) {
          console.error('Failed to parse checkpoints', e);
        }
      } else {
        // Create an initial checkpoint if empty so history is not completely bare
        const initialCheckpoint: Checkpoint = {
          id: 'initial-state',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' (Initial Session Loaded)',
          label: 'Session Start Baseline',
          isManual: false,
          data: currentData
        };
        setCheckpoints([initialCheckpoint]);
        localStorage.setItem('portfolio_checkpoints', JSON.stringify([initialCheckpoint]));
      }
    }
  }, [isOpen]);

  // Save checkpoints to storage
  const saveCheckpointsToStorage = (updated: Checkpoint[]) => {
    setCheckpoints(updated);
    localStorage.setItem('portfolio_checkpoints', JSON.stringify(updated));
  };

  // Create a new custom manual checkpoint
  const handleCreateCheckpoint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualLabel.trim()) return;

    const newCheckpoint: Checkpoint = {
      id: `cp-${Date.now()}`,
      timestamp: new Date().toLocaleString([], {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      label: manualLabel.trim(),
      isManual: true,
      data: JSON.parse(JSON.stringify(currentData)) // deep clone current state
    };

    const updated = [newCheckpoint, ...checkpoints].slice(0, 3); // Keep max 3
    saveCheckpointsToStorage(updated);
    setManualLabel('');
  };

  // Delete checkpoint
  const handleDeleteCheckpoint = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = checkpoints.filter(cp => cp.id !== id);
    saveCheckpointsToStorage(updated);
  };

  // Format description of what is inside a checkpoint
  const getCheckpointStats = (data: PortfolioData) => {
    const projCount = data.projects?.length || 0;
    const skillCount = data.skills?.length || 0;
    const expCount = data.experience?.length || 0;
    const eduCount = data.education?.length || 0;
    return `${projCount} proj, ${skillCount} skills, ${expCount} exp, ${eduCount} edu`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto no-print bg-charcoal-950/40 backdrop-blur-md">
          {/* Backdrop Closer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="relative w-full max-w-2xl bg-white dark:bg-charcoal-900 border border-dusty-blue-100/80 dark:border-charcoal-800/80 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Sidebar Controls */}
            <div className="md:w-56 bg-dusty-blue-50/20 dark:bg-charcoal-950/20 border-b md:border-b-0 md:border-r border-dusty-blue-100/30 dark:border-charcoal-800/50 p-6 flex flex-col justify-between shrink-0">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <History className="w-5 h-5 text-dusty-blue-600 dark:text-sage-400" />
                    <h2 className="text-base font-bold text-charcoal-900 dark:text-warm-cream">
                      Restore Portal
                    </h2>
                  </div>
                  <p className="text-[11px] text-charcoal-500/80 dark:text-warm-cream/40 font-medium">
                    Manage sandbox drafts, roll back saves, or reset benchmarks.
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => { setActiveTab('revert'); setShowFactoryConfirm(false); }}
                    className={`px-3 py-2 rounded-xl text-xs font-bold text-left flex items-center gap-2 transition-colors cursor-pointer ${
                      activeTab === 'revert'
                        ? 'bg-white dark:bg-charcoal-800/80 text-dusty-blue-600 dark:text-sage-400 shadow-sm border border-dusty-blue-100/30 dark:border-charcoal-700/50'
                        : 'text-charcoal-500 hover:text-charcoal-900 dark:text-warm-cream/50 dark:hover:text-warm-cream'
                    }`}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Revert Unsaved Edits
                  </button>
                  <button
                    onClick={() => { setActiveTab('history'); setShowFactoryConfirm(false); }}
                    className={`px-3 py-2 rounded-xl text-xs font-bold text-left flex items-center gap-2 transition-colors cursor-pointer ${
                      activeTab === 'history'
                        ? 'bg-white dark:bg-charcoal-800/80 text-dusty-blue-600 dark:text-sage-400 shadow-sm border border-dusty-blue-100/30 dark:border-charcoal-700/50'
                        : 'text-charcoal-500 hover:text-charcoal-900 dark:text-warm-cream/50 dark:hover:text-warm-cream'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    Checkpoint History
                  </button>
                  <button
                    onClick={() => { setActiveTab('factory'); setShowFactoryConfirm(false); }}
                    className={`px-3 py-2 rounded-xl text-xs font-bold text-left flex items-center gap-2 transition-colors cursor-pointer ${
                      activeTab === 'factory'
                        ? 'bg-white dark:bg-charcoal-800/80 text-red-500 shadow-sm border border-dusty-blue-100/30 dark:border-charcoal-700/50'
                        : 'text-charcoal-500 hover:text-red-400/80 dark:text-warm-cream/50 dark:hover:text-red-400/80'
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Factory Benchmark Reset
                  </button>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="hidden md:flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-dusty-blue-100 dark:border-charcoal-800 text-xs font-bold text-charcoal-600 dark:text-warm-cream/60 hover:bg-dusty-blue-50/50 dark:hover:bg-charcoal-800/50 cursor-pointer transition-colors"
              >
                Exit Portal
              </button>
            </div>

            {/* Main Tab Content */}
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[60vh] md:max-h-none">
              {/* Top Closer for Mobile */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-1.5 rounded-lg hover:bg-dusty-blue-50 dark:hover:bg-charcoal-800 text-charcoal-400 hover:text-charcoal-800 dark:text-warm-cream/40 dark:hover:text-warm-cream cursor-pointer md:hidden z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex-1 flex flex-col justify-center">
                {/* REVERT UNSAVED EDITS TAB */}
                {activeTab === 'revert' && (
                  <div className="space-y-5 py-2">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-dusty-blue-50/50 dark:bg-charcoal-800/30 border border-dusty-blue-100/30 dark:border-charcoal-700/30">
                        <Cloud className="w-3 h-3 text-dusty-blue-600 dark:text-sage-400" />
                        <span className="text-[10px] font-bold text-dusty-blue-700 dark:text-sage-400 font-mono tracking-tight uppercase">Firestore Sync State</span>
                      </div>
                      <h3 className="text-lg font-bold text-charcoal-900 dark:text-warm-cream leading-snug">
                        Discard Session Drafts
                      </h3>
                      <p className="text-xs text-charcoal-500 dark:text-warm-cream/50 leading-relaxed">
                        Revert your current in-progress editing sandbox to match the latest synchronized state in the global Cloud Firestore database. Any modifications made since your last successful cloud save will be discarded.
                      </p>
                    </div>

                    {lastSyncedData ? (
                      <div className="p-4 rounded-2xl bg-dusty-blue-50/30 dark:bg-charcoal-950/20 border border-dusty-blue-100/20 dark:border-charcoal-800/40 text-left space-y-2">
                        <div className="flex items-center gap-2">
                          <Database className="w-4 h-4 text-emerald-500" />
                          <span className="text-xs font-semibold text-charcoal-800 dark:text-warm-cream/80">
                            Stored Database Version Available
                          </span>
                        </div>
                        <p className="text-[11px] font-mono text-charcoal-500 dark:text-warm-cream/40">
                          Contents: {getCheckpointStats(lastSyncedData)}
                        </p>
                        <button
                          onClick={() => {
                            onRestoreData(lastSyncedData, 'Last Cloud Synced State');
                            onClose();
                          }}
                          className="w-full mt-2 py-3 px-4 rounded-xl bg-dusty-blue-600 dark:bg-sage-500 text-white font-bold text-xs hover:bg-dusty-blue-700 dark:hover:bg-sage-600 shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5 animate-spin-reverse" />
                          Discard Drafts & Restore Stored Database
                        </button>
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl bg-dusty-blue-50/10 dark:bg-charcoal-950/10 border border-dusty-blue-100/10 dark:border-charcoal-800/20 text-center">
                        <p className="text-xs text-charcoal-500/60 dark:text-warm-cream/30 italic">
                          No previous synced database baseline fetched yet.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* VERSION CHECKPOINT HISTORY TAB */}
                {activeTab === 'history' && (
                  <div className="space-y-4 py-1 flex flex-col h-full justify-start text-left">
                    <div className="space-y-1.5">
                      <h3 className="text-base font-bold text-charcoal-900 dark:text-warm-cream leading-snug">
                        Local Checkpoint Backups
                      </h3>
                      <p className="text-[11px] text-charcoal-500 dark:text-warm-cream/50">
                        Your last 3 edits are automatically preserved. Create custom manual checkpoints to bookmark freeze-frames, or select a restore option below.
                      </p>
                    </div>

                    {/* Manual Checkpoint Form */}
                    <form onSubmit={handleCreateCheckpoint} className="flex gap-2">
                      <input
                        type="text"
                        value={manualLabel}
                        onChange={(e) => setManualLabel(e.target.value)}
                        placeholder="Name this freeze-frame checkpoint (e.g. Before changing bio)"
                        className="flex-1 py-2 px-3.5 rounded-xl text-xs bg-dusty-blue-50/30 dark:bg-charcoal-950/20 border border-dusty-blue-100/50 dark:border-charcoal-800/80 text-charcoal-800 dark:text-warm-cream placeholder-charcoal-400 focus:outline-none focus:border-dusty-blue-400"
                        maxLength={50}
                      />
                      <button
                        type="submit"
                        disabled={!manualLabel.trim()}
                        className="p-2 px-4 rounded-xl bg-dusty-blue-600 dark:bg-sage-500 text-white hover:bg-dusty-blue-700 dark:hover:bg-sage-600 disabled:opacity-50 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Plus className="w-4 h-4" /> Save Draft
                      </button>
                    </form>

                    {/* Timeline List */}
                    <div className="space-y-2 max-h-[25vh] overflow-y-auto pr-1">
                      {checkpoints.length > 0 ? (
                        checkpoints.map((cp) => (
                          <div
                            key={cp.id}
                            onClick={() => {
                              onRestoreData(cp.data, cp.label);
                              onClose();
                            }}
                            className="group flex items-center justify-between p-3 rounded-xl border border-dusty-blue-100/30 dark:border-charcoal-800/40 hover:bg-dusty-blue-50/20 dark:hover:bg-charcoal-800/20 cursor-pointer transition-all"
                          >
                            <div className="space-y-0.5 text-left">
                              <div className="flex items-center gap-1.5">
                                <span className={`h-1.5 w-1.5 rounded-full ${cp.isManual ? 'bg-amber-500' : 'bg-dusty-blue-500'}`} />
                                <span className="text-xs font-bold text-charcoal-800 dark:text-warm-cream/90 group-hover:text-dusty-blue-600 dark:group-hover:text-sage-400 transition-colors">
                                  {cp.label}
                                </span>
                                {cp.isManual && (
                                  <span className="text-[8px] bg-amber-500/10 text-amber-600 dark:text-amber-400 px-1.5 py-0.2 rounded-full uppercase font-mono font-bold">
                                    Manual
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-1.5 text-[10px] text-charcoal-400 dark:text-warm-cream/30 font-mono">
                                <span>{cp.timestamp}</span>
                                <span>•</span>
                                <span>{getCheckpointStats(cp.data)}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold text-dusty-blue-500 dark:text-sage-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                                Restore <ArrowRight className="w-3 h-3" />
                              </span>
                              {cp.id !== 'initial-state' && (
                                <button
                                  type="button"
                                  onClick={(e) => handleDeleteCheckpoint(cp.id, e)}
                                  className="p-1 rounded-lg hover:bg-red-500/10 text-charcoal-400 hover:text-red-500 dark:text-warm-cream/20 cursor-pointer transition-colors shrink-0"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs italic text-charcoal-500/50 dark:text-warm-cream/30 text-center py-4">
                          No automatic checkpoints captured yet. Checkpoints form automatically when syncing updates.
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* FACTORY BENCHMARK RESET TAB */}
                {activeTab === 'factory' && (
                  <div className="space-y-4 py-2">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/5 dark:bg-red-500/10 border border-red-500/10">
                        <AlertTriangle className="w-3 h-3 text-red-500" />
                        <span className="text-[10px] font-bold text-red-600 dark:text-red-400 font-mono tracking-tight uppercase">Destructive action</span>
                      </div>
                      <h3 className="text-lg font-bold text-charcoal-900 dark:text-warm-cream leading-snug">
                        Restore Factory Benchmarks
                      </h3>
                      <p className="text-xs text-charcoal-500 dark:text-warm-cream/50 leading-relaxed">
                        This action will overwrite your database and restore the original pre-seeded benchmark portfolio content. This is irreversible and will erase all your custom achievements, work history, biography text, certificates, and projects globally.
                      </p>
                    </div>

                    {!showFactoryConfirm ? (
                      <button
                        onClick={() => setShowFactoryConfirm(true)}
                        className="w-full py-3 px-4 rounded-xl bg-red-500 text-white font-bold text-xs hover:bg-red-600 shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        Restore Factory Benchmark Defaults
                      </button>
                    ) : (
                      <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/20 space-y-3">
                        <p className="text-[11px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wide">
                          Are you absolutely sure? This will erase all cloud records!
                        </p>
                        <div className="flex gap-2.5">
                          <button
                            type="button"
                            onClick={() => {
                              onFactoryReset();
                              onClose();
                            }}
                            className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold cursor-pointer transition-colors"
                          >
                            Yes, Reset Completely
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowFactoryConfirm(false)}
                            className="flex-1 py-2.5 px-4 rounded-xl border border-dusty-blue-100 dark:border-charcoal-800 text-charcoal-600 dark:text-warm-cream/60 hover:bg-dusty-blue-50/50 cursor-pointer transition-colors text-xs font-bold"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
