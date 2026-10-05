import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  LogOut, 
  Sparkles, 
  Layers, 
  Code2, 
  Wrench, 
  User, 
  Share2, 
  Inbox, 
  FileText, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  AlertCircle, 
  ExternalLink,
  RefreshCw,
  Clock,
  Tv,
  Eye,
  CheckCircle2,
  Database
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project, Skill, Service, SocialLink, ContentItem, Message, ProjectRequest, Profile } from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const { 
    currentUser, 
    isAdmin, 
    loginWithGoogle, 
    logout,
    profile,
    projects,
    skills,
    services,
    socialLinks,
    contentItems,
    messages,
    projectRequests,
    updateProfile,
    saveProject,
    deleteProject,
    saveSkill,
    deleteSkill,
    saveService,
    deleteService,
    saveSocialLink,
    deleteSocialLink,
    saveContentItem,
    deleteContentItem,
    updateMessageStatus,
    deleteMessage,
    updateProjectRequestStatus,
    deleteProjectRequest,
    seedAllData
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'projects' | 'skills' | 'services' | 'requests' | 'messages' | 'profile' | 'social' | 'content'
  >('overview');

  // Form states for editing
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingSocial, setEditingSocial] = useState<SocialLink | null>(null);
  const [editingContent, setEditingContent] = useState<ContentItem | null>(null);

  // Profile Form state
  const [profileForm, setProfileForm] = useState<Profile>(profile);

  // Seeding state
  const [seeding, setSeeding] = useState(false);
  const [seedSuccess, setSeedSuccess] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const showFeedback = (msg: string) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 3500);
  };

  const handleSeed = async () => {
    if (!window.confirm('This will populate or reset all initial Bug Creator projects, skills, services, and profile data in Firestore. Continue?')) {
      return;
    }
    setSeeding(true);
    try {
      const ok = await seedAllData();
      if (ok) {
        setSeedSuccess(true);
        showFeedback('All portfolio data successfully initialized in Firestore!');
      }
    } catch (err: any) {
      alert('Error seeding data: ' + err.message);
    } finally {
      setSeeding(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await updateProfile(profileForm);
    if (ok) {
      showFeedback('Profile updated successfully in Firestore!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-6xl rounded-2xl bg-[#0b0f1a] border border-slate-800 shadow-2xl shadow-cyan-950/40 overflow-hidden my-4 flex flex-col h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white font-display">Bug Creator Admin Dashboard</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                  v2.0
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {currentUser ? `Signed in as: ${currentUser.email}` : 'Authentication Required'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {currentUser && (
              <button
                onClick={logout}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Action Message Notification */}
        {actionMessage && (
          <div className="bg-emerald-950/90 border-b border-emerald-500/50 px-6 py-2.5 text-xs text-emerald-300 font-mono flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{actionMessage}</span>
            </div>
            <button onClick={() => setActionMessage(null)} className="text-emerald-400 hover:text-white">✕</button>
          </div>
        )}

        {/* Auth Gate */}
        {!currentUser ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="max-w-md w-full p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-6 shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mx-auto">
                <Lock className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white font-display">Admin Authentication</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Sign in with Google to access the Bug Creator dynamic portfolio management dashboard. Only the authorized owner (<strong className="text-cyan-400">mijarulkhkh@gmail.com</strong>) has full write privileges.
                </p>
              </div>

              <button
                onClick={loginWithGoogle}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Sign in with Google</span>
              </button>
            </div>
          </div>
        ) : !isAdmin ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="max-w-md w-full p-8 rounded-2xl bg-slate-900 border border-amber-800/40 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Unauthorized Access</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                You are currently signed in as <span className="font-mono text-white">{currentUser.email}</span>. Only the portfolio owner (<span className="font-mono text-cyan-400">mijarulkhkh@gmail.com</span>) has administrative permissions to modify portfolio data.
              </p>
              <button
                onClick={logout}
                className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
              >
                Sign In with Owner Account
              </button>
            </div>
          </div>
        ) : (
          /* Admin Main Layout */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Navigation */}
            <div className="w-full md:w-60 bg-slate-900/60 border-b md:border-b-0 md:border-r border-slate-800 p-3 space-y-1 shrink-0 overflow-x-auto md:overflow-y-auto">
              
              <div className="text-[10px] font-mono uppercase text-slate-500 px-3 py-2">
                Management Modules
              </div>

              {[
                { id: 'overview', label: 'Overview', icon: Sparkles },
                { id: 'projects', label: 'Projects', icon: Layers, count: projects.length },
                { id: 'skills', label: 'Skills', icon: Code2, count: skills.length },
                { id: 'services', label: 'Services', icon: Wrench, count: services.length },
                { id: 'requests', label: 'Client Requests', icon: FileText, count: projectRequests.length },
                { id: 'messages', label: 'Messages', icon: Inbox, count: messages.filter(m => m.status === 'unread').length },
                { id: 'profile', label: 'Profile Details', icon: User },
                { id: 'social', label: 'Social Links', icon: Share2, count: socialLinks.length },
                { id: 'content', label: 'Content Showcase', icon: Tv, count: contentItems.length }
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-cyan-400" />
                      <span>{item.label}</span>
                    </div>
                    {item.count !== undefined && item.count > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-800 text-slate-300">
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}

              <div className="pt-4 mt-4 border-t border-slate-800">
                <button
                  onClick={handleSeed}
                  disabled={seeding}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 hover:text-cyan-300 text-xs font-mono flex items-center justify-center gap-2 border border-slate-700 transition-colors cursor-pointer disabled:opacity-50"
                  title="Populates initial projects, skills, services, and profile into Firestore"
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>{seeding ? 'Seeding...' : 'Seed Default Data'}</span>
                </button>
              </div>

            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#090d16]">
              
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white font-display">System Overview</h3>
                    <p className="text-xs text-slate-400">Live operational metrics from Firestore database</p>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <span className="text-[11px] font-mono text-slate-400">Total Projects</span>
                      <p className="text-2xl font-bold font-display text-white">{projects.length}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <span className="text-[11px] font-mono text-slate-400">Client Requests</span>
                      <p className="text-2xl font-bold font-display text-cyan-400">{projectRequests.length}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <span className="text-[11px] font-mono text-slate-400">Messages</span>
                      <p className="text-2xl font-bold font-display text-emerald-400">{messages.length}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <span className="text-[11px] font-mono text-slate-400">Active Skills</span>
                      <p className="text-2xl font-bold font-display text-indigo-400">{skills.length}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <span className="text-[11px] font-mono text-slate-400">Services</span>
                      <p className="text-2xl font-bold font-display text-purple-400">{services.length}</p>
                    </div>
                  </div>

                  {/* Quick Seed Banner */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                        <Sparkles className="w-4 h-4" />
                        <span>Database Initializer</span>
                      </div>
                      <p className="text-xs text-slate-300">
                        If this is a fresh setup or you need to restore all default projects (Al Quran, Namaz Time, Puzzal, etc.), click to sync everything into Firestore.
                      </p>
                    </div>
                    <button
                      onClick={handleSeed}
                      disabled={seeding}
                      className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-colors shrink-0 shadow-md cursor-pointer disabled:opacity-50"
                    >
                      {seeding ? 'Syncing to Firestore...' : 'Sync All Default Data'}
                    </button>
                  </div>

                  {/* Recent Client Requests Snapshot */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                        Recent Client Project Inquiries
                      </h4>
                      <button 
                        onClick={() => setActiveTab('requests')}
                        className="text-xs text-cyan-400 hover:underline"
                      >
                        View All ({projectRequests.length})
                      </button>
                    </div>

                    {projectRequests.length === 0 ? (
                      <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 text-center text-xs text-slate-500">
                        No client requests submitted yet. Visitors will appear here when they submit the Hire Me / Request form.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {projectRequests.slice(0, 3).map((req) => (
                          <div key={req.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-white text-xs">{req.clientName}</span>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">{req.projectType}</span>
                              </div>
                              <p className="text-xs text-slate-400 line-clamp-1">{req.projectDescription}</p>
                            </div>
                            <span className="text-xs font-mono text-cyan-400 shrink-0 font-bold">{req.budget || 'Custom'}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: PROJECTS MANAGEMENT */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white font-display">Manage Portfolio Projects</h3>
                      <p className="text-xs text-slate-400">Add, edit, publish, or remove projects shown on the website</p>
                    </div>

                    <button
                      onClick={() => setEditingProject({
                        id: `proj-${Date.now()}`,
                        title: '',
                        description: '',
                        fullDescription: '',
                        category: 'Web Applications',
                        technologies: '',
                        imageUrl: '',
                        demoUrl: '',
                        githubUrl: '',
                        status: 'Completed',
                        features: '',
                        problemStatement: '',
                        solution: '',
                        isPublished: true,
                        displayOrder: projects.length + 1,
                        createdAt: new Date().toISOString().split('T')[0],
                        updatedAt: new Date().toISOString().split('T')[0]
                      })}
                      className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Project</span>
                    </button>
                  </div>

                  {/* Projects List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map((proj) => (
                      <div key={proj.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-[10px] font-mono text-cyan-400 uppercase">{proj.category}</span>
                            <h4 className="text-sm font-bold text-white">{proj.title}</h4>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            {proj.status}
                          </span>
                        </div>

                        <p className="text-xs text-slate-400 line-clamp-2">{proj.description}</p>
                        <p className="text-[11px] font-mono text-slate-500 truncate">Tech: {proj.technologies}</p>

                        <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                          <span className="text-[10px] font-mono text-slate-500">Order: #{proj.displayOrder || 1}</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditingProject(proj)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={async () => {
                                if (window.confirm(`Delete project "${proj.title}"?`)) {
                                  await deleteProject(proj.id);
                                  showFeedback('Project removed.');
                                }
                              }}
                              className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/60 text-rose-400 text-xs transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Edit/Create Project Modal */}
                  {editingProject && (
                    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                      <div className="w-full max-w-2xl bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4 max-h-[85vh] overflow-y-auto shadow-2xl">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                          <h4 className="text-base font-bold text-white">
                            {editingProject.title ? `Edit: ${editingProject.title}` : 'Add New Project'}
                          </h4>
                          <button onClick={() => setEditingProject(null)} className="text-slate-400 hover:text-white">✕</button>
                        </div>

                        <div className="space-y-3 text-xs">
                          <div>
                            <label className="text-slate-300 font-mono">Title</label>
                            <input
                              type="text"
                              value={editingProject.title}
                              onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white mt-1"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-slate-300 font-mono">Category</label>
                              <select
                                value={editingProject.category}
                                onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white mt-1"
                              >
                                {['Android Apps', 'Web Applications', 'Websites', 'AI Applications', 'Firebase Applications', 'Other Projects'].map(c => (
                                  <option key={c} value={c}>{c}</option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="text-slate-300 font-mono">Status</label>
                              <select
                                value={editingProject.status}
                                onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as any })}
                                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white mt-1"
                              >
                                {['Completed', 'In Progress', 'Coming Soon'].map(s => (
                                  <option key={s} value={s}>{s}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="text-slate-300 font-mono">Short Description</label>
                            <textarea
                              rows={2}
                              value={editingProject.description}
                              onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white mt-1"
                            />
                          </div>

                          <div>
                            <label className="text-slate-300 font-mono">Full Detailed Description</label>
                            <textarea
                              rows={3}
                              value={editingProject.fullDescription}
                              onChange={(e) => setEditingProject({ ...editingProject, fullDescription: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white mt-1"
                            />
                          </div>

                          <div>
                            <label className="text-slate-300 font-mono">Technologies (comma separated)</label>
                            <input
                              type="text"
                              value={editingProject.technologies}
                              onChange={(e) => setEditingProject({ ...editingProject, technologies: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white mt-1"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-slate-300 font-mono">Demo URL</label>
                              <input
                                type="text"
                                value={editingProject.demoUrl}
                                onChange={(e) => setEditingProject({ ...editingProject, demoUrl: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white mt-1"
                              />
                            </div>
                            <div>
                              <label className="text-slate-300 font-mono">GitHub URL</label>
                              <input
                                type="text"
                                value={editingProject.githubUrl}
                                onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white mt-1"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-slate-300 font-mono">Image URL</label>
                            <input
                              type="text"
                              value={editingProject.imageUrl}
                              onChange={(e) => setEditingProject({ ...editingProject, imageUrl: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white mt-1"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-slate-300 font-mono">Problem Statement</label>
                              <textarea
                                rows={2}
                                value={editingProject.problemStatement}
                                onChange={(e) => setEditingProject({ ...editingProject, problemStatement: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white mt-1"
                              />
                            </div>
                            <div>
                              <label className="text-slate-300 font-mono">Engineered Solution</label>
                              <textarea
                                rows={2}
                                value={editingProject.solution}
                                onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white mt-1"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-slate-300 font-mono">Features (line-separated)</label>
                            <textarea
                              rows={2}
                              value={editingProject.features}
                              onChange={(e) => setEditingProject({ ...editingProject, features: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white mt-1"
                            />
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                          <button
                            onClick={() => setEditingProject(null)}
                            className="px-4 py-2 rounded-lg bg-slate-800 text-xs text-slate-300"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={async () => {
                              await saveProject(editingProject);
                              setEditingProject(null);
                              showFeedback('Project saved to Firestore!');
                            }}
                            className="px-5 py-2 rounded-lg bg-cyan-500 text-slate-950 font-semibold text-xs"
                          >
                            Save Project
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* TAB 3: SKILLS MANAGEMENT */}
              {activeTab === 'skills' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white font-display">Manage Skills</h3>
                      <p className="text-xs text-slate-400">Control technical proficiencies, progress bars, and categories</p>
                    </div>

                    <button
                      onClick={() => setEditingSkill({
                        id: `skill-${Date.now()}`,
                        name: '',
                        category: 'Frontend',
                        level: 80,
                        icon: 'Code2',
                        description: '',
                        displayOrder: skills.length + 1
                      })}
                      className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Skill</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {skills.map((s) => (
                      <div key={s.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-mono text-cyan-400 uppercase">{s.category}</span>
                            <h4 className="text-sm font-bold text-white">{s.name}</h4>
                          </div>
                          <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded">
                            {s.level}%
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">{s.description}</p>
                        <div className="pt-2 border-t border-slate-800 flex justify-end gap-2">
                          <button
                            onClick={() => setEditingSkill(s)}
                            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={async () => {
                              if (window.confirm(`Delete skill "${s.name}"?`)) {
                                await deleteSkill(s.id);
                                showFeedback('Skill deleted.');
                              }
                            }}
                            className="p-1 rounded bg-rose-950 text-rose-400 text-xs px-2"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {editingSkill && (
                    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                      <div className="w-full max-w-md bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
                        <h4 className="text-sm font-bold text-white">Edit Skill</h4>
                        <div className="space-y-3 text-xs">
                          <div>
                            <label className="text-slate-300 font-mono">Skill Name</label>
                            <input
                              type="text"
                              value={editingSkill.name}
                              onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white mt-1"
                            />
                          </div>
                          <div>
                            <label className="text-slate-300 font-mono">Category</label>
                            <select
                              value={editingSkill.category}
                              onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value as any })}
                              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white mt-1"
                            >
                              {['Frontend', 'Backend & DB', 'Mobile & Apps', 'Core & Tools'].map(c => (
                                <option key={c} value={c}>{c}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="text-slate-300 font-mono">Proficiency: {editingSkill.level}%</label>
                            <input
                              type="range"
                              min="10"
                              max="100"
                              value={editingSkill.level}
                              onChange={(e) => setEditingSkill({ ...editingSkill, level: Number(e.target.value) })}
                              className="w-full mt-1"
                            />
                          </div>
                          <div>
                            <label className="text-slate-300 font-mono">Description</label>
                            <input
                              type="text"
                              value={editingSkill.description}
                              onChange={(e) => setEditingSkill({ ...editingSkill, description: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white mt-1"
                            />
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                          <button onClick={() => setEditingSkill(null)} className="px-4 py-2 bg-slate-800 text-xs text-slate-300 rounded-lg">Cancel</button>
                          <button
                            onClick={async () => {
                              await saveSkill(editingSkill);
                              setEditingSkill(null);
                              showFeedback('Skill updated in Firestore!');
                            }}
                            className="px-4 py-2 bg-cyan-500 text-slate-950 font-semibold text-xs rounded-lg"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* TAB 4: SERVICES MANAGEMENT */}
              {activeTab === 'services' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white font-display">Manage Services</h3>
                      <p className="text-xs text-slate-400">Add or edit development offerings shown in the Services section</p>
                    </div>

                    <button
                      onClick={() => setEditingService({
                        id: `service-${Date.now()}`,
                        title: '',
                        description: '',
                        icon: 'Wrench',
                        features: '',
                        turnaround: '1 - 2 Weeks',
                        displayOrder: services.length + 1
                      })}
                      className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Service</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((srv) => (
                      <div key={srv.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-white">{srv.title}</h4>
                          <span className="text-[10px] font-mono text-cyan-400">{srv.turnaround}</span>
                        </div>
                        <p className="text-xs text-slate-400">{srv.description}</p>
                        <div className="pt-2 border-t border-slate-800 flex justify-end gap-2">
                          <button
                            onClick={() => setEditingService(srv)}
                            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={async () => {
                              if (window.confirm(`Delete service "${srv.title}"?`)) {
                                await deleteService(srv.id);
                                showFeedback('Service deleted.');
                              }
                            }}
                            className="p-1 rounded bg-rose-950 text-rose-400 text-xs px-2"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {editingService && (
                    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                      <div className="w-full max-w-md bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
                        <h4 className="text-sm font-bold text-white">Edit Service</h4>
                        <div className="space-y-3 text-xs">
                          <div>
                            <label className="text-slate-300 font-mono">Service Title</label>
                            <input
                              type="text"
                              value={editingService.title}
                              onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white mt-1"
                            />
                          </div>
                          <div>
                            <label className="text-slate-300 font-mono">Turnaround Time</label>
                            <input
                              type="text"
                              value={editingService.turnaround}
                              onChange={(e) => setEditingService({ ...editingService, turnaround: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white mt-1"
                            />
                          </div>
                          <div>
                            <label className="text-slate-300 font-mono">Description</label>
                            <textarea
                              rows={2}
                              value={editingService.description}
                              onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white mt-1"
                            />
                          </div>
                          <div>
                            <label className="text-slate-300 font-mono">Features (line-separated)</label>
                            <textarea
                              rows={3}
                              value={editingService.features}
                              onChange={(e) => setEditingService({ ...editingService, features: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white mt-1"
                            />
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                          <button onClick={() => setEditingService(null)} className="px-4 py-2 bg-slate-800 text-xs text-slate-300 rounded-lg">Cancel</button>
                          <button
                            onClick={async () => {
                              await saveService(editingService);
                              setEditingService(null);
                              showFeedback('Service saved to Firestore!');
                            }}
                            className="px-4 py-2 bg-cyan-500 text-slate-950 font-semibold text-xs rounded-lg"
                          >
                            Save Service
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* TAB 5: CLIENT REQUESTS */}
              {activeTab === 'requests' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white font-display">Client Project Requests</h3>
                    <p className="text-xs text-slate-400">Direct proposal submissions from potential clients and businesses</p>
                  </div>

                  {projectRequests.length === 0 ? (
                    <div className="p-8 rounded-xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-500">
                      No project proposals received yet. Submissions from the Hire Me modal will be recorded here.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {projectRequests.map((req) => (
                        <div key={req.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-bold text-white">{req.clientName}</h4>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                                  {req.projectType}
                                </span>
                              </div>
                              <p className="text-xs text-slate-400 font-mono mt-0.5">
                                {req.email} {req.phone && `• ${req.phone}`}
                              </p>
                            </div>

                            <div className="flex items-center gap-2">
                              <select
                                value={req.status}
                                onChange={async (e) => {
                                  await updateProjectRequestStatus(req.id, e.target.value as any);
                                  showFeedback('Status updated.');
                                }}
                                className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-mono text-cyan-300 outline-none"
                              >
                                {['new', 'reviewing', 'accepted', 'declined', 'completed'].map(st => (
                                  <option key={st} value={st}>{st.toUpperCase()}</option>
                                ))}
                              </select>

                              <button
                                onClick={async () => {
                                  if (window.confirm('Delete this client request?')) {
                                    await deleteProjectRequest(req.id);
                                    showFeedback('Request removed.');
                                  }
                                }}
                                className="p-1.5 rounded-lg bg-rose-950 text-rose-400 hover:bg-rose-900 text-xs"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="space-y-2 text-xs">
                            <div>
                              <span className="font-mono text-slate-500 uppercase text-[10px]">Description:</span>
                              <p className="text-slate-300 pt-0.5 leading-relaxed">{req.projectDescription}</p>
                            </div>

                            {req.requiredFeatures && (
                              <div>
                                <span className="font-mono text-slate-500 uppercase text-[10px]">Required Features:</span>
                                <p className="text-slate-300 pt-0.5">{req.requiredFeatures}</p>
                              </div>
                            )}

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-[11px] font-mono text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                              <div>Budget: <strong className="text-white">{req.budget || 'N/A'}</strong></div>
                              <div>Deadline: <strong className="text-white">{req.deadline || 'N/A'}</strong></div>
                              <div>Ref: <strong className="text-cyan-400">{req.referenceUrl ? <a href={req.referenceUrl} target="_blank" rel="noreferrer" className="underline">Link</a> : 'None'}</strong></div>
                              <div>Date: <strong className="text-slate-300">{req.createdAt?.split('T')[0]}</strong></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              )}

              {/* TAB 6: MESSAGES */}
              {activeTab === 'messages' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white font-display">Contact Messages</h3>
                    <p className="text-xs text-slate-400">Direct inquiries submitted from the Contact section</p>
                  </div>

                  {messages.length === 0 ? (
                    <div className="p-8 rounded-xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-500">
                      No messages received yet.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {messages.map((msg) => (
                        <div key={msg.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-bold text-white">{msg.fullName}</h4>
                              <span className="text-[10px] font-mono text-cyan-400">({msg.email})</span>
                              {msg.status === 'unread' && (
                                <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800">NEW</span>
                              )}
                            </div>
                            <span className="text-[10px] font-mono text-slate-500">{msg.createdAt?.split('T')[0]}</span>
                          </div>

                          <p className="text-xs text-slate-300 leading-relaxed">{msg.message}</p>

                          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                            <span className="text-[10px] font-mono text-slate-500">
                              Type: {msg.projectType || 'General'} | Budget: {msg.budget || 'Unspecified'}
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={async () => {
                                  const next = msg.status === 'unread' ? 'read' : 'unread';
                                  await updateMessageStatus(msg.id, next);
                                }}
                                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] font-mono text-slate-300"
                              >
                                Mark {msg.status === 'unread' ? 'Read' : 'Unread'}
                              </button>
                              <button
                                onClick={async () => {
                                  if (window.confirm('Delete message?')) {
                                    await deleteMessage(msg.id);
                                    showFeedback('Message deleted.');
                                  }
                                }}
                                className="p-1 rounded bg-rose-950 text-rose-400 text-xs"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              )}

              {/* TAB 7: PROFILE */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white font-display">Edit Profile & Brand Details</h3>
                    <p className="text-xs text-slate-400">Update developer tagline, bio, contact credentials, and statistics</p>
                  </div>

                  <form onSubmit={handleSaveProfile} className="space-y-4 max-w-2xl bg-slate-900 p-6 rounded-2xl border border-slate-800">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-mono text-slate-300">Full Name</label>
                        <input
                          type="text"
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono text-slate-300">Location</label>
                        <input
                          type="text"
                          value={profileForm.location}
                          onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300">Developer Tagline</label>
                      <input
                        type="text"
                        value={profileForm.tagline}
                        onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300">Short Bio</label>
                      <textarea
                        rows={3}
                        value={profileForm.bio}
                        onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-xs font-mono text-slate-300">Years Exp</label>
                        <input
                          type="text"
                          value={profileForm.yearsExperience}
                          onChange={(e) => setProfileForm({ ...profileForm, yearsExperience: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono text-slate-300">Projects Count</label>
                        <input
                          type="text"
                          value={profileForm.completedProjects}
                          onChange={(e) => setProfileForm({ ...profileForm, completedProjects: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono text-slate-300">Satisfaction</label>
                        <input
                          type="text"
                          value={profileForm.happyClients}
                          onChange={(e) => setProfileForm({ ...profileForm, happyClients: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-mono text-slate-300">Email Address</label>
                        <input
                          type="email"
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono text-slate-300">Phone</label>
                        <input
                          type="text"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300">Avatar Image URL</label>
                      <input
                        type="text"
                        value={profileForm.avatarUrl}
                        onChange={(e) => setProfileForm({ ...profileForm, avatarUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white mt-1"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                      >
                        Save Profile Changes
                      </button>
                    </div>
                  </form>

                </div>
              )}

              {/* TAB 8: SOCIAL LINKS */}
              {activeTab === 'social' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white font-display">Manage Social Media Links</h3>
                    <p className="text-xs text-slate-400">Update YouTube, Instagram, GitHub, and LinkedIn handles and URLs</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {socialLinks.map((link) => (
                      <div key={link.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-white">{link.platform}</h4>
                          <span className="text-[10px] font-mono text-cyan-400">{link.handle}</span>
                        </div>
                        <p className="text-[11px] font-mono text-slate-500 truncate">{link.url}</p>
                        <div className="pt-2 border-t border-slate-800 flex justify-end gap-2">
                          <button
                            onClick={() => setEditingSocial(link)}
                            className="p-1 px-2.5 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {editingSocial && (
                    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                      <div className="w-full max-w-md bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
                        <h4 className="text-sm font-bold text-white">Edit {editingSocial.platform} Link</h4>
                        <div className="space-y-3 text-xs">
                          <div>
                            <label className="text-slate-300 font-mono">Platform</label>
                            <input
                              type="text"
                              value={editingSocial.platform}
                              onChange={(e) => setEditingSocial({ ...editingSocial, platform: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white mt-1"
                            />
                          </div>
                          <div>
                            <label className="text-slate-300 font-mono">Handle / Username</label>
                            <input
                              type="text"
                              value={editingSocial.handle}
                              onChange={(e) => setEditingSocial({ ...editingSocial, handle: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white mt-1"
                            />
                          </div>
                          <div>
                            <label className="text-slate-300 font-mono">URL</label>
                            <input
                              type="text"
                              value={editingSocial.url}
                              onChange={(e) => setEditingSocial({ ...editingSocial, url: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white mt-1"
                            />
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                          <button onClick={() => setEditingSocial(null)} className="px-4 py-2 bg-slate-800 text-xs text-slate-300 rounded-lg">Cancel</button>
                          <button
                            onClick={async () => {
                              await saveSocialLink(editingSocial);
                              setEditingSocial(null);
                              showFeedback('Social link saved!');
                            }}
                            className="px-4 py-2 bg-cyan-500 text-slate-950 font-semibold text-xs rounded-lg"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* TAB 9: CONTENT SHOWCASE */}
              {activeTab === 'content' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white font-display">Manage Content Showcase</h3>
                      <p className="text-xs text-slate-400">Videos, tutorials, and reels featured on the Content Creator section</p>
                    </div>

                    <button
                      onClick={() => setEditingContent({
                        id: `content-${Date.now()}`,
                        title: '',
                        platform: 'YouTube',
                        url: 'https://youtube.com/@bugcreator',
                        thumbnailUrl: '',
                        category: 'App Development',
                        description: '',
                        displayOrder: contentItems.length + 1
                      })}
                      className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Video</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {contentItems.map((c) => (
                      <div key={c.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-cyan-400 uppercase">{c.platform} • {c.category}</span>
                          <span className="text-[10px] font-mono text-slate-500">#{c.displayOrder}</span>
                        </div>
                        <h4 className="text-xs font-bold text-white">{c.title}</h4>
                        <p className="text-xs text-slate-400 line-clamp-2">{c.description}</p>
                        <div className="pt-2 border-t border-slate-800 flex justify-end gap-2">
                          <button
                            onClick={() => setEditingContent(c)}
                            className="p-1 px-2.5 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300"
                          >
                            Edit
                          </button>
                          <button
                            onClick={async () => {
                              if (window.confirm('Delete this content item?')) {
                                await deleteContentItem(c.id);
                                showFeedback('Content item deleted.');
                              }
                            }}
                            className="p-1 px-2.5 rounded bg-rose-950 text-rose-400 text-xs"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {editingContent && (
                    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                      <div className="w-full max-w-md bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
                        <h4 className="text-sm font-bold text-white">Edit Video Content</h4>
                        <div className="space-y-3 text-xs">
                          <div>
                            <label className="text-slate-300 font-mono">Title</label>
                            <input
                              type="text"
                              value={editingContent.title}
                              onChange={(e) => setEditingContent({ ...editingContent, title: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white mt-1"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-slate-300 font-mono">Platform</label>
                              <select
                                value={editingContent.platform}
                                onChange={(e) => setEditingContent({ ...editingContent, platform: e.target.value as any })}
                                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white mt-1"
                              >
                                <option value="YouTube">YouTube</option>
                                <option value="Instagram">Instagram</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-slate-300 font-mono">Category</label>
                              <input
                                type="text"
                                value={editingContent.category}
                                onChange={(e) => setEditingContent({ ...editingContent, category: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white mt-1"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-slate-300 font-mono">Video URL</label>
                            <input
                              type="text"
                              value={editingContent.url}
                              onChange={(e) => setEditingContent({ ...editingContent, url: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white mt-1"
                            />
                          </div>
                          <div>
                            <label className="text-slate-300 font-mono">Thumbnail Image URL</label>
                            <input
                              type="text"
                              value={editingContent.thumbnailUrl}
                              onChange={(e) => setEditingContent({ ...editingContent, thumbnailUrl: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white mt-1"
                            />
                          </div>
                          <div>
                            <label className="text-slate-300 font-mono">Description</label>
                            <textarea
                              rows={2}
                              value={editingContent.description}
                              onChange={(e) => setEditingContent({ ...editingContent, description: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white mt-1"
                            />
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                          <button onClick={() => setEditingContent(null)} className="px-4 py-2 bg-slate-800 text-xs text-slate-300 rounded-lg">Cancel</button>
                          <button
                            onClick={async () => {
                              await saveContentItem(editingContent);
                              setEditingContent(null);
                              showFeedback('Content saved to Firestore!');
                            }}
                            className="px-4 py-2 bg-cyan-500 text-slate-950 font-semibold text-xs rounded-lg"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
