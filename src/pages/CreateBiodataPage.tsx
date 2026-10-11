import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { BiodataData, SiblingRecord, SiblingSelectionType } from '../features/biodata/biodataTypes';
import { initialBiodataData, sampleBiodataData } from '../features/biodata/biodataDefaults';
import { calculateAge, formatDobDisplay } from '../features/biodata/biodataFormatting';
import { TEMPLATE_REGISTRY } from '../templates/templateRegistry';
import { DocumentRenderer } from '../templates/DocumentRenderer';
import {
  User,
  GraduationCap,
  Users,
  HeartHandshake,
  Phone,
  Palette,
  Printer,
  Share2,
  Trash2,
  Plus,
  Eye,
  Check,
  ArrowRight,
  ArrowLeft,
  Upload,
  Sparkles,
} from 'lucide-react';

const STORAGE_KEY = 'mw_biodata_draft_v1';

export const CreateBiodataPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const templateFromUrl = searchParams.get('template');

  // Load from localStorage or defaults
  const [formData, setFormData] = useState<BiodataData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (templateFromUrl) {
          parsed.templateId = templateFromUrl;
        }
        return parsed;
      }
    } catch {
      // fallback
    }
    return {
      ...initialBiodataData,
      templateId: templateFromUrl || initialBiodataData.templateId,
    };
  });

  // Steps 1 to 6
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState<boolean>(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  // Auto-save draft locally
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch {
      // Ignore quota error if base64 photo is large
    }
  }, [formData]);

  // If URL changes template, update it
  useEffect(() => {
    if (templateFromUrl) {
      setFormData((prev) => ({ ...prev, templateId: templateFromUrl }));
    }
  }, [templateFromUrl]);

  // Update field helper
  const updateField = <K extends keyof BiodataData>(key: K, value: BiodataData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Handle Photo Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPG or PNG).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        updateField('photoUrl', event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    updateField('photoUrl', '');
  };

  // Sibling Management
  const addBrother = () => {
    const newBrother: SiblingRecord = {
      id: `bro-${Date.now()}`,
      name: '',
      age: '',
      maritalStatus: 'Unmarried',
      occupation: '',
      details: '',
    };
    setFormData((prev) => ({
      ...prev,
      brothers: [...prev.brothers, newBrother],
    }));
  };

  const updateBrother = (id: string, field: keyof SiblingRecord, value: string) => {
    setFormData((prev) => ({
      ...prev,
      brothers: prev.brothers.map((b) => (b.id === id ? { ...b, [field]: value } : b)),
    }));
  };

  const removeBrother = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      brothers: prev.brothers.filter((b) => b.id !== id),
    }));
  };

  const addSister = () => {
    const newSister: SiblingRecord = {
      id: `sis-${Date.now()}`,
      name: '',
      age: '',
      maritalStatus: 'Unmarried',
      occupation: '',
      details: '',
    };
    setFormData((prev) => ({
      ...prev,
      sisters: [...prev.sisters, newSister],
    }));
  };

  const updateSister = (id: string, field: keyof SiblingRecord, value: string) => {
    setFormData((prev) => ({
      ...prev,
      sisters: prev.sisters.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    }));
  };

  const removeSister = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      sisters: prev.sisters.filter((s) => s.id !== id),
    }));
  };

  // Fill sample data
  const handleLoadSample = () => {
    setFormData({
      ...sampleBiodataData,
      templateId: formData.templateId || 'classic-elegance',
    });
  };

  // Reset form
  const handleReset = () => {
    if (window.confirm('Are you sure you want to clear your current biodata draft?')) {
      localStorage.removeItem(STORAGE_KEY);
      setFormData({
        ...initialBiodataData,
        templateId: formData.templateId,
      });
    }
  };

  // Print Document (Uses @media print)
  const handlePrint = () => {
    window.print();
  };

  // Share Biodata Action
  const handleShare = async () => {
    const shareTitle = `${formData.fullName || 'Marriage'} Biodata - MW Bio Gallery`;
    const shareText = `Explore the marriage biodata of ${formData.fullName || 'Candidate'}, created with MW Bio Gallery.`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: window.location.href,
        });
        setShareFeedback('Shared successfully!');
      } catch {
        // User cancelled or unsupported
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShareFeedback('Link copied to clipboard! You can share it directly.');
      } catch {
        setShareFeedback('Unable to copy automatically. Please copy the URL from your browser.');
      }
    }

    setTimeout(() => {
      setShareFeedback(null);
    }, 4000);
  };

  // Calculated Age
  const calculatedAge = calculateAge(formData.dateOfBirth);

  const stepTitles = [
    { num: 1, title: 'Personal Details', icon: User },
    { num: 2, title: 'Education & Career', icon: GraduationCap },
    { num: 3, title: 'Family Lineage', icon: Users },
    { num: 4, title: 'Preferences', icon: HeartHandshake },
    { num: 5, title: 'Contact', icon: Phone },
    { num: 6, title: 'Design & Print', icon: Palette },
  ];

  return (
    <div className="min-h-screen bg-[#FAF6EF] pb-24">
      {/* Header bar for builder */}
      <div className="bg-[#4B1020] text-[#FAF6EF] border-b border-[#310914] py-6 sm:py-8 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-[0.2em] text-[#C7A36A] font-semibold mb-1">
              <span>Biodata Studio</span>
              <span>·</span>
              <span>MW Bio Gallery</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#FAF6EF]">
              Let's Create Your Biodata
            </h1>
            <p className="text-xs sm:text-sm text-[#FAF6EF]/75 mt-0.5">
              Your story, your details, your design. Let's bring everything together.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={handleLoadSample}
              className="px-3.5 py-2 text-xs font-semibold text-[#4B1020] bg-[#FAF6EF] hover:bg-white rounded-sm transition-colors flex items-center gap-1.5 shadow-sm"
              title="Populate with elegant sample data to test templates"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C7A36A]" />
              <span>Fill Sample Data</span>
            </button>

            <button
              onClick={handleReset}
              className="p-2 text-xs text-[#FAF6EF]/80 hover:text-white hover:bg-[#310914] rounded-sm transition-colors"
              title="Clear draft"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobilePreviewOpen(true)}
              className="lg:hidden px-3.5 py-2 text-xs font-semibold text-[#310914] bg-[#C7A36A] rounded-sm flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Step Indicator Progress Bar */}
        <div className="bg-white border border-[#E7DCD2] p-3 sm:p-4 rounded-sm shadow-xs mb-8 no-print overflow-x-auto">
          <div className="flex items-center justify-between min-w-[560px]">
            {stepTitles.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.num;
              const isPast = currentStep > step.num;

              return (
                <button
                  key={step.num}
                  onClick={() => setCurrentStep(step.num)}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs font-sans transition-all rounded-xs focus:outline-hidden ${
                    isActive
                      ? 'bg-[#4B1020] text-[#FAF6EF] font-bold shadow-xs'
                      : isPast
                      ? 'text-[#4B1020] hover:bg-[#FAF6EF] font-medium'
                      : 'text-[#786B6B] hover:text-[#292122]'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isActive
                        ? 'bg-[#C7A36A] text-[#310914]'
                        : isPast
                        ? 'bg-[#F1E8DC] text-[#4B1020]'
                        : 'bg-stone-100 text-[#786B6B]'
                    }`}
                  >
                    {isPast ? '✓' : step.num}
                  </span>
                  <Icon className="w-3.5 h-3.5" />
                  <span className="whitespace-nowrap">{step.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Split: Form (Left) & Live Preview (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Editor (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#E7DCD2] rounded-sm p-6 sm:p-8 shadow-xs no-print">
            {/* Step 1: Personal Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="border-b border-[#F1E8DC] pb-4">
                  <h2 className="text-xl font-serif font-bold text-[#4B1020]">
                    Step 1: Auspicious Invocation & Personal Details
                  </h2>
                  <p className="text-xs text-[#786B6B] mt-1">
                    Choose your Kuldevta / deity name and provide the candidate's core details.
                  </p>
                </div>

                {/* Auspicious Deity / God Name Section */}
                <div className="p-4 bg-[#FAF6EF] border-2 border-[#C7A36A]/50 rounded-sm space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4B1020] font-sans flex items-center gap-1.5">
                      <span>✦ Auspicious Header / Deity Name (कुलदैवत / इष्टदेवता)</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs text-[#786B6B] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.showGodNameInPrint ?? true}
                        onChange={(e) => updateField('showGodNameInPrint', e.target.checked)}
                        className="rounded-xs text-[#4B1020]"
                      />
                      <span>Show at top of biodata</span>
                    </label>
                  </div>

                  <p className="text-[11px] text-[#786B6B]">
                    Traditional marriage biodatas begin with an auspicious invocation to your family deity. Select a preset below or type your custom name:
                  </p>

                  {/* Preset Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      '॥ श्री गणेशाय नमः ॥',
                      '॥ श्री कुलस्वामिनी प्रसन्न ॥',
                      '॥ ॐ नमः शिवाय ॥',
                      '॥ ॐ नमो भगवते वासुदेवाय ॥',
                      '॥ जय श्री कृष्ण ॥',
                      '॥ श्री महालक्ष्मी प्रसन्न ॥',
                      '॥ ॐ श्री व्यंकटेशाय नमः ॥',
                      '॥ एक ओंकार ॥',
                      '॥ ॐ अर्हम् ॥',
                      'In the Name of God',
                    ].map((godPreset) => (
                      <button
                        key={godPreset}
                        type="button"
                        onClick={() => updateField('godName', godPreset)}
                        className={`px-2.5 py-1 text-xs rounded-xs border transition-all ${
                          formData.godName === godPreset
                            ? 'bg-[#4B1020] text-[#FAF6EF] border-[#4B1020] font-semibold shadow-xs'
                            : 'bg-white text-[#292122] border-[#E7DCD2] hover:bg-[#F1E8DC]'
                        }`}
                      >
                        {godPreset}
                      </button>
                    ))}
                  </div>

                  <div>
                    <input
                      type="text"
                      value={formData.godName || ''}
                      onChange={(e) => updateField('godName', e.target.value)}
                      placeholder="e.g. ॥ श्री कुलस्वामिनी प्रसन्न ॥ or custom deity name"
                      className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:ring-1 focus:ring-[#4B1020] focus:outline-hidden bg-white font-serif"
                    />
                  </div>
                </div>

                {/* Profile Photo Upload */}
                <div className="p-4 bg-[#FAF6EF] border border-[#E7DCD2] rounded-sm">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4B1020] mb-2 font-sans">
                    Profile Photograph (Optional)
                  </label>
                  <div className="flex items-center gap-4">
                    {formData.photoUrl ? (
                      <div className="relative">
                        <img
                          src={formData.photoUrl}
                          alt="Uploaded Profile"
                          className="w-20 h-24 object-cover rounded-sm border-2 border-[#C7A36A] shadow-sm"
                        />
                        <button
                          type="button"
                          onClick={removePhoto}
                          className="absolute -top-2 -right-2 bg-red-800 text-white p-1 rounded-full text-xs shadow-md hover:bg-red-900"
                          title="Remove photo"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="w-20 h-24 border-2 border-dashed border-[#C7A36A] rounded-sm flex flex-col items-center justify-center text-center p-2 bg-white text-[#786B6B]">
                        <Upload className="w-5 h-5 text-[#C7A36A] mb-1" />
                        <span className="text-[9px]">Add Photo</span>
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="inline-block cursor-pointer px-4 py-2 text-xs font-semibold bg-[#4B1020] text-white rounded-sm hover:bg-[#671C32] transition-colors">
                        Choose Image File
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                      <p className="text-[11px] text-[#786B6B]">
                        JPG, PNG, or WebP. If skipped, an elegant monogram crest will be used.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Required / Core fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#292122] mb-1">
                      Full Name <span className="text-red-700">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      placeholder="e.g. Aarav Sharma"
                      className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:ring-1 focus:ring-[#4B1020] focus:outline-hidden"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#292122] mb-1">
                      Date of Birth <span className="text-red-700">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => updateField('dateOfBirth', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:ring-1 focus:ring-[#4B1020] focus:outline-hidden"
                      required
                    />
                    {calculatedAge !== null && (
                      <span className="text-[11px] text-[#671C32] font-semibold mt-0.5 block">
                        Calculated Age: {calculatedAge} years
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#292122] mb-1">
                      Height <span className="text-red-700">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.height}
                      onChange={(e) => updateField('height', e.target.value)}
                      placeholder={`e.g. 5' 11" (180 cm)`}
                      className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:ring-1 focus:ring-[#4B1020] focus:outline-hidden"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#292122] mb-1">
                      Current City <span className="text-red-700">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.currentCity}
                      onChange={(e) => updateField('currentCity', e.target.value)}
                      placeholder="e.g. Pune"
                      className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:ring-1 focus:ring-[#4B1020] focus:outline-hidden"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#292122] mb-1">
                      Current State <span className="text-red-700">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.currentState}
                      onChange={(e) => updateField('currentState', e.target.value)}
                      placeholder="e.g. Maharashtra"
                      className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:ring-1 focus:ring-[#4B1020] focus:outline-hidden"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#292122] mb-1">
                      Gender
                    </label>
                    <select
                      value={formData.gender || ''}
                      onChange={(e) => updateField('gender', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden bg-white"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#292122] mb-1">
                      Marital Status
                    </label>
                    <select
                      value={formData.maritalStatus || 'Never Married'}
                      onChange={(e) => updateField('maritalStatus', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden bg-white"
                    >
                      <option value="Never Married">Never Married</option>
                      <option value="Awaiting Divorce">Awaiting Divorce</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#292122] mb-1">
                      Religion
                    </label>
                    <input
                      type="text"
                      value={formData.religion || ''}
                      onChange={(e) => updateField('religion', e.target.value)}
                      placeholder="e.g. Hindu, Jain, Sikh, Muslim, Christian"
                      className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#292122] mb-1">
                      Community or Caste (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.caste || ''}
                      onChange={(e) => updateField('caste', e.target.value)}
                      placeholder="e.g. Brahmin, Maratha, Vaishya"
                      className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#292122] mb-1">
                      Mother Tongue
                    </label>
                    <input
                      type="text"
                      value={formData.motherTongue || ''}
                      onChange={(e) => updateField('motherTongue', e.target.value)}
                      placeholder="e.g. Marathi, Hindi, Gujarati"
                      className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#292122] mb-1">
                      Other Languages Known
                    </label>
                    <input
                      type="text"
                      value={formData.languages || ''}
                      onChange={(e) => updateField('languages', e.target.value)}
                      placeholder="e.g. English, Hindi, German"
                      className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#292122] mb-1">
                      Diet Preference
                    </label>
                    <select
                      value={formData.diet || ''}
                      onChange={(e) => updateField('diet', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden bg-white"
                    >
                      <option value="">Select Diet</option>
                      <option value="Vegetarian">Vegetarian</option>
                      <option value="Pure Vegetarian (Jain)">Pure Vegetarian (Jain)</option>
                      <option value="Eggetarian">Eggetarian</option>
                      <option value="Non-Vegetarian">Non-Vegetarian</option>
                      <option value="Vegan">Vegan</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#292122] mb-1">
                      Lifestyle Details
                    </label>
                    <input
                      type="text"
                      value={formData.lifestyle || ''}
                      onChange={(e) => updateField('lifestyle', e.target.value)}
                      placeholder="e.g. Non-smoker, Fitness enthusiast"
                      className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#292122] mb-1">
                      Hobbies & Interests
                    </label>
                    <input
                      type="text"
                      value={formData.hobbies || ''}
                      onChange={(e) => updateField('hobbies', e.target.value)}
                      placeholder="e.g. Trekking, Indian classical music, photography, reading"
                      className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#292122] mb-1">
                      Personal Statement / About Me (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.aboutMe || ''}
                      onChange={(e) => updateField('aboutMe', e.target.value)}
                      placeholder="A short note introducing your personality, outlook towards life, and values..."
                      className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Education & Career */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="border-b border-[#F1E8DC] pb-4">
                  <h2 className="text-xl font-serif font-bold text-[#4B1020]">
                    Step 2: Education & Career
                  </h2>
                  <p className="text-xs text-[#786B6B] mt-1">
                    Highlight your academic credentials and current professional standing.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#292122] mb-1">
                      Highest Qualification <span className="text-red-700">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.highestQualification}
                      onChange={(e) => updateField('highestQualification', e.target.value)}
                      placeholder="e.g. Master of Science (Computer Science) or B.Tech / MBA"
                      className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#292122] mb-1">
                      College / University
                    </label>
                    <input
                      type="text"
                      value={formData.collegeUniversity || ''}
                      onChange={(e) => updateField('collegeUniversity', e.target.value)}
                      placeholder="e.g. COEP Technological University, Pune"
                      className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#292122] mb-1">
                      Additional Qualifications (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.additionalQualifications || ''}
                      onChange={(e) => updateField('additionalQualifications', e.target.value)}
                      placeholder="e.g. CFA Level II · Certified Cloud Architect"
                      className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#292122] mb-1">
                      Profession / Sector
                    </label>
                    <input
                      type="text"
                      value={formData.profession || ''}
                      onChange={(e) => updateField('profession', e.target.value)}
                      placeholder="e.g. Senior Software Engineer / Doctor"
                      className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#292122] mb-1">
                      Designation / Role
                    </label>
                    <input
                      type="text"
                      value={formData.jobTitle || ''}
                      onChange={(e) => updateField('jobTitle', e.target.value)}
                      placeholder="e.g. Senior Engineering Lead"
                      className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#292122] mb-1">
                      Company / Organization Name
                    </label>
                    <input
                      type="text"
                      value={formData.companyName || ''}
                      onChange={(e) => updateField('companyName', e.target.value)}
                      placeholder="e.g. Global Cloud Systems India"
                      className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden"
                    />
                    <label className="flex items-center gap-2 mt-1.5 text-xs text-[#786B6B]">
                      <input
                        type="checkbox"
                        checked={formData.showCompanyInPrint ?? true}
                        onChange={(e) => updateField('showCompanyInPrint', e.target.checked)}
                        className="rounded-xs text-[#4B1020] focus:ring-0"
                      />
                      <span>Show organization name on biodata</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#292122] mb-1">
                      Work Location
                    </label>
                    <input
                      type="text"
                      value={formData.workLocation || ''}
                      onChange={(e) => updateField('workLocation', e.target.value)}
                      placeholder="e.g. Pune (Hybrid)"
                      className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#292122] mb-1">
                      Annual Income (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.annualIncome || ''}
                      onChange={(e) => updateField('annualIncome', e.target.value)}
                      placeholder="e.g. ₹ 28,00,000 p.a."
                      className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden"
                    />
                    <label className="flex items-center gap-2 mt-1.5 text-xs text-[#786B6B]">
                      <input
                        type="checkbox"
                        checked={formData.showIncomeInPrint ?? true}
                        onChange={(e) => updateField('showIncomeInPrint', e.target.checked)}
                        className="rounded-xs text-[#4B1020] focus:ring-0"
                      />
                      <span>Display annual income in final document</span>
                    </label>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#292122] mb-1">
                      Career Summary (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.careerAbout || ''}
                      onChange={(e) => updateField('careerAbout', e.target.value)}
                      placeholder="Brief context on work responsibilities or future plans..."
                      className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Family Details */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="border-b border-[#F1E8DC] pb-4">
                  <h2 className="text-xl font-serif font-bold text-[#4B1020]">
                    Step 3: Family Details
                  </h2>
                  <p className="text-xs text-[#786B6B] mt-1">
                    Describe parents, grandparents, and siblings. Unfilled fields will not appear.
                  </p>
                </div>

                {/* Parents Section */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#4B1020] font-sans mb-3">
                    Parents
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#292122] mb-1">
                        Father's Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.fatherName || ''}
                        onChange={(e) => updateField('fatherName', e.target.value)}
                        placeholder="e.g. Dr. Vivek S. Kulkarni"
                        className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#292122] mb-1">
                        Father's Occupation
                      </label>
                      <input
                        type="text"
                        value={formData.fatherOccupation || ''}
                        onChange={(e) => updateField('fatherOccupation', e.target.value)}
                        placeholder="e.g. Senior Consulting Surgeon (Retd.)"
                        className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#292122] mb-1">
                        Mother's Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.motherName || ''}
                        onChange={(e) => updateField('motherName', e.target.value)}
                        placeholder="e.g. Mrs. Shubhada V. Kulkarni"
                        className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#292122] mb-1">
                        Mother's Occupation
                      </label>
                      <input
                        type="text"
                        value={formData.motherOccupation || ''}
                        onChange={(e) => updateField('motherOccupation', e.target.value)}
                        placeholder="e.g. Professor of Literature / Homemaker"
                        className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>

                {/* Grandparents Section with toggle */}
                <div className="pt-4 border-t border-[#F1E8DC]">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#4B1020] font-sans">
                      Grandparents (Optional)
                    </h3>
                    <label className="flex items-center gap-2 text-xs text-[#786B6B] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.includeGrandparents || false}
                        onChange={(e) => updateField('includeGrandparents', e.target.checked)}
                        className="rounded-xs text-[#4B1020]"
                      />
                      <span>Include grandparents in biodata</span>
                    </label>
                  </div>

                  {formData.includeGrandparents && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#FAF6EF] border border-[#E7DCD2] rounded-sm">
                      <div>
                        <label className="block text-xs font-semibold text-[#292122] mb-1">
                          Paternal Grandfather
                        </label>
                        <input
                          type="text"
                          value={formData.paternalGrandfather || ''}
                          onChange={(e) => updateField('paternalGrandfather', e.target.value)}
                          placeholder="e.g. Late Shri Shankarrao Kulkarni"
                          className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#292122] mb-1">
                          Paternal Grandmother
                        </label>
                        <input
                          type="text"
                          value={formData.paternalGrandmother || ''}
                          onChange={(e) => updateField('paternalGrandmother', e.target.value)}
                          placeholder="e.g. Smt. Yamunabai Kulkarni"
                          className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#292122] mb-1">
                          Maternal Grandfather
                        </label>
                        <input
                          type="text"
                          value={formData.maternalGrandfather || ''}
                          onChange={(e) => updateField('maternalGrandfather', e.target.value)}
                          placeholder="e.g. Shri Ramchandra Joshi"
                          className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#292122] mb-1">
                          Maternal Grandmother
                        </label>
                        <input
                          type="text"
                          value={formData.maternalGrandmother || ''}
                          onChange={(e) => updateField('maternalGrandmother', e.target.value)}
                          placeholder="e.g. Smt. Kamalabai Joshi"
                          className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Sibling Section */}
                <div className="pt-4 border-t border-[#F1E8DC]">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#4B1020] font-sans mb-1">
                    Sibling Details
                  </h3>
                  <p className="text-xs text-[#786B6B] mb-3">
                    Would you like to include sibling details?
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                    {[
                      { id: 'none', label: 'No Siblings' },
                      { id: 'brother', label: 'Brother(s)' },
                      { id: 'sister', label: 'Sister(s)' },
                      { id: 'both', label: 'Both' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => updateField('siblingType', opt.id as SiblingSelectionType)}
                        className={`py-2 px-3 text-xs font-semibold rounded-sm border transition-all ${
                          formData.siblingType === opt.id
                            ? 'bg-[#4B1020] text-[#FAF6EF] border-[#4B1020]'
                            : 'bg-white text-[#786B6B] border-[#E7DCD2] hover:bg-[#FAF6EF]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  {formData.siblingType !== 'none' && (
                    <div className="space-y-4">
                      {/* Brothers Section */}
                      {(formData.siblingType === 'brother' || formData.siblingType === 'both') && (
                        <div className="p-4 bg-[#FAF6EF] border border-[#E7DCD2] rounded-sm space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#4B1020] font-sans">
                              Brothers
                            </span>
                            <button
                              type="button"
                              onClick={addBrother}
                              className="text-xs font-semibold text-[#4B1020] hover:text-[#671C32] flex items-center gap-1"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add Another Brother</span>
                            </button>
                          </div>

                          {formData.brothers.length === 0 ? (
                            <p className="text-xs text-[#786B6B]">
                              No brother added yet.{' '}
                              <button
                                type="button"
                                onClick={addBrother}
                                className="text-[#4B1020] underline font-medium"
                              >
                                Click here to add brother
                              </button>
                            </p>
                          ) : (
                            formData.brothers.map((b, idx) => (
                              <div
                                key={b.id}
                                className="bg-white p-3 border border-[#E7DCD2] rounded-sm space-y-2 relative"
                              >
                                <div className="flex justify-between items-center text-xs font-semibold text-[#4B1020]">
                                  <span>Brother #{idx + 1}</span>
                                  <button
                                    type="button"
                                    onClick={() => removeBrother(b.id)}
                                    className="text-red-700 hover:text-red-900 text-xs"
                                  >
                                    Remove
                                  </button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  <input
                                    type="text"
                                    placeholder="Brother's Name"
                                    value={b.name}
                                    onChange={(e) => updateBrother(b.id, 'name', e.target.value)}
                                    className="px-2.5 py-1.5 text-xs border border-[#E7DCD2] rounded-sm"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Occupation"
                                    value={b.occupation || ''}
                                    onChange={(e) => updateBrother(b.id, 'occupation', e.target.value)}
                                    className="px-2.5 py-1.5 text-xs border border-[#E7DCD2] rounded-sm"
                                  />
                                  <select
                                    value={b.maritalStatus || 'Unmarried'}
                                    onChange={(e) => updateBrother(b.id, 'maritalStatus', e.target.value)}
                                    className="px-2.5 py-1.5 text-xs border border-[#E7DCD2] rounded-sm bg-white"
                                  >
                                    <option value="Unmarried">Unmarried</option>
                                    <option value="Married">Married</option>
                                  </select>
                                  <input
                                    type="text"
                                    placeholder="Age / Details (Optional)"
                                    value={b.details || ''}
                                    onChange={(e) => updateBrother(b.id, 'details', e.target.value)}
                                    className="px-2.5 py-1.5 text-xs border border-[#E7DCD2] rounded-sm"
                                  />
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      )}

                      {/* Sisters Section */}
                      {(formData.siblingType === 'sister' || formData.siblingType === 'both') && (
                        <div className="p-4 bg-[#FAF6EF] border border-[#E7DCD2] rounded-sm space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#4B1020] font-sans">
                              Sisters
                            </span>
                            <button
                              type="button"
                              onClick={addSister}
                              className="text-xs font-semibold text-[#4B1020] hover:text-[#671C32] flex items-center gap-1"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add Another Sister</span>
                            </button>
                          </div>

                          {formData.sisters.length === 0 ? (
                            <p className="text-xs text-[#786B6B]">
                              No sister added yet.{' '}
                              <button
                                type="button"
                                onClick={addSister}
                                className="text-[#4B1020] underline font-medium"
                              >
                                Click here to add sister
                              </button>
                            </p>
                          ) : (
                            formData.sisters.map((s, idx) => (
                              <div
                                key={s.id}
                                className="bg-white p-3 border border-[#E7DCD2] rounded-sm space-y-2 relative"
                              >
                                <div className="flex justify-between items-center text-xs font-semibold text-[#4B1020]">
                                  <span>Sister #{idx + 1}</span>
                                  <button
                                    type="button"
                                    onClick={() => removeSister(s.id)}
                                    className="text-red-700 hover:text-red-900 text-xs"
                                  >
                                    Remove
                                  </button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  <input
                                    type="text"
                                    placeholder="Sister's Name"
                                    value={s.name}
                                    onChange={(e) => updateSister(s.id, 'name', e.target.value)}
                                    className="px-2.5 py-1.5 text-xs border border-[#E7DCD2] rounded-sm"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Occupation"
                                    value={s.occupation || ''}
                                    onChange={(e) => updateSister(s.id, 'occupation', e.target.value)}
                                    className="px-2.5 py-1.5 text-xs border border-[#E7DCD2] rounded-sm"
                                  />
                                  <select
                                    value={s.maritalStatus || 'Unmarried'}
                                    onChange={(e) => updateSister(s.id, 'maritalStatus', e.target.value)}
                                    className="px-2.5 py-1.5 text-xs border border-[#E7DCD2] rounded-sm bg-white"
                                  >
                                    <option value="Unmarried">Unmarried</option>
                                    <option value="Married">Married</option>
                                  </select>
                                  <input
                                    type="text"
                                    placeholder="Age / Details (Optional)"
                                    value={s.details || ''}
                                    onChange={(e) => updateSister(s.id, 'details', e.target.value)}
                                    className="px-2.5 py-1.5 text-xs border border-[#E7DCD2] rounded-sm"
                                  />
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Additional Family Info */}
                <div className="pt-4 border-t border-[#F1E8DC]">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#4B1020] font-sans mb-3">
                    Additional Family Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#292122] mb-1">
                        Native Place
                      </label>
                      <input
                        type="text"
                        value={formData.nativePlace || ''}
                        onChange={(e) => updateField('nativePlace', e.target.value)}
                        placeholder="e.g. Satara / Pune, Maharashtra"
                        className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#292122] mb-1">
                        Family Values
                      </label>
                      <input
                        type="text"
                        value={formData.familyValues || ''}
                        onChange={(e) => updateField('familyValues', e.target.value)}
                        placeholder="e.g. Traditional yet progressive"
                        className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Partner Preferences (Optional) */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="border-b border-[#F1E8DC] pb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-serif font-bold text-[#4B1020]">
                      Step 4: Partner Expectations (Optional)
                    </h2>
                    <p className="text-xs text-[#786B6B] mt-1">
                      You can skip this step or include thoughtful preferences for prospective partners.
                    </p>
                  </div>
                  <label className="flex items-center gap-2 text-xs text-[#4B1020] font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.includePreferencesInPrint}
                      onChange={(e) => updateField('includePreferencesInPrint', e.target.checked)}
                      className="rounded-xs text-[#4B1020]"
                    />
                    <span>Include in Document</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#292122] mb-1">
                      Preferred Age Range
                    </label>
                    <input
                      type="text"
                      value={formData.prefAgeRange || ''}
                      onChange={(e) => updateField('prefAgeRange', e.target.value)}
                      placeholder="e.g. 24 to 28 years"
                      className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#292122] mb-1">
                      Preferred Height Range
                    </label>
                    <input
                      type="text"
                      value={formData.prefHeightRange || ''}
                      onChange={(e) => updateField('prefHeightRange', e.target.value)}
                      placeholder={`e.g. 5' 2" to 5' 7"`}
                      className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#292122] mb-1">
                      Educational Preferences
                    </label>
                    <input
                      type="text"
                      value={formData.prefEducation || ''}
                      onChange={(e) => updateField('prefEducation', e.target.value)}
                      placeholder="e.g. Postgraduate / Professional Graduate"
                      className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#292122] mb-1">
                      Professional Background
                    </label>
                    <input
                      type="text"
                      value={formData.prefProfession || ''}
                      onChange={(e) => updateField('prefProfession', e.target.value)}
                      placeholder="e.g. Working professional in tech, medicine, or finance"
                      className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#292122] mb-1">
                      General Expectations / Notes
                    </label>
                    <textarea
                      rows={3}
                      value={formData.prefExpectations || ''}
                      onChange={(e) => updateField('prefExpectations', e.target.value)}
                      placeholder="e.g. Looking for an understanding, cheerful life partner who values mutual respect..."
                      className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Contact Information */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="border-b border-[#F1E8DC] pb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-serif font-bold text-[#4B1020]">
                      Step 5: Contact Information
                    </h2>
                    <p className="text-xs text-[#786B6B] mt-1">
                      Specify how prospective families should get in touch with you.
                    </p>
                  </div>
                  <label className="flex items-center gap-2 text-xs text-[#4B1020] font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.includeContactInPrint}
                      onChange={(e) => updateField('includeContactInPrint', e.target.checked)}
                      className="rounded-xs text-[#4B1020]"
                    />
                    <span>Include in Document</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#292122] mb-1">
                      Contact Person Name
                    </label>
                    <input
                      type="text"
                      value={formData.contactPersonName || ''}
                      onChange={(e) => updateField('contactPersonName', e.target.value)}
                      placeholder="e.g. Dr. Vivek Kulkarni (Father)"
                      className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#292122] mb-1">
                      Relationship to Candidate
                    </label>
                    <input
                      type="text"
                      value={formData.contactRelation || ''}
                      onChange={(e) => updateField('contactRelation', e.target.value)}
                      placeholder="e.g. Father / Mother / Self"
                      className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#292122] mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={formData.contactPhone || ''}
                      onChange={(e) => updateField('contactPhone', e.target.value)}
                      placeholder="e.g. +91 98220 12345"
                      className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#292122] mb-1">
                      WhatsApp Number
                    </label>
                    <input
                      type="text"
                      value={formData.contactWhatsapp || ''}
                      onChange={(e) => updateField('contactWhatsapp', e.target.value)}
                      placeholder="e.g. +91 98220 12345"
                      className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#292122] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.contactEmail || ''}
                      onChange={(e) => updateField('contactEmail', e.target.value)}
                      placeholder="e.g. family.contact@gmail.com"
                      className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#292122] mb-1">
                      Postal / Residential Address (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.contactAddress || ''}
                      onChange={(e) => updateField('contactAddress', e.target.value)}
                      placeholder="e.g. Kothrud, Pune - 411038"
                      className="w-full px-3 py-2 text-sm border border-[#E7DCD2] rounded-sm focus:border-[#4B1020] focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Template Selection & Print */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div className="border-b border-[#F1E8DC] pb-4">
                  <h2 className="text-xl font-serif font-bold text-[#4B1020]">
                    Step 6: Select Template & Export
                  </h2>
                  <p className="text-xs text-[#786B6B] mt-1">
                    Select any of the 12 design styles. Your data is automatically mapped without loss.
                  </p>
                </div>

                {/* Template Grid Selector */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {TEMPLATE_REGISTRY.map((tmpl) => {
                    const isSelected = formData.templateId === tmpl.id;
                    return (
                      <button
                        key={tmpl.id}
                        type="button"
                        onClick={() => updateField('templateId', tmpl.id)}
                        className={`text-left p-3 rounded-sm border transition-all relative flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#4B1020] text-[#FAF6EF] border-[#4B1020] shadow-md ring-2 ring-[#C7A36A]'
                            : 'bg-[#FAF6EF] text-[#292122] border-[#E7DCD2] hover:bg-white'
                        }`}
                      >
                        <div>
                          <span
                            className={`text-[9px] uppercase tracking-wider font-bold block mb-0.5 ${
                              isSelected ? 'text-[#C7A36A]' : 'text-[#786B6B]'
                            }`}
                          >
                            Design {tmpl.number}
                          </span>
                          <span className="font-serif font-bold text-xs sm:text-sm block">
                            {tmpl.name}
                          </span>
                        </div>
                        {isSelected && (
                          <div className="mt-2 text-right">
                            <span className="inline-flex items-center gap-1 text-[10px] text-[#C7A36A] font-semibold">
                              <Check className="w-3 h-3" /> Selected
                            </span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Export Action Card */}
                <div className="p-6 bg-[#FAF6EF] border border-[#C7A36A] rounded-sm space-y-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#4B1020]">
                    <Printer className="w-5 h-5 text-[#C7A36A]" />
                    <span>Print & Download Your Marriage Biodata</span>
                  </div>
                  <p className="text-xs text-[#786B6B] leading-relaxed">
                    Click <strong>Print / Save as PDF</strong> below. In the print dialog, choose <strong>Save as PDF</strong> in the Destination drop-down to generate your clean A4 document.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handlePrint}
                      className="flex-1 py-3 px-6 text-sm font-semibold text-[#310914] bg-[#C7A36A] hover:bg-[#e0b979] active:scale-[0.98] rounded-sm transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print / Save as PDF</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleShare}
                      className="py-3 px-5 text-sm font-semibold text-[#4B1020] bg-white border border-[#E7DCD2] hover:bg-[#FAF6EF] active:scale-[0.98] rounded-sm transition-all flex items-center justify-center gap-2"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Share Biodata</span>
                    </button>
                  </div>

                  {shareFeedback && (
                    <div className="text-xs text-center text-[#4B1020] font-semibold bg-[#F1E8DC] p-2 rounded-xs animate-fade-in">
                      {shareFeedback}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 pt-4 border-t border-[#F1E8DC] flex justify-between items-center">
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                disabled={currentStep === 1}
                className="px-4 py-2 text-xs sm:text-sm font-medium text-[#786B6B] hover:text-[#292122] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <div className="text-xs text-[#786B6B] font-sans">
                Step {currentStep} of 6
              </div>

              {currentStep < 6 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => Math.min(6, prev + 1))}
                  className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-[#FAF6EF] bg-[#4B1020] hover:bg-[#671C32] rounded-sm shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-[#310914] bg-[#C7A36A] hover:bg-[#e0b979] rounded-sm shadow-md flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Document</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Live Document Preview (5 cols) */}
          <div className="hidden lg:block lg:col-span-5 sticky top-24 no-print">
            <div className="bg-white border border-[#E7DCD2] p-4 rounded-sm shadow-md">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F1E8DC] text-xs font-sans">
                <span className="font-bold text-[#4B1020] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#C7A36A]"></span>
                  Live Biodata Preview
                </span>
                <span className="text-[#786B6B]">
                  Updates automatically
                </span>
              </div>

              {/* Scaled Preview Box */}
              <div className="w-full aspect-[210/297] bg-[#FAF6EF] border border-[#E7DCD2] overflow-y-auto overflow-x-hidden shadow-inner p-2">
                <div className="w-full transform origin-top">
                  <DocumentRenderer data={formData} isThumbnail={false} />
                </div>
              </div>

              <div className="mt-3 flex justify-between items-center text-[11px] text-[#786B6B]">
                <span>Standard A4 Document Format</span>
                <button
                  onClick={handlePrint}
                  className="text-[#4B1020] font-semibold hover:underline flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Slide-Up Preview Modal */}
      {mobilePreviewOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end lg:hidden no-print"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-t-xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 bg-[#4B1020] text-[#FAF6EF] flex items-center justify-between">
              <span className="font-serif font-bold text-sm">
                Live Biodata Preview
              </span>
              <button
                onClick={() => setMobilePreviewOpen(false)}
                className="text-xs bg-[#FAF6EF]/20 px-3 py-1 rounded-sm text-white"
              >
                Close Preview
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 bg-[#FAF6EF]">
              <DocumentRenderer data={formData} isThumbnail={false} />
            </div>

            <div className="p-4 bg-white border-t border-[#E7DCD2] flex gap-3">
              <button
                onClick={handlePrint}
                className="flex-1 py-2.5 text-xs font-semibold text-[#310914] bg-[#C7A36A] rounded-sm flex items-center justify-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                Print / Save PDF
              </button>
              <button
                onClick={() => setMobilePreviewOpen(false)}
                className="px-4 py-2.5 text-xs font-medium text-[#786B6B] border border-[#E7DCD2] rounded-sm"
              >
                Continue Editing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Print-Only Container (Rendered off-screen for print media) */}
      <div className="hidden print:block">
        <DocumentRenderer data={formData} isPrint={true} />
      </div>
    </div>
  );
};
