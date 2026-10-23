import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Phone,
  Image as ImageIcon,
  Plus,
  Trash2,
  Check,
  FileCode,
  Layers,
  Inbox,
  ExternalLink,
  Save,
  RotateCcw,
  Mail,
  Send,
  Loader2,
} from 'lucide-react';
import { PortfolioItem, Category } from '../types';
import { BRAND_CONFIG, EMAILJS_CONFIG } from '../data/config';
import { sendTestEmailJS } from '../services/emailService';

interface OwnerCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentWhatsappNumber: string;
  onUpdateWhatsappNumber: (newNumber: string) => void;
  customLogoUrl: string | null;
  onUpdateCustomLogo: (url: string | null) => void;
  customProjects: PortfolioItem[];
  onAddCustomProject: (project: PortfolioItem) => void;
  onDeleteCustomProject: (id: string) => void;
}

export const OwnerCustomizerModal: React.FC<OwnerCustomizerModalProps> = ({
  isOpen,
  onClose,
  currentWhatsappNumber,
  onUpdateWhatsappNumber,
  customLogoUrl,
  onUpdateCustomLogo,
  customProjects,
  onAddCustomProject,
  onDeleteCustomProject,
}) => {
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'logo' | 'thumbnails' | 'email' | 'inquiries'>('email');
  const [phoneInput, setPhoneInput] = useState(currentWhatsappNumber);
  const [emailInput, setEmailInput] = useState(
    localStorage.getItem('hexa_owner_email') || BRAND_CONFIG.contactEmail || EMAILJS_CONFIG.targetGmail
  );
  const [emailjsServiceId, setEmailjsServiceId] = useState(
    localStorage.getItem('hexa_emailjs_service_id') || EMAILJS_CONFIG.serviceId
  );
  const [emailjsTemplateId, setEmailjsTemplateId] = useState(
    localStorage.getItem('hexa_emailjs_template_id') || EMAILJS_CONFIG.templateId
  );
  const [emailjsPublicKey, setEmailjsPublicKey] = useState(
    localStorage.getItem('hexa_emailjs_public_key') || EMAILJS_CONFIG.publicKey
  );
  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [logoInput, setLogoInput] = useState(customLogoUrl || '');
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  // New thumbnail form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<Exclude<Category, 'All Work'>>('YouTube Thumbnails');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [targetSlot, setTargetSlot] = useState<number>(36);

  // Contact form submissions stored locally
  const [inquiries, setInquiries] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      const stored = JSON.parse(localStorage.getItem('hexa_inquiries') || '[]');
      setInquiries(stored);
      setPhoneInput(currentWhatsappNumber);
      setEmailInput(
        localStorage.getItem('hexa_owner_email') || BRAND_CONFIG.contactEmail || EMAILJS_CONFIG.targetGmail
      );
      setEmailjsServiceId(
        localStorage.getItem('hexa_emailjs_service_id') || EMAILJS_CONFIG.serviceId
      );
      setEmailjsTemplateId(
        localStorage.getItem('hexa_emailjs_template_id') || EMAILJS_CONFIG.templateId
      );
      setEmailjsPublicKey(
        localStorage.getItem('hexa_emailjs_public_key') || EMAILJS_CONFIG.publicKey
      );
      setLogoInput(customLogoUrl || '');
    }
  }, [isOpen, currentWhatsappNumber, customLogoUrl]);

  if (!isOpen) return null;

  const showSaved = (msg: string) => {
    setSavedNotice(msg);
    setTimeout(() => setSavedNotice(null), 3500);
  };

  const handleSavePhone = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateWhatsappNumber(phoneInput.trim());
    showSaved('WhatsApp number saved!');
  };

  const handleSaveLogo = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateCustomLogo(logoInput.trim() ? logoInput.trim() : null);
    showSaved('Logo settings updated!');
  };

  const handleSaveEmailSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    localStorage.setItem('hexa_owner_email', emailInput.trim());
    localStorage.setItem('hexa_emailjs_service_id', emailjsServiceId.trim());
    localStorage.setItem('hexa_emailjs_template_id', emailjsTemplateId.trim());
    localStorage.setItem('hexa_emailjs_public_key', emailjsPublicKey.trim());
    showSaved('EmailJS keys & Gmail address saved successfully!');
  };

  const handleSendTestEmail = async () => {
    if (!emailInput.trim()) return;
    setIsTestingEmail(true);
    setTestResult(null);
    try {
      const res = await sendTestEmailJS({
        serviceId: emailjsServiceId.trim(),
        templateId: emailjsTemplateId.trim(),
        publicKey: emailjsPublicKey.trim(),
        targetEmail: emailInput.trim(),
      });
      setTestResult(res);
      showSaved(res.message);
    } catch (err: any) {
      const failMsg = err?.message || 'Could not dispatch test email.';
      setTestResult({ success: false, message: failMsg });
      showSaved(failMsg);
    } finally {
      setIsTestingEmail(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setLogoInput(reader.result);
          onUpdateCustomLogo(reader.result);
          showSaved('Custom image file loaded!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setNewImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddThumbnail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: PortfolioItem = {
      id: `custom-slot-${targetSlot}-${Date.now()}`,
      slotNumber: targetSlot,
      isPlaceholder: false,
      title: newTitle.trim(),
      category: newCategory,
      description: newDescription.trim() || `Custom thumbnail design published in Slot #${targetSlot}.`,
      tags: ['Custom', newCategory, 'Photoshop'],
      aspectRatio: '16:9',
      softwareUsed: 'Adobe Photoshop',
      customImage: newImageUrl.trim() || undefined,
    };

    onAddCustomProject(newItem);
    setNewTitle('');
    setNewImageUrl('');
    setNewDescription('');
    setTargetSlot((prev) => (prev < 40 ? prev + 1 : 11));
    showSaved(`Thumbnail successfully published to Slot #${targetSlot}!`);
  };

  const clearInquiries = () => {
    localStorage.removeItem('hexa_inquiries');
    setInquiries([]);
    showSaved('Inquiries cleared.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#1E1E26] border border-white/10 rounded-2xl shadow-2xl flex flex-col z-10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#181820]">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-[#00D5F5]/20 flex items-center justify-center text-[#00D5F5]">
              <FileCode className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                HEXA Portfolio Quick Settings & Asset Guide
              </h3>
              <p className="text-[11px] text-[#A3A8B3]">
                Easily configure your real contact details, upload logo files, and manage thumbnails
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close settings"
            className="p-1.5 text-[#A3A8B3] hover:text-white rounded-lg hover:bg-white/5 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-white/5 bg-[#1B1B22] overflow-x-auto">
          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`px-3 py-2 text-xs font-medium rounded-t-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'whatsapp'
                ? 'bg-[#23232A] text-[#00D5F5] border-t-2 border-[#00D5F5]'
                : 'text-[#A3A8B3] hover:text-white'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>WhatsApp Setup</span>
          </button>
          <button
            onClick={() => setActiveTab('logo')}
            className={`px-3 py-2 text-xs font-medium rounded-t-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'logo'
                ? 'bg-[#23232A] text-[#00D5F5] border-t-2 border-[#00D5F5]'
                : 'text-[#A3A8B3] hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Logo Asset</span>
          </button>
          <button
            onClick={() => setActiveTab('thumbnails')}
            className={`px-3 py-2 text-xs font-medium rounded-t-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'thumbnails'
                ? 'bg-[#23232A] text-[#00D5F5] border-t-2 border-[#00D5F5]'
                : 'text-[#A3A8B3] hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Thumbnails Manager</span>
          </button>
          <button
            onClick={() => setActiveTab('email')}
            className={`px-3 py-2 text-xs font-medium rounded-t-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'email'
                ? 'bg-[#23232A] text-[#00D5F5] border-t-2 border-[#00D5F5]'
                : 'text-[#A3A8B3] hover:text-white'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Gmail Alerts (Free)</span>
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-3 py-2 text-xs font-medium rounded-t-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'inquiries'
                ? 'bg-[#23232A] text-[#00D5F5] border-t-2 border-[#00D5F5]'
                : 'text-[#A3A8B3] hover:text-white'
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>Inquiries Log ({inquiries.length})</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {savedNotice && (
            <div className="p-3 bg-[#00E99A]/15 border border-[#00E99A]/40 rounded-lg text-xs text-[#00E99A] flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>{savedNotice}</span>
            </div>
          )}

          {/* TAB 1: WHATSAPP */}
          {activeTab === 'whatsapp' && (
            <form onSubmit={handleSavePhone} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-white mb-1">
                  WhatsApp International Phone Number
                </label>
                <p className="text-xs text-[#A3A8B3] mb-3">
                  Enter your real phone number including international country code (e.g. <code>15551234567</code> or <code>+91 9876543210</code>). This automatically formats your direct WhatsApp chat link.
                </p>
                <input
                  type="text"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  placeholder="e.g. 15550194392"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#141419] border border-white/10 text-sm text-white focus:outline-none focus:border-[#00D5F5]"
                />
              </div>

              <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-2 text-xs text-[#A3A8B3]">
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5 text-[#00E99A]" />
                  <span>Generated Chat URL:</span>
                </div>
                <div className="font-mono-code text-[11px] text-[#00D5F5] break-all">
                  https://wa.me/{phoneInput.replace(/[^0-9]/g, '')}?text=Hi%20HEXA...
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#00D5F5] to-[#00E99A] text-[#141418] text-xs font-semibold hover:opacity-95 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save WhatsApp Number</span>
              </button>
            </form>
          )}

          {/* TAB 2: LOGO ASSET */}
          {activeTab === 'logo' && (
            <form onSubmit={handleSaveLogo} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-white mb-1">
                  Official HEXA Brand Mark
                </label>
                <p className="text-xs text-[#A3A8B3] mb-3">
                  The website by default renders the exact geometric cyan-to-green interlocking H with full 2-stage SVG line tracing and light sweep animations. If you have a specific raster file (PNG/JPG) or vector SVG file, you can upload or link it here.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] text-[#A3A8B3] mb-1">
                    Option A: Upload Image File (PNG / SVG)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="block w-full text-xs text-[#A3A8B3] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#00D5F5]/10 file:text-[#00D5F5] hover:file:bg-[#00D5F5]/20 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#A3A8B3] mb-1">
                    Option B: Image URL
                  </label>
                  <input
                    type="text"
                    value={logoInput}
                    onChange={(e) => setLogoInput(e.target.value)}
                    placeholder="https://example.com/hexa-logo.png"
                    className="w-full px-4 py-2.5 rounded-lg bg-[#141419] border border-white/10 text-sm text-white focus:outline-none focus:border-[#00D5F5]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#00D5F5] to-[#00E99A] text-[#141418] text-xs font-semibold hover:opacity-95 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Update Logo</span>
                </button>

                {customLogoUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      setLogoInput('');
                      onUpdateCustomLogo(null);
                      showSaved('Reverted to default SVG logo.');
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#272733] text-xs font-medium text-[#A3A8B3] hover:text-white cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset to Native Vector Logo</span>
                  </button>
                )}
              </div>
            </form>
          )}

          {/* TAB 3: THUMBNAILS MANAGER */}
          {activeTab === 'thumbnails' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-semibold text-white mb-1">
                  Add Your Own Thumbnail Designs
                </h4>
                <p className="text-xs text-[#A3A8B3]">
                  Easily replace placeholders or showcase your newest YouTube thumbnail designs.
                </p>
              </div>

              <form onSubmit={handleAddThumbnail} className="p-4 rounded-xl bg-[#141419] border border-white/5 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-[#A3A8B3] mb-1">Target Slot (1–40)</label>
                    <select
                      value={targetSlot}
                      onChange={(e) => setTargetSlot(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-[#1D1D24] border border-[#00D5F5]/40 text-xs text-[#00D5F5] font-mono-code font-bold"
                    >
                      {Array.from({ length: 40 }, (_, i) => i + 1).map((num) => (
                        <option key={num} value={num}>
                          Slot #{num} {num <= 35 ? '(Published Live)' : '(Reserved Drop Slot)'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#A3A8B3] mb-1">Thumbnail Title *</label>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. GTA VI Next-Gen Heist"
                      className="w-full px-3 py-2 rounded-lg bg-[#1D1D24] border border-white/10 text-xs text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#A3A8B3] mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-lg bg-[#1D1D24] border border-white/10 text-xs text-white"
                    >
                      <option value="YouTube Thumbnails">YouTube Thumbnails</option>
                      <option value="Gaming">Gaming</option>
                      <option value="Education">Education</option>
                      <option value="Business and Technology">Business and Technology</option>
                      <option value="Creative Experiments">Creative Experiments</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-[#A3A8B3] mb-1">Upload Image (JPG / PNG)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailUpload}
                      className="block w-full text-xs text-[#A3A8B3] file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-[10px] file:bg-[#00D5F5]/10 file:text-[#00D5F5]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#A3A8B3] mb-1">Or Direct Image URL</label>
                    <input
                      type="text"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      placeholder="https://.../thumbnail.jpg"
                      className="w-full px-3 py-2 rounded-lg bg-[#1D1D24] border border-white/10 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-[#A3A8B3] mb-1">Short Description / Composition Notes</label>
                  <input
                    type="text"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="e.g. High contrast rim lighting, focal character cutout, custom 3D text"
                    className="w-full px-3 py-2 rounded-lg bg-[#1D1D24] border border-white/10 text-xs text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#00D5F5] text-[#141418] text-xs font-semibold hover:opacity-90 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Thumbnail to Portfolio</span>
                </button>
              </form>

              {customProjects.length > 0 && (
                <div>
                  <h5 className="text-xs font-semibold text-white mb-2">Custom Added Designs ({customProjects.length})</h5>
                  <div className="space-y-2">
                    {customProjects.map((p) => (
                      <div
                        key={p.id}
                        className="p-3 rounded-lg bg-[#181820] border border-white/5 flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-semibold text-white">{p.title}</div>
                          <div className="text-[11px] text-[#00D5F5]">{p.category}</div>
                        </div>
                        <button
                          onClick={() => onDeleteCustomProject(p.id)}
                          className="p-1.5 text-red-400 hover:bg-white/5 rounded cursor-pointer"
                          title="Delete custom thumbnail"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: GMAIL NOTIFICATIONS & EMAILJS */}
          {activeTab === 'email' && (
            <div className="space-y-6 text-xs text-[#A3A8B3] leading-relaxed">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#00D5F5]" />
                    <span>EmailJS Gmail Integration</span>
                  </h4>
                  <p>
                    Every client inquiry submitted on HEXA is dispatched directly to your Gmail inbox in real-time via EmailJS.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00E99A]/10 border border-[#00E99A]/30 text-[#00E99A] text-[11px] font-mono-code font-semibold self-start sm:self-auto shrink-0">
                  <span className="w-2 h-2 rounded-full bg-[#00E99A] animate-pulse" />
                  <span>EmailJS Status: Connected</span>
                </div>
              </div>

              {/* Form to view / update EmailJS credentials and Gmail */}
              <form onSubmit={handleSaveEmailSettings} className="p-4 sm:p-5 rounded-xl bg-[#141419] border border-[#00D5F5]/20 space-y-4 shadow-lg">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <div className="text-xs font-bold text-white uppercase font-mono-code flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-[#00D5F5]" />
                    <span>Active EmailJS Credentials</span>
                  </div>
                  <span className="text-[10px] text-[#00D5F5] font-mono-code">200 Emails/Month Free</span>
                </div>

                {/* Recipient Gmail */}
                <div>
                  <label className="block text-xs font-semibold text-white mb-1">
                    Your Gmail Address (Recipient)
                  </label>
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="singhharsh83755@gmail.com"
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#1D1D24] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00D5F5]"
                  />
                  <p className="text-[11px] text-[#A3A8B3] mt-1">
                    Client contact inquiries and project briefs will be forwarded directly to this inbox.
                  </p>
                </div>

                {/* 3 EmailJS Parameters */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-mono-code text-[#A3A8B3] mb-1">Service ID</label>
                    <input
                      type="text"
                      value={emailjsServiceId}
                      onChange={(e) => setEmailjsServiceId(e.target.value)}
                      placeholder="service_5vf9mq7"
                      required
                      className="w-full px-3 py-2 rounded-lg bg-[#1D1D24] border border-white/10 text-xs font-mono-code text-[#00D5F5]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono-code text-[#A3A8B3] mb-1">Template ID</label>
                    <input
                      type="text"
                      value={emailjsTemplateId}
                      onChange={(e) => setEmailjsTemplateId(e.target.value)}
                      placeholder="template_gvfaxr5"
                      required
                      className="w-full px-3 py-2 rounded-lg bg-[#1D1D24] border border-white/10 text-xs font-mono-code text-[#00D5F5]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono-code text-[#A3A8B3] mb-1">Public Key (User ID)</label>
                    <input
                      type="text"
                      value={emailjsPublicKey}
                      onChange={(e) => setEmailjsPublicKey(e.target.value)}
                      placeholder="Hp_5HQQz3AkeY16Nk"
                      required
                      className="w-full px-3 py-2 rounded-lg bg-[#1D1D24] border border-white/10 text-xs font-mono-code text-[#00D5F5]"
                    />
                  </div>
                </div>

                {/* Action buttons */}
                <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#00D5F5] to-[#00E99A] hover:opacity-95 text-[#141418] font-bold text-xs cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Credentials</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setEmailjsServiceId(EMAILJS_CONFIG.serviceId);
                        setEmailjsTemplateId(EMAILJS_CONFIG.templateId);
                        setEmailjsPublicKey(EMAILJS_CONFIG.publicKey);
                        setEmailInput(EMAILJS_CONFIG.targetGmail);
                        localStorage.removeItem('hexa_emailjs_service_id');
                        localStorage.removeItem('hexa_emailjs_template_id');
                        localStorage.removeItem('hexa_emailjs_public_key');
                        localStorage.removeItem('hexa_owner_email');
                        showSaved('Reset to Harsh\'s configured EmailJS credentials.');
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-[#A3A8B3] hover:text-white cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset to Defaults</span>
                    </button>
                  </div>

                  {/* Send Test Email Button */}
                  <button
                    type="button"
                    onClick={handleSendTestEmail}
                    disabled={isTestingEmail}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00D5F5]/10 hover:bg-[#00D5F5]/20 text-xs font-semibold text-[#00D5F5] border border-[#00D5F5]/30 hover:border-[#00D5F5] cursor-pointer disabled:opacity-50 transition-all shadow-[0_0_15px_-3px_rgba(0,213,245,0.2)]"
                  >
                    {isTestingEmail ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 text-[#00D5F5] animate-spin" />
                        <span>Sending Live Test to Gmail...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-[#00D5F5]" />
                        <span>Send Test Email via EmailJS</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Live Test Outcome Banner */}
              {testResult && (
                <div
                  className={`p-4 rounded-xl border text-xs flex items-start gap-3 ${
                    testResult.success
                      ? 'bg-[#00E99A]/10 border-[#00E99A]/30 text-white'
                      : 'bg-red-500/10 border-red-500/30 text-red-200'
                  }`}
                >
                  {testResult.success ? (
                    <Check className="w-4 h-4 text-[#00E99A] shrink-0 mt-0.5" />
                  ) : (
                    <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="font-bold">
                      {testResult.success ? 'EmailJS Test Succeeded!' : 'EmailJS Test Notice'}
                    </div>
                    <div className="text-[11px] opacity-90 mt-0.5">{testResult.message}</div>
                  </div>
                </div>
              )}

              {/* EmailJS Variables Reference */}
              <div className="p-4 rounded-xl bg-[#141419] border border-white/5 space-y-2.5">
                <div className="text-white font-bold text-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00D5F5]" />
                  <span>Mapped Template Variables in EmailJS</span>
                </div>
                <p className="text-[11px] text-[#A3A8B3]">
                  In your EmailJS template (<code className="text-[#00D5F5]">template_gvfaxr5</code>), you can use any of these variables in your email subject and body:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono-code text-[11px]">
                  <div className="p-2 rounded bg-black/40 border border-white/5 text-[#00D5F5]">{"{{from_name}}"}</div>
                  <div className="p-2 rounded bg-black/40 border border-white/5 text-[#00D5F5]">{"{{email}}"}</div>
                  <div className="p-2 rounded bg-black/40 border border-white/5 text-[#00D5F5]">{"{{phone}}"}</div>
                  <div className="p-2 rounded bg-black/40 border border-white/5 text-[#00D5F5]">{"{{project_type}}"}</div>
                  <div className="p-2 rounded bg-black/40 border border-white/5 text-[#00D5F5]">{"{{budget}}"}</div>
                  <div className="p-2 rounded bg-black/40 border border-white/5 text-[#00D5F5]">{"{{message}}"}</div>
                  <div className="p-2 rounded bg-black/40 border border-white/5 text-[#00D5F5]">{"{{preferred_contact}}"}</div>
                  <div className="p-2 rounded bg-black/40 border border-white/5 text-[#00D5F5]">{"{{timestamp}}"}</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: INQUIRIES LOG */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-white">
                    Received Inquiries
                  </h4>
                  <p className="text-[11px] text-[#A3A8B3]">
                    Client briefs submitted through the contact form are stored safely here.
                  </p>
                </div>
                {inquiries.length > 0 && (
                  <button
                    onClick={clearInquiries}
                    className="text-[11px] text-red-400 hover:underline cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {inquiries.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#A3A8B3] bg-[#141419] rounded-xl border border-white/5">
                  No inquiries submitted yet. When a visitor submits the contact form, their brief will appear here.
                </div>
              ) : (
                <div className="space-y-3">
                  {inquiries.map((inq, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#141419] border border-white/5 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <span className="font-bold text-white">{inq.fullName}</span>
                        <span className="text-[10px] font-mono-code text-[#A3A8B3]">
                          {new Date(inq.submittedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div>Email: <span className="text-[#00D5F5]">{inq.email}</span></div>
                        <div>WhatsApp: <span className="text-[#00E99A]">{inq.whatsappNumber || 'N/A'}</span></div>
                        <div>Type: <span className="text-white">{inq.projectType}</span></div>
                        <div>Budget: <span className="text-white">{inq.budgetRange || 'Flexible'}</span></div>
                      </div>
                      <div className="pt-2 text-[#A3A8B3] border-t border-white/5">
                        <strong className="text-white/70">Brief: </strong>
                        {inq.projectDescription}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
