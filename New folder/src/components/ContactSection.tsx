import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  Send,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  ExternalLink,
  Lock,
  Loader2,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { ContactFormData, PortfolioItem } from '../types';
import { BRAND_CONFIG, EMAILJS_CONFIG, getWhatsAppUrl } from '../data/config';
import { sendLeadNotification } from '../services/emailService';

interface ContactSectionProps {
  configuredWhatsappNumber?: string;
  onOpenOwnerGuide?: () => void;
  initialProjectInquiry?: PortfolioItem | null;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  configuredWhatsappNumber,
  onOpenOwnerGuide,
  initialProjectInquiry,
}) => {
  const whatsappNumber = configuredWhatsappNumber || BRAND_CONFIG.defaultWhatsappNumber;

  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    whatsappNumber: '',
    projectType: initialProjectInquiry
      ? `${initialProjectInquiry.category} (Similar to "${initialProjectInquiry.title}")`
      : 'YouTube Thumbnail Design',
    projectDescription: initialProjectInquiry
      ? `Hi HEXA! I'm interested in a thumbnail design inspired by your project "${initialProjectInquiry.title}". Here are my channel and video details:`
      : '',
    budgetRange: '',
    preferredContact: 'WhatsApp',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);

  // Validate form
  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.projectDescription.trim()) {
      newErrors.projectDescription = 'Project Description is required';
    } else if (formData.projectDescription.trim().length < 15) {
      newErrors.projectDescription = 'Please provide at least 15 characters describing your idea';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmissionStatus('idle');

    try {
      // 1. Dispatch directly to Harsh's Gmail via EmailJS (service_5vf9mq7, template_gvfaxr5, Hp_5HQQz3AkeY16Nk)
      await sendLeadNotification(formData);

      // 2. Store in local contact submissions cache for owner review dashboard
      const existingSubmissions = JSON.parse(localStorage.getItem('hexa_inquiries') || '[]');
      existingSubmissions.unshift({
        ...formData,
        submittedAt: new Date().toISOString(),
        deliveryChannel: 'EmailJS (Gmail: singhharsh83755@gmail.com)',
      });
      localStorage.setItem('hexa_inquiries', JSON.stringify(existingSubmissions));

      setSubmittedData({ ...formData });
      setSubmissionStatus('success');
    } catch (err) {
      console.error('Contact submission error:', err);
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // WhatsApp click-to-chat URL with prefilled message
  const whatsappUrl = getWhatsAppUrl(
    whatsappNumber,
    formData.projectDescription
      ? `Hi Harsh! I'm interested in a design project (${formData.projectType}): ${formData.projectDescription}`
      : BRAND_CONFIG.whatsappPrefillMessage
  );

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="flex items-center justify-center gap-2 text-xs font-mono-code uppercase tracking-wider text-[#00D5F5] mb-2">
          <span>Get in Touch</span>
          <span aria-hidden="true">·</span>
          <span>Start a Project</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-4">
          Let's Create Something That Stands Out.
        </h2>
        <p className="text-base sm:text-lg text-[#A3A8B3] leading-relaxed">
          Have a thumbnail idea or a creative project in mind? Share your requirements with HEXA, and let's explore how to turn your idea into a compelling visual.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct WhatsApp Contact & Brand Channel Info */}
        <div className="lg:col-span-5 space-y-6">
          {/* Prominent WhatsApp Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#23232A]/70 border border-[#25D366]/20 relative overflow-hidden group hover:border-[#25D366]/50 transition-all duration-300 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center text-[#25D366]">
                <MessageSquare className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono-code text-[#00E99A] uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E99A] animate-ping" />
                Live on WhatsApp
              </span>
            </div>

            <h3 className="text-xl font-bold font-display text-white mb-1">
              Chat Directly on WhatsApp
            </h3>
            <p className="text-xs text-[#00E99A] font-mono-code font-semibold mb-3">
              +91 79900 26523
            </p>
            <p className="text-xs sm:text-sm text-[#A3A8B3] mb-6 leading-relaxed">
              Prefer fast, direct communication? Tap below to start a chat with Harsh immediately with your project requirements.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-[#0F141A] bg-[#25D366] hover:bg-[#20BA5A] transition-all shadow-[0_0_20px_-3px_rgba(37,211,102,0.4)] cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Message on WhatsApp (+91 79900 26523)</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            {/* Configured Number Note */}
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#A3A8B3]">
              <span className="font-mono-code text-[#00D5F5]">
                Direct Line: +91 79900 26523
              </span>
              {onOpenOwnerGuide && (
                <button
                  onClick={onOpenOwnerGuide}
                  className="text-[#A3A8B3] hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <Sliders className="w-3 h-3" />
                  <span>Settings</span>
                </button>
              )}
            </div>
          </div>

          {/* HEXA Design Guarantee & Focus Card */}
          <div className="p-6 rounded-2xl bg-[#1E1E26]/50 border border-white/5 space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wide flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00D5F5]" />
              <span>What to Expect When Working With HEXA</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A3A8B3]">
              <li className="flex items-start gap-2">
                <span className="text-[#00D5F5] mt-0.5">▪</span>
                <span><strong className="text-white">High-Impact Framing:</strong> Composition optimized for desktop and mobile YouTube feeds.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00E99A] mt-0.5">▪</span>
                <span><strong className="text-white">Native Photoshop Files:</strong> Layered source structure with non-destructive adjustments.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00D5F5] mt-0.5">▪</span>
                <span><strong className="text-white">Honest Communication:</strong> Focused solely on creating visuals that capture viewer curiosity.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Functional Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#23232A]/70 border border-white/5 backdrop-blur-md shadow-2xl">
            <h3 className="text-xl font-bold font-display text-white mb-2">
              Project Inquiry Form
            </h3>
            <p className="text-xs sm:text-sm text-[#A3A8B3] mb-6">
              Fill out the details below. Required fields are marked with an asterisk (*).
            </p>

            <AnimatePresence mode="wait">
              {submissionStatus === 'success' && submittedData ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-6 rounded-xl bg-[#00E99A]/10 border border-[#00E99A]/30 space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-[#00E99A] shrink-0" />
                    <div>
                      <h4 className="text-base font-bold text-white">
                        Inquiry Recorded Successfully!
                      </h4>
                      <p className="text-xs text-[#A3A8B3] mt-0.5">
                        Thank you, {submittedData.fullName}. HEXA has received your brief and will review your project details.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-black/30 border border-white/5 text-xs text-[#A3A8B3] space-y-1.5 font-mono-code">
                    <div>Project: <span className="text-white">{submittedData.projectType}</span></div>
                    <div>Email: <span className="text-[#00D5F5]">{submittedData.email}</span></div>
                    <div>Preferred: <span className="text-[#00E99A]">{submittedData.preferredContact}</span></div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => {
                        setSubmissionStatus('idle');
                        setFormData({
                          fullName: '',
                          email: '',
                          whatsappNumber: '',
                          projectType: 'YouTube Thumbnail Design',
                          projectDescription: '',
                          budgetRange: '',
                          preferredContact: 'WhatsApp',
                        });
                      }}
                      className="text-xs text-[#00D5F5] hover:underline cursor-pointer"
                    >
                      Send another inquiry
                    </button>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#00E99A] font-semibold hover:underline"
                    >
                      <span>Also connect on WhatsApp</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Full Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-semibold text-[#F5F7FA] mb-1.5">
                        Full Name <span className="text-[#00D5F5]">*</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Your name"
                        className={`w-full px-4 py-2.5 rounded-lg bg-[#191920] border text-xs sm:text-sm text-white placeholder-white/20 focus:outline-none focus:ring-1 transition-all ${
                          errors.fullName
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-white/10 focus:border-[#00D5F5] focus:ring-[#00D5F5]'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-[#F5F7FA] mb-1.5">
                        Email Address <span className="text-[#00D5F5]">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@domain.com"
                        className={`w-full px-4 py-2.5 rounded-lg bg-[#191920] border text-xs sm:text-sm text-white placeholder-white/20 focus:outline-none focus:ring-1 transition-all ${
                          errors.email
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-white/10 focus:border-[#00D5F5] focus:ring-[#00D5F5]'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* WhatsApp Number & Project Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="whatsappNumber" className="block text-xs font-semibold text-[#F5F7FA] mb-1.5">
                        WhatsApp Number <span className="text-white/40 text-[10px] font-normal">(Optional)</span>
                      </label>
                      <input
                        id="whatsappNumber"
                        type="tel"
                        value={formData.whatsappNumber}
                        onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                        placeholder="+1 (xxx) xxx-xxxx"
                        className="w-full px-4 py-2.5 rounded-lg bg-[#191920] border border-white/10 text-xs sm:text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00D5F5] focus:ring-1 focus:ring-[#00D5F5] transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="projectType" className="block text-xs font-semibold text-[#F5F7FA] mb-1.5">
                        Project Type <span className="text-[#00D5F5]">*</span>
                      </label>
                      <select
                        id="projectType"
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-[#191920] border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-[#00D5F5] focus:ring-1 focus:ring-[#00D5F5] transition-all"
                      >
                        <option value="YouTube Thumbnail Design">YouTube Thumbnail Design</option>
                        <option value="Gaming Thumbnail Design">Gaming Thumbnail Design</option>
                        <option value="Educational Thumbnail Design">Educational Thumbnail Design</option>
                        <option value="Business and Technology Thumbnails">Business and Technology Thumbnails</option>
                        <option value="Custom Thumbnail Concepts">Custom Thumbnail Concepts</option>
                        <option value="Multiple Thumbnails / Package">Multiple Thumbnails / Package</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Description */}
                  <div>
                    <label htmlFor="projectDescription" className="block text-xs font-semibold text-[#F5F7FA] mb-1.5">
                      Project Description <span className="text-[#00D5F5]">*</span>
                    </label>
                    <textarea
                      id="projectDescription"
                      rows={4}
                      value={formData.projectDescription}
                      onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                      placeholder="Share your video topic, target audience, visual style preferences, or reference links..."
                      className={`w-full px-4 py-2.5 rounded-lg bg-[#191920] border text-xs sm:text-sm text-white placeholder-white/20 focus:outline-none focus:ring-1 transition-all ${
                        errors.projectDescription
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-white/10 focus:border-[#00D5F5] focus:ring-[#00D5F5]'
                      }`}
                    />
                    {errors.projectDescription && (
                      <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.projectDescription}</span>
                      </p>
                    )}
                  </div>

                  {/* Budget Range & Preferred Contact Method */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="budgetRange" className="block text-xs font-semibold text-[#F5F7FA] mb-1.5">
                        Budget Range <span className="text-white/40 text-[10px] font-normal">(Optional)</span>
                      </label>
                      <input
                        id="budgetRange"
                        type="text"
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                        placeholder="e.g. Per thumbnail / Project scope"
                        className="w-full px-4 py-2.5 rounded-lg bg-[#191920] border border-white/10 text-xs sm:text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00D5F5] focus:ring-1 focus:ring-[#00D5F5] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#F5F7FA] mb-1.5">
                        Preferred Contact Method
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, preferredContact: 'WhatsApp' })}
                          className={`px-3 py-2 text-xs font-medium rounded-lg border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                            formData.preferredContact === 'WhatsApp'
                              ? 'bg-[#25D366]/20 border-[#25D366] text-[#25D366]'
                              : 'bg-[#191920] border-white/10 text-[#A3A8B3] hover:text-white'
                          }`}
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, preferredContact: 'Email' })}
                          className={`px-3 py-2 text-xs font-medium rounded-lg border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                            formData.preferredContact === 'Email'
                              ? 'bg-[#00D5F5]/20 border-[#00D5F5] text-[#00D5F5]'
                              : 'bg-[#191920] border-white/10 text-[#A3A8B3] hover:text-white'
                          }`}
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Email</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Privacy & EmailJS Delivery Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[11px] text-[#A3A8B3] pt-1">
                    <div className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#00E99A] shrink-0" />
                      <span>Your details are kept strictly confidential.</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#00E99A] font-mono-code text-[10px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00E99A] animate-pulse" />
                      <span>EmailJS Connected to Gmail</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-semibold rounded-xl text-[#141418] bg-gradient-to-r from-[#00D5F5] to-[#00E99A] hover:opacity-95 shadow-[0_0_20px_-3px_rgba(0,213,245,0.4)] transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Dispatching to Harsh's Gmail...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Project Requirements</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
