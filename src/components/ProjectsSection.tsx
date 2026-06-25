import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ExternalLink, Github, Eye, Plus, Trash2, X, AlertCircle } from 'lucide-react';
import { ProjectItem, PersonalInfo } from '../types';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  setProjects: (projects: ProjectItem[]) => void;
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

const projectsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const projectItemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
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

export default function ProjectsSection({ projects, setProjects, editMode, info, setInfo }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);

  // Dynamic category extraction
  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const handleProjectChange = (id: string, field: keyof ProjectItem, value: any) => {
    setProjects(
      projects.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleTagsChange = (id: string, tagsString: string) => {
    const tagsArray = tagsString.split(',').map((t) => t.trim()).filter((t) => t.length > 0);
    handleProjectChange(id, 'tags', tagsArray);
  };

  const addNewProject = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: "New Architectural Concept",
      description: "A short, clean sentence summarizing the target of this custom development.",
      longDescription: "A fully developed overview explaining what was built, key technical performance stats, and engineering strategies deployed during production.",
      category: selectedCategory === 'All' ? 'Web Application' : selectedCategory,
      tags: ["React", "TypeScript", "Tailwind CSS"],
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600&h=400",
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: false
    };
    setProjects([newProj, ...projects]);
  };

  const deleteProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent modal opening
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <section id="projects-section" className="py-12 md:py-20">
      
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
                value={info.projectsBadge || "Selected Lab Works"}
                onChange={(e) => setInfo({ ...info, projectsBadge: e.target.value })}
                className="bg-transparent border-b border-dusty-blue-100 dark:border-charcoal-700 focus:outline-none font-semibold text-xs py-0.5"
                placeholder="Section badge"
              />
            ) : (
              info.projectsBadge || "Selected Lab Works"
            )}
          </div>
          {editMode ? (
            <div className="space-y-2 max-w-xl">
              <input
                type="text"
                value={info.projectsTitle || "Featured Projects"}
                onChange={(e) => setInfo({ ...info, projectsTitle: e.target.value })}
                className="font-display font-extrabold text-2xl md:text-3xl text-charcoal-900 dark:text-warm-cream bg-transparent border-b border-dusty-blue-100 dark:border-charcoal-700 focus:outline-none w-full py-0.5"
                placeholder="Section title"
              />
              <textarea
                value={info.projectsDesc || "A selective visual showcase displaying client websites, npm tools, real-time widgets, and motion playgrounds."}
                onChange={(e) => setInfo({ ...info, projectsDesc: e.target.value })}
                rows={2}
                className="text-xs text-charcoal-700/60 dark:text-warm-cream/50 bg-transparent border border-dusty-blue-100 dark:border-charcoal-700 focus:outline-none w-full rounded p-1"
                placeholder="Section description"
              />
            </div>
          ) : (
            <>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-charcoal-900 dark:text-warm-cream">
                {info.projectsTitle || "Featured Projects"}
              </h2>
              <p className="text-sm text-charcoal-700/60 dark:text-warm-cream/50 max-w-xl">
                {info.projectsDesc || "A selective visual showcase displaying client websites, npm tools, real-time widgets, and motion playgrounds."}
              </p>
            </>
          )}
        </div>

        {/* Dynamic Category Tabs */}
        <div id="projects-category-tabs" className="flex flex-wrap items-center gap-1.5 bg-dusty-blue-50/50 dark:bg-charcoal-800/40 p-1.5 rounded-2xl border border-dusty-blue-100/10 dark:border-charcoal-700/20 self-start">
          {categories.map((cat) => (
            <button
              id={`project-tab-${cat}`}
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white dark:bg-charcoal-700 text-charcoal-900 dark:text-warm-cream shadow-sm font-bold'
                  : 'text-charcoal-700/60 dark:text-warm-cream/60 hover:text-charcoal-900 dark:hover:text-warm-cream'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Grid container */}
      <motion.div
        variants={projectsContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              id={`project-card-${project.id}`}
              key={project.id}
              layout
              variants={projectItemVariants}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => !editMode && setActiveProjectModal(project)}
              className={`group bg-white dark:bg-charcoal-800/40 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl border border-dusty-blue-50/5 dark:border-charcoal-800/10 transition-all duration-300 flex flex-col justify-between ${
                !editMode ? 'cursor-pointer' : ''
              }`}
            >
              
              {/* Card visual banner & image */}
              <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-charcoal-800">
                <img
                  src={project.imageUrl || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600&h=400"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Categories Badge overlay */}
                <div className="absolute top-4 left-4 bg-white dark:bg-charcoal-900 px-3.5 py-1.5 rounded-full text-[10px] font-bold text-charcoal-900 dark:text-warm-cream uppercase shadow-sm border border-dusty-blue-100/10 dark:border-charcoal-800/15">
                  {project.category}
                </div>

                {/* Edit details form over image if editMode */}
                {editMode && (
                  <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-3 text-center space-y-1 z-10">
                    <span className="text-[10px] text-gray-300 font-semibold">Image URL:</span>
                    <input
                      id={`edit-proj-image-${project.id}`}
                      type="text"
                      value={project.imageUrl}
                      onChange={(e) => handleProjectChange(project.id, 'imageUrl', e.target.value)}
                      className="w-full text-[10px] p-1 bg-charcoal-800 border border-charcoal-700 text-white rounded focus:outline-none"
                    />
                  </div>
                )}

                {/* Subtle Hover details overlay on View Mode */}
                {!editMode && (
                  <div className="absolute inset-0 bg-dusty-blue-700/80 dark:bg-charcoal-900/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <div className="text-center p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="mx-auto h-11 w-11 rounded-full bg-white/30 flex items-center justify-center text-white mb-2 shadow border border-white/10">
                        <Eye className="w-5 h-5" />
                      </div>
                      <span className="text-white text-xs font-semibold tracking-wide">
                        Click to Reveal Specs
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Card info contents */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                
                {/* Details */}
                <div className="space-y-3">
                  {editMode ? (
                    <div className="space-y-2">
                      <input
                        id={`edit-proj-title-${project.id}`}
                        type="text"
                        value={project.title}
                        onChange={(e) => handleProjectChange(project.id, 'title', e.target.value)}
                        className="font-display font-bold text-lg text-charcoal-900 dark:text-warm-cream w-full border-b border-dusty-blue-100 bg-transparent py-0.5 focus:outline-none"
                        placeholder="Project Title"
                      />
                      <input
                        id={`edit-proj-cat-${project.id}`}
                        type="text"
                        value={project.category}
                        onChange={(e) => handleProjectChange(project.id, 'category', e.target.value)}
                        className="text-xs text-dusty-blue-600 dark:text-sage-500 font-semibold w-full border-b border-dusty-blue-100 bg-transparent py-0.5 focus:outline-none"
                        placeholder="Category"
                      />
                      <textarea
                        id={`edit-proj-desc-${project.id}`}
                        value={project.description}
                        onChange={(e) => handleProjectChange(project.id, 'description', e.target.value)}
                        rows={2}
                        className="w-full border border-dusty-blue-100 bg-transparent p-1.5 rounded focus:outline-none text-xs"
                        placeholder="Short summary"
                      />
                    </div>
                  ) : (
                    <>
                      <h3 className="font-display font-extrabold text-xl text-charcoal-900 dark:text-warm-cream tracking-tight group-hover:text-dusty-blue-500 dark:group-hover:text-sage-500 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-charcoal-700/80 dark:text-warm-cream/70 line-clamp-2">
                        {project.description}
                      </p>
                    </>
                  )}
                </div>

                {/* Tags row */}
                <div className="mt-4 pt-4 border-t border-dusty-blue-100/10 dark:border-charcoal-800/10">
                  {editMode ? (
                    <div>
                      <label className="text-[10px] font-semibold text-gray-400">Stack Tags (comma separated):</label>
                      <input
                        id={`edit-proj-tags-${project.id}`}
                        type="text"
                        value={project.tags.join(', ')}
                        onChange={(e) => handleTagsChange(project.id, e.target.value)}
                        className="w-full text-xs border-b border-dusty-blue-100 bg-transparent py-0.5 focus:outline-none"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-semibold text-charcoal-700/60 dark:text-warm-cream/50 bg-dusty-blue-50 dark:bg-charcoal-800/40 px-2 py-1 rounded-md font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Edit details form URLs */}
                {editMode && (
                  <div className="mt-4 space-y-2 pt-4 border-t border-dusty-blue-100/10 dark:border-charcoal-800/10 text-xs">
                    <div>
                      <span className="font-semibold text-gray-400">Demo URL:</span>
                      <input
                        id={`edit-proj-demo-${project.id}`}
                        type="text"
                        value={project.demoUrl || ''}
                        onChange={(e) => handleProjectChange(project.id, 'demoUrl', e.target.value)}
                        className="w-full p-1 bg-gray-50 border border-gray-100 rounded focus:outline-none"
                      />
                    </div>
                    <div>
                      <span className="font-semibold text-gray-400">GitHub URL:</span>
                      <input
                        id={`edit-proj-git-${project.id}`}
                        type="text"
                        value={project.githubUrl || ''}
                        onChange={(e) => handleProjectChange(project.id, 'githubUrl', e.target.value)}
                        className="w-full p-1 bg-gray-50 border border-gray-100 rounded focus:outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-1.5 pt-2">
                      <input
                        id={`edit-proj-feat-${project.id}`}
                        type="checkbox"
                        checked={project.featured}
                        onChange={(e) => handleProjectChange(project.id, 'featured', e.target.checked)}
                      />
                      <span className="text-[10px] font-semibold text-gray-400">Pin as Featured project</span>
                    </div>

                    <div className="flex justify-end pt-2 border-t border-dusty-blue-100/10">
                      <button
                        id={`delete-proj-${project.id}`}
                        onClick={(e) => deleteProject(project.id, e)}
                        className="flex items-center gap-1 px-3 py-1 text-[10px] font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-md cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" /> Remove Project
                      </button>
                    </div>
                  </div>
                )}

              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Floating Add Project Button */}
      {editMode && (
        <div className="flex justify-center mt-12">
          <button
            id="add-proj-btn"
            onClick={addNewProject}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-sage-500 hover:bg-sage-600 text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Project to "{selectedCategory}"
          </button>
        </div>
      )}

      {/* Spec details modal for non-edit mode */}
      <AnimatePresence>
        {activeProjectModal && (
          <div
            id="project-overlay-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/80 no-print"
            onClick={() => setActiveProjectModal(null)}
          >
            <motion.div
              id="project-modal-content"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()} // prevent overlay close
              className="bg-white dark:bg-charcoal-800 w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-dusty-blue-100/10"
            >
              {/* Modal Banner Banner Image */}
              <div className="relative aspect-video w-full bg-gray-100">
                <img
                  src={activeProjectModal.imageUrl}
                  alt={activeProjectModal.title}
                  className="w-full h-full object-cover"
                />
                <button
                  id="close-modal-btn"
                  onClick={() => setActiveProjectModal(null)}
                  className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-4 bg-dusty-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase shadow">
                  {activeProjectModal.category}
                </div>
              </div>

              {/* Specs Text */}
              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <h3 className="font-display font-extrabold text-2xl text-charcoal-900 dark:text-warm-cream tracking-tight">
                    {activeProjectModal.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProjectModal.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-semibold text-charcoal-700/60 dark:text-warm-cream/50 bg-dusty-blue-50 dark:bg-charcoal-800/40 px-2.5 py-1 rounded-md font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-semibold text-charcoal-800 dark:text-warm-cream/90 leading-relaxed border-l-2 border-sage-500 pl-3 italic">
                    {activeProjectModal.description}
                  </p>
                  <p className="text-sm text-charcoal-700/70 dark:text-warm-cream/60 leading-relaxed">
                    {activeProjectModal.longDescription || "This specialized development incorporates modular architectures, rigorous custom styling wrappers, and fluid event pipelines optimizing rendering latency and runtime responsiveness."}
                  </p>
                </div>

                {/* External links action row */}
                <div className="flex items-center gap-4 pt-4 border-t border-dusty-blue-100/15 dark:border-charcoal-800/10">
                  {activeProjectModal.demoUrl && (
                    <a
                      id="modal-live-demo-btn"
                      href={activeProjectModal.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-dusty-blue-500 hover:bg-dusty-blue-600 text-white font-semibold text-xs shadow transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" /> Live Web Demo
                    </a>
                  )}
                  {activeProjectModal.githubUrl && (
                    <a
                      id="modal-github-btn"
                      href={activeProjectModal.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gray-50 dark:bg-charcoal-700 hover:bg-gray-100 dark:hover:bg-charcoal-600 text-charcoal-700 dark:text-warm-cream font-semibold text-xs border border-gray-200 dark:border-charcoal-600 transition-colors cursor-pointer"
                    >
                      <Github className="w-4 h-4" /> Source Code
                    </a>
                  )}
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
