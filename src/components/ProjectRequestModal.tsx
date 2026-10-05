import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Calendar, 
  DollarSign, 
  Globe, 
  Layers, 
  HelpCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortfolio } from '../context/PortfolioContext';

interface ProjectRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const ProjectRequestModal: React.FC<ProjectRequestModalProps> = ({ 
  isOpen, 
  onClose,
  initialService 
}) => {
  const { submitProjectRequest } = usePortfolio();

  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    projectType: 'Website',
    projectDescription: '',
    requiredFeatures: '',
    budget: '$1,000 - $2,500',
    deadline: 'Within 1 Month',
    referenceUrl: '',
    additionalMessage: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, projectType: initialService }));
    }
  }, [initialService]);

  if (!isOpen) return null;

  const projectTypes = [
    'Personal Portfolio Website',
    'Business Website',
    'E-commerce Website',
    'High-Converting Landing Page',
    'Responsive Web Application',
    'Custom Android Application',
    'Firebase Backend Architecture',
    'AI-Assisted Web Tool',
    'Custom Tailored Development'
  ];

  const budgetOptions = [
    '< $500 (Prototype / Consultation)',
    '$500 - $1,000 (Standard MVP / Site)',
    '$1,000 - $2,500 (Full Production Web/App)',
    '$2,500 - $5,000 (Comprehensive Enterprise)',
    '$5,000+ (Long-term Contract / Ecosystem)'
  ];

  const deadlineOptions = [
    'Urgent (1 - 2 Weeks)',
    'Standard (2 - 4 Weeks)',
    'Flexible (1 - 2 Months)',
    'Ongoing Retainer'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName.trim() || !formData.email.trim() || !formData.projectDescription.trim()) {
      setErrorMessage('Please provide your name, email, and a brief description of what you need.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await submitProjectRequest(formData);
      if (res.success) {
        setSubmittedId(res.id || 'PROJ-REQ-SUCCESS');
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore confetti if canvas unsupported
        }
      } else {
        setErrorMessage('Failed to submit project request. Please try again.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error occurred while saving request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedId(null);
    setFormData({
      clientName: '',
      email: '',
      phone: '',
      projectType: 'Website',
      projectDescription: '',
      requiredFeatures: '',
      budget: '$1,000 - $2,500',
      deadline: 'Within 1 Month',
      referenceUrl: '',
      additionalMessage: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl rounded-2xl bg-[#0c101d] border border-slate-800 shadow-2xl shadow-cyan-950/40 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900/80 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-display">Request a Project</h3>
              <p className="text-[11px] font-mono text-slate-400">Bug Creator Development Intake Pipeline</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {submittedId ? (
            <div className="py-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-bold text-white font-display">
                  Project Request Submitted Successfully!
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Your project requirements have been recorded in the Bug Creator database. Mijarul Rahaman will review the scope and reach back to you via email within 24 hours.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 max-w-sm mx-auto text-left space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-500">Request Tracking ID</span>
                <p className="text-xs font-mono font-bold text-cyan-400 truncate">{submittedId}</p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Client Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">
                    Your Name or Company <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="e.g. John Doe / TechCorp"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">
                    Email Address <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none"
                  />
                </div>
              </div>

              {/* Phone & Project Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">Target Project Type</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none"
                  >
                    {projectTypes.map(t => (
                      <option key={t} value={t} className="bg-slate-950 text-white">{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300">
                  Project Description & Objectives <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.projectDescription}
                  onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                  placeholder="Provide an overview of what you want to achieve, target audience, and primary goals..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none resize-none"
                />
              </div>

              {/* Required Features */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300">Required Features & Specifications</label>
                <textarea
                  rows={2}
                  value={formData.requiredFeatures}
                  onChange={(e) => setFormData({ ...formData, requiredFeatures: e.target.value })}
                  placeholder="e.g. Firebase Auth, Dark mode, Payment Gateway, Push Notifications, Admin Dashboard..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none resize-none"
                />
              </div>

              {/* Budget & Deadline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">Approximate Budget</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none"
                  >
                    {budgetOptions.map(b => (
                      <option key={b} value={b} className="bg-slate-950 text-white">{b}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">Target Timeline</label>
                  <select
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none"
                  >
                    {deadlineOptions.map(d => (
                      <option key={d} value={d} className="bg-slate-950 text-white">{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Reference Website & Extra message */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">Reference Website / App Link</label>
                  <input
                    type="url"
                    value={formData.referenceUrl}
                    onChange={(e) => setFormData({ ...formData, referenceUrl: e.target.value })}
                    placeholder="https://example.com/inspiration"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">Additional Notes (Optional)</label>
                  <input
                    type="text"
                    value={formData.additionalMessage}
                    onChange={(e) => setFormData({ ...formData, additionalMessage: e.target.value })}
                    placeholder="Any specific design style or tech requirement"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Proposal to Firestore...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Project Proposal</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
