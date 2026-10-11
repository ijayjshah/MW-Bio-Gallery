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

export const BotanicalIvory: React.FC<TemplateProps> = ({ data, isThumbnail = false }) => {
  const age = calculateAge(data.dateOfBirth);
  const dobFormatted = formatDobDisplay(data.dateOfBirth);
  const hasGrandparents = hasGrandparentDetails(data);
  const hasSiblings = hasSiblingDetails(data);
  const hasPreferences = hasPartnerPreferences(data);
  const hasContact = hasContactDetails(data);

  return (
    <div
      className={`relative w-full bg-[#FAF6EF] text-[#292122] font-serif shadow-md border border-[#E7DCD2] transition-all ${
        isThumbnail ? 'p-3 text-[8px] leading-tight select-none' : 'p-8 sm:p-12 text-sm leading-relaxed'
      }`}
      style={{ boxSizing: 'border-box' }}
    >
      {/* Botanical Header Emblem & Deity Invocation */}
      <div className="text-center mb-6">
        {data.showGodNameInPrint !== false && data.godName && (
          <div className="mb-2">
            <span className="text-xs sm:text-sm font-serif font-semibold text-[#671C32] tracking-widest inline-block border-b border-[#C7A36A]/40 pb-0.5">
              ❧ {data.godName} ❧
            </span>
          </div>
        )}
        <div className="flex items-center justify-center gap-2 mb-1 text-[#671C32]">
          <svg className="w-5 h-5 text-[#671C32]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 22C12 22 20 18 20 12C20 6 12 2 12 2C12 2 4 6 4 12C4 18 12 22 12 22Z" strokeWidth="1" />
            <path d="M12 2V22" strokeWidth="1" />
            <path d="M12 12C15 10 18 12 18 12" strokeWidth="1" />
            <path d="M12 8C9 6 6 8 6 8" strokeWidth="1" />
          </svg>
        </div>
        <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#786B6B] block">
          Marriage Biodata
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif text-[#4B1020] mt-1 font-medium">
          {data.fullName || 'Candidate Name'}
        </h1>
        <div className="w-16 h-[1px] bg-[#C7A36A] mx-auto mt-2"></div>
      </div>

      {/* Portrait & Overview */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6 pb-6 border-b border-[#E7DCD2]">
        <div className="shrink-0">
          {data.photoUrl ? (
            <img
              src={data.photoUrl}
              alt={data.fullName || 'Candidate'}
              referrerPolicy="no-referrer"
              className="w-24 h-32 sm:w-28 sm:h-36 object-cover rounded-md border border-[#C7A36A] p-1 bg-white shadow-sm"
            />
          ) : (
            <div className="w-24 h-32 sm:w-28 sm:h-36 rounded-md border border-[#C7A36A] p-1 bg-white flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-bold text-[#671C32]">{getInitials(data.fullName)}</span>
              <span className="text-[10px] text-[#786B6B] font-sans mt-1">Botanical</span>
            </div>
          )}
        </div>

        <div className="flex-1 w-full text-xs sm:text-sm">
          {data.aboutMe && <p className="italic text-[#671C32] mb-3">"{data.aboutMe}"</p>}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
            {dobFormatted && <div><span className="text-[#786B6B] font-sans">Date of Birth:</span> <strong>{dobFormatted} {age ? `(${age} yrs)` : ''}</strong></div>}
            {data.height && <div><span className="text-[#786B6B] font-sans">Height:</span> <strong>{data.height}</strong></div>}
            {data.currentCity && <div><span className="text-[#786B6B] font-sans">Location:</span> <strong>{data.currentCity}{data.currentState ? `, ${data.currentState}` : ''}</strong></div>}
            {data.religion && <div><span className="text-[#786B6B] font-sans">Community:</span> <strong>{data.religion}{data.caste ? ` (${data.caste})` : ''}</strong></div>}
            {data.motherTongue && <div><span className="text-[#786B6B] font-sans">Mother Tongue:</span> <strong>{data.motherTongue}</strong></div>}
            {data.diet && <div><span className="text-[#786B6B] font-sans">Diet:</span> <strong>{data.diet}</strong></div>}
          </div>
        </div>
      </div>

      {/* Education & Career */}
      {(data.highestQualification || data.profession) && (
        <section className="mb-6">
          <h2 className="text-sm font-sans uppercase tracking-widest text-[#4B1020] font-bold border-b border-[#E7DCD2] pb-1 mb-2">
            Education & Career
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
            {data.highestQualification && <div><span className="text-[#786B6B] font-sans">Highest Degree:</span> {data.highestQualification}</div>}
            {data.collegeUniversity && <div><span className="text-[#786B6B] font-sans">College:</span> {data.collegeUniversity}</div>}
            {data.profession && <div><span className="text-[#786B6B] font-sans">Profession:</span> {data.profession}</div>}
            {data.jobTitle && <div><span className="text-[#786B6B] font-sans">Role:</span> {data.jobTitle}</div>}
            {data.companyName && data.showCompanyInPrint && <div><span className="text-[#786B6B] font-sans">Organization:</span> {data.companyName}</div>}
            {data.annualIncome && data.showIncomeInPrint && <div><span className="text-[#786B6B] font-sans">Annual Income:</span> {data.annualIncome}</div>}
          </div>
        </section>
      )}

      {/* Family Lineage */}
      {(data.fatherName || data.motherName || hasGrandparents || hasSiblings) && (
        <section className="mb-6">
          <h2 className="text-sm font-sans uppercase tracking-widest text-[#4B1020] font-bold border-b border-[#E7DCD2] pb-1 mb-2">
            Family Particulars
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
            {data.fatherName && <div><span className="text-[#786B6B] font-sans">Father:</span> {data.fatherName} {data.fatherOccupation ? `(${data.fatherOccupation})` : ''}</div>}
            {data.motherName && <div><span className="text-[#786B6B] font-sans">Mother:</span> {data.motherName} {data.motherOccupation ? `(${data.motherOccupation})` : ''}</div>}

            {hasGrandparents && (
              <div className="sm:col-span-2 pt-1 border-t border-[#E7DCD2] text-xs">
                <span className="text-[#786B6B] font-sans block">Grandparents:</span>
                {(data.paternalGrandfather || data.paternalGrandmother) && <div>Paternal: {[data.paternalGrandfather, data.paternalGrandmother].filter(Boolean).join(' · ')}</div>}
                {(data.maternalGrandfather || data.maternalGrandmother) && <div>Maternal: {[data.maternalGrandfather, data.maternalGrandmother].filter(Boolean).join(' · ')}</div>}
              </div>
            )}

            {hasSiblings && (
              <div className="sm:col-span-2 pt-1 border-t border-[#E7DCD2] text-xs">
                <span className="text-[#786B6B] font-sans block">Siblings:</span>
                {data.brothers?.map(b => <div key={b.id}>Brother: {b.name} {b.occupation ? `· ${b.occupation}` : ''}</div>)}
                {data.sisters?.map(s => <div key={s.id}>Sister: {s.name} {s.occupation ? `· ${s.occupation}` : ''}</div>)}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Preferences */}
      {hasPreferences && (
        <section className="mb-6">
          <h2 className="text-sm font-sans uppercase tracking-widest text-[#4B1020] font-bold border-b border-[#E7DCD2] pb-1 mb-2">
            Partner Expectations
          </h2>
          <div className="text-xs sm:text-sm space-y-1">
            {[data.prefAgeRange ? `Age: ${data.prefAgeRange}` : null, data.prefEducation ? `Education: ${data.prefEducation}` : null, data.prefProfession ? `Profession: ${data.prefProfession}` : null].filter(Boolean).join(' • ')}
            {data.prefExpectations && <div className="italic text-[#671C32] mt-1">"{data.prefExpectations}"</div>}
          </div>
        </section>
      )}

      {/* Contact */}
      {hasContact && (
        <footer className="pt-3 border-t border-[#C7A36A]/50 text-center text-xs">
          <span className="font-sans uppercase text-[11px] tracking-wider text-[#786B6B] block mb-1">
            Direct Contact
          </span>
          <div className="flex flex-wrap justify-center gap-4">
            {data.contactPersonName && <span><strong>{data.contactPersonName}</strong></span>}
            {data.contactPhone && <span>Phone: {data.contactPhone}</span>}
            {data.contactWhatsapp && <span>WA: {data.contactWhatsapp}</span>}
            {data.contactEmail && <span>Email: {data.contactEmail}</span>}
          </div>
        </footer>
      )}
    </div>
  );
};
