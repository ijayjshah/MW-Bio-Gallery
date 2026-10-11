import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Trash2, ArrowLeft } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  const [cleared, setCleared] = useState(false);

  const handleClearLocalData = () => {
    localStorage.removeItem('mw_biodata_draft_v1');
    setCleared(true);
    setTimeout(() => setCleared(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FAF6EF] py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4B1020] hover:text-[#671C32] mb-8 font-sans transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to MW Bio Gallery</span>
        </Link>

        <div className="bg-white border border-[#E7DCD2] p-8 sm:p-12 rounded-sm shadow-sm space-y-8">
          <div className="border-b border-[#F1E8DC] pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF6EF] border border-[#E7DCD2] text-xs font-sans uppercase tracking-wider text-[#671C32] font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C7A36A]" />
              <span>Privacy & Confidentiality Notice</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#4B1020]">
              Privacy Policy
            </h1>
            <p className="text-xs text-[#786B6B] mt-2 font-sans">
              Effective Date: March 2026 · MW Bio Gallery (Pune, Maharashtra, India)
            </p>
          </div>

          <div className="space-y-6 text-sm text-[#292122] leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-serif font-bold text-[#4B1020]">
                1. Our Commitment to Your Matrimonial Privacy
              </h2>
              <p>
                At MW Bio Gallery, we understand that a marriage biodata contains sensitive personal, family, and cultural details. We believe matrimonial data belongs solely to you and your family. Unlike generic matchmaking portals, MW Bio Gallery operates strictly as a document design and publishing studio.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-serif font-bold text-[#4B1020]">
                2. Client-Side Only Architecture
              </h2>
              <p>
                Our platform uses a private, frontend-only processing architecture:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-[#786B6B]">
                <li><strong>No Remote Database Storage:</strong> Your personal information is processed directly within your browser and is never transmitted to, recorded in, or indexed on our web servers.</li>
                <li><strong>No Public Profiles:</strong> We do not create publicly searchable web pages or searchable directory profiles from your biodata.</li>
                <li><strong>No External Image Uploads:</strong> When you upload a profile photograph, it is processed locally in your browser session and is never uploaded to any third-party image repository.</li>
                <li><strong>No Personal Data in URLs:</strong> Your private family details are never embedded into web addresses.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-serif font-bold text-[#4B1020]">
                3. Browser Local Storage & Draft Management
              </h2>
              <p>
                To prevent accidental loss of your work if you refresh the browser or change templates, your current biodata form draft is temporarily cached in your device’s local browser storage (<code className="bg-[#FAF6EF] px-1 py-0.5 rounded text-xs">localStorage</code>).
              </p>
              <div className="p-4 bg-[#FAF6EF] border border-[#E7DCD2] rounded-sm mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#4B1020]">
                    Manage Your Local Draft
                  </h4>
                  <p className="text-xs text-[#786B6B] mt-0.5">
                    Delete the local cached draft stored in this browser right now.
                  </p>
                </div>
                <button
                  onClick={handleClearLocalData}
                  className="px-4 py-2 text-xs font-semibold text-white bg-red-800 hover:bg-red-900 rounded-sm transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Local Draft</span>
                </button>
              </div>
              {cleared && (
                <div className="p-2 bg-green-50 border border-green-200 text-green-800 text-xs rounded-sm">
                  ✓ Local draft cache cleared successfully from your browser.
                </div>
              )}
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-serif font-bold text-[#4B1020]">
                4. Printing and Document Export
              </h2>
              <p>
                When you initiate the <strong>Print / Save as PDF</strong> action, the document rendering is performed entirely on your device using native browser printing mechanisms. No copies of your generated document or PDF files are retained by MW Bio Gallery.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-serif font-bold text-[#4B1020]">
                5. Contact & Questions
              </h2>
              <p>
                If you have questions regarding our privacy practices or wish to inquire about bespoke wedding stationery design, you can reach out via our studio Instagram handle <strong>@mwartgallery</strong> in Pune, Maharashtra, India.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
