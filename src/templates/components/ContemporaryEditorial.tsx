import React from 'react';
import { BiodataData } from '../../features/biodata/biodataTypes';
import {
  calculateAge,
  formatDobDisplay,
  hasGrandparentDetails,
  hasSiblingDetails,
  hasPartnerPreferences,
  hasContactDetails,
  getInitials,
} from '../../features/biodata/biodataFormatting';

interface TemplateProps {
  data: BiodataData;
  isPrint?: boolean;
  isThumbnail?: boolean;
}

export const ContemporaryEditorial: React.FC<TemplateProps> = ({ data, isThumbnail = false }) => {
  const age = calculateAge(data.dateOfBirth);
  const dobFormatted = formatDobDisplay(data.dateOfBirth);
  const hasGrandparents = hasGrandparentDetails(data);
  const hasSiblings = hasSiblingDetails(data);
  const hasPreferences = hasPartnerPreferences(data);
  const hasContact = hasContactDetails(data);

  return (
    <div
      className={`relative w-full bg-[#FAF6EF] text-[#292122] font-serif shadow-lg transition-all ${
        isThumbnail ? 'p-3 text-[8px] leading-tight select-none' : 'p-8 sm:p-12 text-sm leading-relaxed'
      }`}
      style={{ boxSizing: 'border-box' }}
    >
      {/* Magazine Editorial Masthead */}
      <div className="border-b-2 border-[#4B1020] pb-4 mb-6">
        <div className="flex justify-between items-center text-[10px] tracking-[0.25em] font-sans uppercase text-[#786B6B] mb-2">
          <span>{data.showGodNameInPrint !== false && data.godName ? data.godName : 'MATRIMONIAL MONOGRAPH'}</span>
          <span>EDITION 2026</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#4B1020] font-serif uppercase">
          {data.fullName || 'Candidate Name'}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-sans text-[#671C32] mt-2 font-medium">
          {data.profession && <span>{data.profession}</span>}
          {data.currentCity && <span>• {data.currentCity}</span>}
          {age && <span>• {age} Years</span>}
          {data.height && <span>• {data.height}</span>}
        </div>
      </div>

      {/* Asymmetric 2-column spread */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
        {/* Left Column (5 cols): Portrait & Narrative */}
        <div className="md:col-span-5 space-y-6">
          <div className="relative">
            {data.photoUrl ? (
              <img
                src={data.photoUrl}
                alt={data.fullName || 'Candidate'}
                referrerPolicy="no-referrer"
                className="w-full h-56 sm:h-72 object-cover border-2 border-[#4B1020] shadow-sm"
              />
            ) : (
              <div className="w-full h-56 sm:h-72 bg-[#E7DCD2] flex flex-col items-center justify-center border border-[#4B1020]">
                <span className="text-4xl font-serif text-[#4B1020]">{getInitials(data.fullName)}</span>
                <span className="text-[10px] font-sans tracking-widest text-[#786B6B] mt-2 uppercase">Editorial Portrait</span>
              </div>
            )}
            <div className="text-[10px] text-[#786B6B] font-sans italic mt-1 text-right">
              Profile Monograph
            </div>
          </div>

          {data.aboutMe && (
            <div className="bg-white p-4 border-l-2 border-[#4B1020] shadow-sm">
              <span className="text-[10px] uppercase tracking-wider font-sans text-[#786B6B] block mb-1">
                Statement
              </span>
              <p className="italic text-xs sm:text-sm text-[#292122] leading-relaxed">
                "{data.aboutMe}"
              </p>
            </div>
          )}

          <div className="space-y-2 text-xs font-sans">
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#4B1020] block">
              Vital Records
            </span>
            {dobFormatted && <div><span className="text-[#786B6B]">Born:</span> <strong>{dobFormatted}</strong></div>}
            {data.religion && <div><span className="text-[#786B6B]">Heritage:</span> <strong>{data.religion} {data.caste ? `(${data.caste})` : ''}</strong></div>}
            {data.motherTongue && <div><span className="text-[#786B6B]">Mother Tongue:</span> <strong>{data.motherTongue}</strong></div>}
            {data.languages && <div><span className="text-[#786B6B]">Languages:</span> <strong>{data.languages}</strong></div>}
            {data.diet && <div><span className="text-[#786B6B]">Diet:</span> <strong>{data.diet}</strong></div>}
          </div>
        </div>

        {/* Right Column (7 cols): Academics, Career & Lineage */}
        <div className="md:col-span-7 space-y-6">
          {/* Academics & Career */}
          <div>
            <h2 className="text-xs uppercase tracking-widest font-sans font-bold text-[#4B1020] border-b border-[#4B1020]/30 pb-1 mb-3">
              I. Academic & Career Trajectory
            </h2>
            <div className="space-y-2 text-xs sm:text-sm">
              <div>
                <span className="text-[#786B6B] font-sans block text-[11px]">Primary Qualification</span>
                <span className="font-bold text-[#292122] text-sm sm:text-base">{data.highestQualification || '—'}</span>
                {data.collegeUniversity && <span className="text-[#786B6B] block text-xs">{data.collegeUniversity}</span>}
              </div>
              {data.additionalQualifications && (
                <div>
                  <span className="text-[#786B6B] font-sans text-[11px]">Additional Credentials:</span> {data.additionalQualifications}
                </div>
              )}
              {data.jobTitle && (
                <div className="pt-2">
                  <span className="text-[#786B6B] font-sans block text-[11px]">Current Engagement</span>
                  <span className="font-semibold text-[#4B1020]">{data.jobTitle}</span>
                  {data.companyName && data.showCompanyInPrint && <span className="text-[#292122]"> at {data.companyName}</span>}
                </div>
              )}
              {data.annualIncome && data.showIncomeInPrint && (
                <div>
                  <span className="text-[#786B6B] font-sans text-[11px]">Compensation:</span> <strong>{data.annualIncome}</strong>
                </div>
              )}
            </div>
          </div>

          {/* Family */}
          <div>
            <h2 className="text-xs uppercase tracking-widest font-sans font-bold text-[#4B1020] border-b border-[#4B1020]/30 pb-1 mb-3">
              II. Family Lineage
            </h2>
            <div className="space-y-2 text-xs sm:text-sm">
              {data.fatherName && (
                <div>
                  <span className="text-[#786B6B] font-sans text-[11px]">Paternal Anchor:</span>{' '}
                  <strong>{data.fatherName}</strong> {data.fatherOccupation ? `(${data.fatherOccupation})` : ''}
                </div>
              )}
              {data.motherName && (
                <div>
                  <span className="text-[#786B6B] font-sans text-[11px]">Maternal Anchor:</span>{' '}
                  <strong>{data.motherName}</strong> {data.motherOccupation ? `(${data.motherOccupation})` : ''}
                </div>
              )}

              {hasGrandparents && (
                <div className="pt-1 text-xs">
                  <span className="text-[#786B6B] font-sans block text-[11px]">Ancestral Roots:</span>
                  {(data.paternalGrandfather || data.paternalGrandmother) && (
                    <div>Paternal: {[data.paternalGrandfather, data.paternalGrandmother].filter(Boolean).join(' · ')}</div>
                  )}
                  {(data.maternalGrandfather || data.maternalGrandmother) && (
                    <div>Maternal: {[data.maternalGrandfather, data.maternalGrandmother].filter(Boolean).join(' · ')}</div>
                  )}
                </div>
              )}

              {hasSiblings && (
                <div className="pt-1 text-xs">
                  <span className="text-[#786B6B] font-sans block text-[11px]">Siblings:</span>
                  {data.brothers?.map(b => <div key={b.id}>Brother: {b.name} {b.occupation ? `· ${b.occupation}` : ''}</div>)}
                  {data.sisters?.map(s => <div key={s.id}>Sister: {s.name} {s.occupation ? `· ${s.occupation}` : ''}</div>)}
                </div>
              )}
            </div>
          </div>

          {/* Preferences */}
          {hasPreferences && (
            <div>
              <h2 className="text-xs uppercase tracking-widest font-sans font-bold text-[#4B1020] border-b border-[#4B1020]/30 pb-1 mb-3">
                III. Perspectives on Life Partner
              </h2>
              <div className="text-xs text-[#292122] space-y-1">
                {[
                  data.prefAgeRange ? `Age: ${data.prefAgeRange}` : null,
                  data.prefEducation ? `Education: ${data.prefEducation}` : null,
                  data.prefProfession ? `Profession: ${data.prefProfession}` : null,
                ].filter(Boolean).join(' • ')}
                {data.prefExpectations && <div className="italic mt-1 text-[#671C32]">"{data.prefExpectations}"</div>}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contact Strip */}
      {hasContact && (
        <div className="border-t border-[#4B1020] pt-3 flex flex-wrap justify-between items-center text-xs font-sans text-[#786B6B]">
          <span className="font-bold uppercase tracking-wider text-[#4B1020]">Inquiries & Correspondence</span>
          <div className="flex flex-wrap gap-4 text-xs text-[#292122]">
            {data.contactPersonName && <span>{data.contactPersonName}</span>}
            {data.contactPhone && <span>Tel: {data.contactPhone}</span>}
            {data.contactWhatsapp && <span>WA: {data.contactWhatsapp}</span>}
            {data.contactEmail && <span>{data.contactEmail}</span>}
          </div>
        </div>
      )}
    </div>
  );
};
