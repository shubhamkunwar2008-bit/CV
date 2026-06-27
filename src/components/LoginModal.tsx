import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Unlock, Key, Eye, EyeOff, AlertCircle, X, ShieldAlert } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isWiggling, setIsWiggling] = useState(false);
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  // Esc key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password === '*ad123min#') {
      setIsAuthorizing(true);
      setTimeout(() => {
        onSuccess();
        setIsAuthorizing(false);
        setPassword('');
      }, 800);
    } else {
      setIsWiggling(true);
      setError('Invalid administrative password. Access denied.');
      setTimeout(() => setIsWiggling(false), 500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 overflow-y-auto no-print">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal-900/60 dark:bg-black/80 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              x: isWiggling ? [0, -6, 6, -6, 6, 0] : 0,
            }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 24,
              x: { duration: 0.4 }
            }}
            className="relative w-full max-w-md bg-white dark:bg-charcoal-900 rounded-3xl shadow-2xl border border-dusty-blue-100 dark:border-charcoal-800 p-6 md:p-8 overflow-hidden z-10"
          >
            {/* Header Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-charcoal-400 hover:text-charcoal-600 dark:hover:text-warm-cream transition-colors cursor-pointer p-1.5 rounded-xl hover:bg-dusty-blue-50 dark:hover:bg-charcoal-800"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Shield Icon Decoration */}
            <div className="flex flex-col items-center text-center space-y-4 pt-4">
              <div className="h-14 w-14 rounded-2xl bg-amber-50 dark:bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-200/50 dark:border-amber-500/20 relative">
                {isAuthorizing ? (
                  <Unlock className="w-6 h-6 animate-pulse text-emerald-500" />
                ) : (
                  <Lock className="w-6 h-6" />
                )}
                <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-dusty-blue-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                  <Key className="w-3 h-3" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-extrabold text-xl text-charcoal-900 dark:text-warm-cream">
                  Administrative Access
                </h3>
                <p className="text-xs text-charcoal-700/60 dark:text-warm-cream/50 max-w-xs mx-auto leading-relaxed">
                  Enter the administrative password to unlock inline CV editing, dynamic element styling, and custom database overrides.
                </p>
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-charcoal-700/70 dark:text-warm-cream/60">
                  CV Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError('');
                    }}
                    autoFocus
                    placeholder="Enter admin password key"
                    className={`w-full h-11 pl-4 pr-11 rounded-xl border bg-dusty-blue-50/20 dark:bg-charcoal-800/30 text-sm focus:outline-none focus:ring-2 transition-all font-mono ${
                      error
                        ? 'border-red-500/50 focus:ring-red-500 bg-red-50/10 dark:bg-red-500/5'
                        : 'border-dusty-blue-100 dark:border-charcoal-800 focus:ring-dusty-blue-500 focus:border-transparent'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-600 dark:hover:text-warm-cream cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error banner */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2 text-xs text-red-500 font-medium bg-red-500/10 p-3 rounded-xl border border-red-500/20"
                  >
                    <ShieldAlert className="w-4 h-4 shrink-0 text-red-500" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 h-11 rounded-xl text-sm font-semibold border border-dusty-blue-100 dark:border-charcoal-800 text-charcoal-700 dark:text-warm-cream/80 hover:bg-dusty-blue-50 dark:hover:bg-charcoal-800/50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAuthorizing}
                  className="flex-1 h-11 rounded-xl text-sm font-semibold bg-dusty-blue-600 hover:bg-dusty-blue-700 dark:bg-sage-500 dark:hover:bg-sage-600 text-white transition-all shadow-md shadow-dusty-blue-500/10 dark:shadow-sage-500/10 cursor-pointer disabled:opacity-50"
                >
                  {isAuthorizing ? 'Authorizing...' : 'Authorize'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
