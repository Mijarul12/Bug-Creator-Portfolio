import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  Clock, 
  AlertCircle,
  FileCode2,
  Check
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface ContactProps {
  onRequestProject: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onRequestProject }) => {
  const { profile, submitContactMessage } = usePortfolio();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    projectType: 'Website',
    budget: '$500 - $1,500',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const projectTypes = [
    'Website',
    'Android App',
    'Web Application',
    'E-commerce',
    'Portfolio',
    'Landing Page',
    'Custom Project',
    'Other'
  ];

  const budgetRanges = [
    '< $500 (Small Task)',
    '$500 - $1,500 (Standard Website/App)',
    '$1,500 - $3,500 (Complex Fullstack)',
    '$3,500+ (Enterprise / Scalable Solution)',
    'Hourly / Consultation'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in your name, email, and message.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await submitContactMessage(formData);
      if (res) {
        setSuccess(true);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          projectType: 'Website',
          budget: '$500 - $1,500',
          message: ''
        });
      } else {
        setErrorMessage('Failed to send message. Please try again.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error submitting message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-950/80 border-t border-slate-900">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-950/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-mono uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Inquiries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-display tracking-tight">
            Let's Build Something <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Exceptional</span>
          </h2>
          <p className="text-slate-400 text-base">
            Have a project in mind, need an Android mobile app, or looking for a responsive modern web application? Send a message and let's get started.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info & Booking info */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
              <h3 className="text-xl font-bold text-white font-display">Contact Information</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Feel free to email me directly or leave a message through the form. I typically respond within 12 to 24 hours.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase">Direct Email</span>
                    <a 
                      href={`mailto:${profile.email || 'mijarulkhkh@gmail.com'}`}
                      className="block text-sm font-semibold text-white hover:text-cyan-300 transition-colors font-mono"
                    >
                      {profile.email || 'mijarulkhkh@gmail.com'}
                    </a>
                  </div>
                </div>

                {profile.phone && (
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 uppercase">Phone & WhatsApp</span>
                      <p className="text-sm font-semibold text-white font-mono">
                        {profile.phone}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase">Location</span>
                    <p className="text-sm font-semibold text-white">
                      {profile.location || 'Kolkata, West Bengal, India'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300">Availability Status</span>
                  <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Accepting Clients</span>
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Ready to kickoff new projects with dedicated timeline commitment.
                </p>
              </div>

            </div>

            {/* Need a full specification? Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-800/40 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400">
                <Sparkles className="w-5 h-5" />
                <h4 className="text-sm font-bold uppercase tracking-wider font-mono">Detailed Project Proposal?</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                If you already have clear requirements, feature scope, and a specific deadline, submit via our Project Request Engine for an exact estimate.
              </p>
              <button
                onClick={onRequestProject}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Open Project Request Form</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-xl backdrop-blur-sm">
              
              {success ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-display">Message Sent Successfully!</h3>
                  <p className="text-sm text-slate-400 max-w-md mx-auto">
                    Thank you for reaching out. Mijarul Rahaman has received your inquiry and will respond to your email shortly.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300 font-medium">
                        Full Name <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Alex Johnson"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white text-xs placeholder:text-slate-600 outline-none transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300 font-medium">
                        Email Address <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white text-xs placeholder:text-slate-600 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300 font-medium">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white text-xs placeholder:text-slate-600 outline-none transition-colors"
                      />
                    </div>

                    {/* Project Type */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300 font-medium">
                        Project Type
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white text-xs outline-none transition-colors"
                      >
                        {projectTypes.map(t => (
                          <option key={t} value={t} className="bg-slate-950 text-white">{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 font-medium">
                      Estimated Budget Range
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white text-xs outline-none transition-colors"
                    >
                      {budgetRanges.map(b => (
                        <option key={b} value={b} className="bg-slate-950 text-white">{b}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 font-medium">
                      Your Message or Project Goals <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about what you want to build, timeline, or any questions..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white text-xs placeholder:text-slate-600 outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Submitting Inquiries...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message Directly</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
