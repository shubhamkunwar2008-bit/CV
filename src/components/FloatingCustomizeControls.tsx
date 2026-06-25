import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Edit, RotateCcw, Check } from 'lucide-react';

interface FloatingCustomizeControlsProps {
  editMode: boolean;
  setEditMode: (edit: boolean) => void;
  onResetData: () => void;
}

export default function FloatingCustomizeControls({
  editMode,
  setEditMode,
  onResetData,
}: FloatingCustomizeControlsProps) {
  return (
    <div
      id="floating-customize-panel"
      className="fixed bottom-6 left-6 z-45 flex items-center gap-2 no-print"
    >
      <motion.div
        layout
        className="flex items-center bg-white/95 dark:bg-charcoal-800/95 backdrop-blur-md rounded-full shadow-lg border border-dusty-blue-100 dark:border-charcoal-700/80 p-1.5 gap-1.5"
      >
        {/* Toggle Edit Mode Pill */}
        <motion.button
          layout
          id="floating-toggle-edit-btn"
          onClick={() => setEditMode(!editMode)}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            editMode
              ? 'bg-sage-500 text-white shadow-md shadow-sage-500/20 focus:ring-sage-500 dark:focus:ring-offset-charcoal-900'
              : 'text-dusty-blue-600 dark:text-sage-400 hover:bg-dusty-blue-50 dark:hover:bg-charcoal-700/50 focus:ring-dusty-blue-500 dark:focus:ring-offset-charcoal-900'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
        >
          {editMode ? (
            <>
              <Check className="w-3.5 h-3.5 animate-bounce" />
              <span>Editing Active</span>
            </>
          ) : (
            <>
              <Edit className="w-3.5 h-3.5" />
              <span>Customize CV</span>
            </>
          )}
        </motion.button>

        {/* Reset Button (only shown when editMode is active) */}
        <AnimatePresence>
          {editMode && (
            <motion.button
              layout
              id="floating-reset-data-btn"
              onClick={onResetData}
              initial={{ opacity: 0, scale: 0.8, width: 0 }}
              animate={{ opacity: 1, scale: 1, width: 'auto' }}
              exit={{ opacity: 0, scale: 0.8, width: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500"
              title="Reset all dynamic CV text back to original developer statistics"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="pr-1.5">Reset</span>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
