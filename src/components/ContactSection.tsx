import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Mail, MapPin, Phone, CheckCircle2, MessageSquare, Trash2, Github, Linkedin, Twitter, AlertCircle } from 'lucide-react';
import { getStoredData, setStoredData } from '../data';
import { PersonalInfo } from '../types';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  body: string;
  timestamp: string;
}

interface ContactSectionProps {
  emailAddress: string;
  phoneNumber: string;
  location: string;
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

const leftColumnVariants = {
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

const rightColumnVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.1,
    },
  },
};

export default function ContactSection({ emailAddress, phoneNumber, location, editMode, info, setInfo }: ContactSectionProps) {
  // Local state for the contact inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  // Floating label active checking states
  const [focusName, setFocusName] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusSubject, setFocusSubject] = useState(false);
  const [focusBody, setFocusBody] = useState(false);

  // Form states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Inbound messages logged (client-side simulation)
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    setMessages(getStoredData<ContactMessage[]>('contact_messages', []));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !subject || !body) {
      setErrorMsg('Please populate all fields in this inquiry form.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMsg('Please supply a valid email address.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    // Simulate server ingestion lag
    setTimeout(() => {
      const newMessage: ContactMessage = {
        id: `msg-${Date.now()}`,
        name,
        email,
        subject,
        body,
        timestamp: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      const updatedMsgs = [newMessage, ...messages];
      setMessages(updatedMsgs);
      setStoredData('contact_messages', updatedMsgs);

      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset form
      setName('');
      setEmail('');
      setSubject('');
      setBody('');

      // Auto clear success indicator
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1200);
  };

  const deleteMessage = (id: string) => {
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    setStoredData('contact_messages', updated);
  };

  return (
    <section id="contact-section" className="py-12 md:py-20">
      
      {/* Header */}
      <motion.div
        variants={sectionHeaderVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="space-y-2 mb-12"
      >
        <div className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-dusty-blue-50 dark:bg-charcoal-800 text-dusty-blue-600 dark:text-dusty-blue-400">
          <MessageSquare className="w-3.5 h-3.5 mr-1.5 shrink-0" />
          {editMode ? (
            <input
              type="text"
              value={info.contactBadge || "Get In Touch"}
              onChange={(e) => setInfo({ ...info, contactBadge: e.target.value })}
              className="bg-transparent border-b border-dusty-blue-100 dark:border-charcoal-700 focus:outline-none font-semibold text-xs py-0.5"
              placeholder="Section badge"
            />
          ) : (
            info.contactBadge || "Get In Touch"
          )}
        </div>
        {editMode ? (
          <div className="space-y-2 max-w-xl">
            <input
              type="text"
              value={info.contactTitle || "Start a Conversation"}
              onChange={(e) => setInfo({ ...info, contactTitle: e.target.value })}
              className="font-display font-extrabold text-2xl md:text-3xl text-charcoal-900 dark:text-warm-cream bg-transparent border-b border-dusty-blue-100 dark:border-charcoal-700 focus:outline-none w-full py-0.5"
              placeholder="Section title"
            />
            <textarea
              value={info.contactDesc || "Interested in starting a project, consulting opportunities, or saying hello? Drop me a line below."}
              onChange={(e) => setInfo({ ...info, contactDesc: e.target.value })}
              rows={2}
              className="text-xs text-charcoal-700/60 dark:text-warm-cream/50 bg-transparent border border-dusty-blue-100 dark:border-charcoal-700 focus:outline-none w-full rounded p-1"
              placeholder="Section description"
            />
          </div>
        ) : (
          <>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-charcoal-900 dark:text-warm-cream">
              {info.contactTitle || "Start a Conversation"}
            </h2>
            <p className="text-sm text-charcoal-700/60 dark:text-warm-cream/50 max-w-xl">
              {info.contactDesc || "Interested in starting a project, consulting opportunities, or saying hello? Drop me a line below."}
            </p>
          </>
        )}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left column: Contact Info card */}
        <motion.div
          variants={leftColumnVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="bg-white dark:bg-charcoal-800/40 p-8 rounded-[2rem] border border-dusty-blue-50/5 dark:border-charcoal-800/10 shadow-sm space-y-8">
            <h3 className="font-display font-bold text-lg text-charcoal-900 dark:text-warm-cream">
              Connection Hub
            </h3>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-xl bg-dusty-blue-500/10 dark:bg-sage-500/10 flex items-center justify-center text-dusty-blue-500 dark:text-sage-500 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-charcoal-700/50 dark:text-warm-cream/40 uppercase tracking-widest">
                    Email Direct
                  </h4>
                  <a href={`mailto:${emailAddress}`} className="text-sm font-semibold text-charcoal-900 dark:text-warm-cream hover:text-dusty-blue-500 transition-colors mt-0.5 block">
                    {emailAddress}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-xl bg-dusty-blue-500/10 dark:bg-sage-500/10 flex items-center justify-center text-dusty-blue-500 dark:text-sage-500 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-charcoal-700/50 dark:text-warm-cream/40 uppercase tracking-widest">
                    Phone Direct
                  </h4>
                  <span className="text-sm font-semibold text-charcoal-900 dark:text-warm-cream block mt-0.5">
                    {phoneNumber}
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-xl bg-dusty-blue-500/10 dark:bg-sage-500/10 flex items-center justify-center text-dusty-blue-500 dark:text-sage-500 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-charcoal-700/50 dark:text-warm-cream/40 uppercase tracking-widest">
                    Current Location
                  </h4>
                  <span className="text-sm font-semibold text-charcoal-900 dark:text-warm-cream block mt-0.5">
                    {location}
                  </span>
                </div>
              </div>
            </div>

            {/* Social details list */}
            <div className="pt-6 border-t border-dusty-blue-100/10 dark:border-charcoal-800/10">
              <h4 className="text-xs font-bold text-charcoal-700/50 dark:text-warm-cream/40 uppercase tracking-widest mb-4">
                Social Coordinates
              </h4>
              <div className="flex space-x-3">
                {[
                  { name: 'Github', icon: <Github className="w-4.5 h-4.5" />, link: 'https://github.com' },
                  { name: 'Linkedin', icon: <Linkedin className="w-4.5 h-4.5" />, link: 'https://linkedin.com' },
                  { name: 'Twitter', icon: <Twitter className="w-4.5 h-4.5" />, link: 'https://twitter.com' }
                ].map((s) => (
                  <motion.a
                    id={`contact-social-btn-${s.name}`}
                    key={s.name}
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    className="p-3 rounded-xl bg-dusty-blue-50 dark:bg-charcoal-800 text-charcoal-700 dark:text-warm-cream/80 hover:bg-dusty-blue-100 dark:hover:bg-charcoal-700 hover:text-dusty-blue-500 dark:hover:text-sage-500 transition-colors"
                    aria-label={`Visit Shubham's ${s.name}`}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right column: Interactive form */}
        <motion.div
          variants={rightColumnVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="lg:col-span-7"
        >
          <form
            id="contact-form"
            onSubmit={handleSubmit}
            className="bg-white dark:bg-charcoal-800/40 p-8 rounded-[2rem] border border-dusty-blue-50/5 dark:border-charcoal-800/10 shadow-sm space-y-6"
          >
            <h3 className="font-display font-bold text-lg text-charcoal-900 dark:text-warm-cream mb-2">
              Send an Instant Message
            </h3>

            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-xs font-medium flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name field */}
              <div className="relative">
                <label
                  id="label-name"
                  className={`absolute left-4 transition-all pointer-events-none text-xs font-semibold ${
                    focusName || name
                      ? 'top-2 text-dusty-blue-500 font-bold scale-90'
                      : 'top-1/2 -translate-y-1/2 text-charcoal-700/40'
                  }`}
                >
                  Your Name
                </label>
                <input
                  id="contact-input-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocusName(true)}
                  onBlur={() => setFocusName(false)}
                  className="w-full bg-dusty-blue-50/30 dark:bg-charcoal-800/20 border border-dusty-blue-100/30 dark:border-charcoal-800/40 rounded-xl px-4 pt-6 pb-2 text-sm text-charcoal-900 dark:text-warm-cream focus:outline-none focus:border-dusty-blue-500 dark:focus:border-sage-500 focus:bg-white dark:focus:bg-charcoal-800 transition-all shadow-inner"
                />
              </div>

              {/* Email field */}
              <div className="relative">
                <label
                  id="label-email"
                  className={`absolute left-4 transition-all pointer-events-none text-xs font-semibold ${
                    focusEmail || email
                      ? 'top-2 text-dusty-blue-500 font-bold scale-90'
                      : 'top-1/2 -translate-y-1/2 text-charcoal-700/40'
                  }`}
                >
                  Your Email Address
                </label>
                <input
                  id="contact-input-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusEmail(true)}
                  onBlur={() => setFocusEmail(false)}
                  className="w-full bg-dusty-blue-50/30 dark:bg-charcoal-800/20 border border-dusty-blue-100/30 dark:border-charcoal-800/40 rounded-xl px-4 pt-6 pb-2 text-sm text-charcoal-900 dark:text-warm-cream focus:outline-none focus:border-dusty-blue-500 dark:focus:border-sage-500 focus:bg-white dark:focus:bg-charcoal-800 transition-all shadow-inner"
                />
              </div>
            </div>

            {/* Subject field */}
            <div className="relative">
              <label
                id="label-subject"
                className={`absolute left-4 transition-all pointer-events-none text-xs font-semibold ${
                  focusSubject || subject
                    ? 'top-2 text-dusty-blue-500 font-bold scale-90'
                    : 'top-1/2 -translate-y-1/2 text-charcoal-700/40'
                }`}
              >
                Inquiry Subject
              </label>
              <input
                id="contact-input-subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                onFocus={() => setFocusSubject(true)}
                onBlur={() => setFocusSubject(false)}
                className="w-full bg-dusty-blue-50/30 dark:bg-charcoal-800/20 border border-dusty-blue-100/30 dark:border-charcoal-800/40 rounded-xl px-4 pt-6 pb-2 text-sm text-charcoal-900 dark:text-warm-cream focus:outline-none focus:border-dusty-blue-500 dark:focus:border-sage-500 focus:bg-white dark:focus:bg-charcoal-800 transition-all shadow-inner"
              />
            </div>

            {/* Message Body field */}
            <div className="relative">
              <label
                id="label-body"
                className={`absolute left-4 transition-all pointer-events-none text-xs font-semibold ${
                  focusBody || body
                    ? 'top-2 text-dusty-blue-500 font-bold scale-90'
                    : 'top-4 text-charcoal-700/40'
                }`}
              >
                Detailed Message Text
              </label>
              <textarea
                id="contact-input-body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                onFocus={() => setFocusBody(true)}
                onBlur={() => setFocusBody(false)}
                rows={5}
                className="w-full bg-dusty-blue-50/30 dark:bg-charcoal-800/20 border border-dusty-blue-100/30 dark:border-charcoal-800/40 rounded-xl px-4 pt-6 pb-2 text-sm text-charcoal-900 dark:text-warm-cream focus:outline-none focus:border-dusty-blue-500 dark:focus:border-sage-500 focus:bg-white dark:focus:bg-charcoal-800 transition-all shadow-inner font-sans"
              />
            </div>

            {/* Submit button */}
            <div className="flex items-center justify-between">
              <button
                id="contact-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3.5 rounded-xl bg-dusty-blue-500 hover:bg-dusty-blue-600 disabled:bg-dusty-blue-400 text-white font-semibold text-sm shadow-md transition-all duration-200 cursor-pointer flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1" />
                    Engaging...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>

              {/* Success Alert */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    id="contact-success-alert"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center text-xs font-bold text-emerald-600"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-1.5 shrink-0" />
                    Message Delivered! Thank you.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Received Messages Table (Client Inbox, visible ONLY in editMode to test submissions!) */}
      <AnimatePresence>
        {editMode && (
          <motion.div
            id="received-messages-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-12 bg-charcoal-50 dark:bg-charcoal-800/20 p-6 md:p-8 rounded-[2rem] border border-dashed border-dusty-blue-100/50 dark:border-charcoal-800"
          >
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-charcoal-800 pb-4 mb-4">
              <div>
                <h3 className="font-display font-extrabold text-lg text-charcoal-900 dark:text-warm-cream">
                  Client Inbox (Dynamic Simulation Logs)
                </h3>
                <p className="text-xs text-charcoal-700/50 dark:text-warm-cream/50">
                  This persistent list visualizes messages sent through the form above. Real-time test hub!
                </p>
              </div>
              <span className="text-xs font-bold bg-dusty-blue-100 dark:bg-charcoal-800 text-dusty-blue-600 dark:text-dusty-blue-400 px-2.5 py-1 rounded-full">
                {messages.length} Messages logged
              </span>
            </div>

            {messages.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-xs">
                Your inbox is empty. Try submitting the form above to log a transaction dynamically!
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    id={`logged-msg-${msg.id}`}
                    key={msg.id}
                    className="p-4 bg-white dark:bg-charcoal-800/40 rounded-2xl border border-gray-100 dark:border-charcoal-800/50 flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1.5 text-xs">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-charcoal-900 dark:text-warm-cream">{msg.name}</span>
                        <span className="text-gray-400">({msg.email})</span>
                        <span className="text-[10px] font-mono text-gray-400 ml-auto md:ml-0">{msg.timestamp}</span>
                      </div>
                      <p className="font-bold text-dusty-blue-600 dark:text-sage-500">Subject: {msg.subject}</p>
                      <p className="text-charcoal-800 dark:text-warm-cream/80 bg-gray-50 dark:bg-charcoal-800/20 p-2.5 rounded-lg mt-1 whitespace-pre-wrap font-sans">
                        {msg.body}
                      </p>
                    </div>

                    <button
                      id={`delete-msg-${msg.id}`}
                      onClick={() => deleteMessage(msg.id)}
                      className="text-red-400 hover:text-red-500 p-1 cursor-pointer"
                      title="Prune message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
