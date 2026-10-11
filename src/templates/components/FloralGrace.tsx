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

export const FloralGrace: React.FC<TemplateProps> = ({ data, isThumbnail = false }) => {
  const age = calculateAge(data.dateOfBirth);
  const dobFormatted = formatDobDisplay(data.dateOfBirth);
  const hasGrandparents = hasGrandparentDetails(data);
  const hasSiblings = hasSiblingDetails(data);
  const hasPreferences = hasPartnerPreferences(data);
  const hasContact = hasContactDetails(data);

  return (
    <div
      className={`relative w-full bg-[#FAF6EF] text-[#292122] font-serif shadow-md border border-[#E7DCD2] transition-all overflow-hidden ${
        isThumbnail ? 'p-3 text-[8px] leading-tight select-none' : 'p-8 sm:p-12 text-sm leading-relaxed'
      }`}
      style={{ boxSizing: 'border-box' }}
    >
      {/* Delicate Floral Corner SVGs */}
      <svg className="absolute top-2 left-2 w-16 h-16 text-[#671C32]/30 pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
        <path d="M10,10 Q30,10 40,25 Q50,40 50,60 C40,45 30,35 10,35 Z" opacity="0.7"/>
        <path d="M10,10 Q10,30 25,40 Q40,50 60,50 C45,40 35,30 35,10 Z" opacity="0.7"/>
        <circle cx="20" cy="20" r="4" fill="#C7A36A" />
      </svg>
      <svg className="absolute top-2 right-2 w-16 h-16 text-[#671C32]/30 pointer-events-none rotate-90" viewBox="0 0 100 100" fill="currentColor">
        <path d="M10,10 Q30,10 40,25 Q50,40 50,60 C40,45 30,35 10,35 Z" opacity="0.7"/>
        <path d="M10,10 Q10,30 25,40 Q40,50 60,50 C45,40 35,30 35,10 Z" opacity="0.7"/>
        <circle cx="20" cy="20" r="4" fill="#C7A36A" />
      </svg>

      {/* Header with Auspicious Deity Invocation */}
      <div className="text-center mb-6 pt-2">
        {data.showGodNameInPrint !== false && data.godName && (
          <div className="mb-2">
            <span className="text-xs sm:text-sm font-serif font-bold text-[#671C32] tracking-widest inline-block border-b border-[#C7A36A]/50 pb-0.5">
              ❀ {data.godName} ❀
            </span>
          </div>
        )}
        <span className="text-xs uppercase tracking-[0.2em] text-[#671C32] font-sans block mb-1">
          Wedding Biodata
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif text-[#4B1020] font-normal">
          {data.fullName || 'Candidate Name'}
        </h1>
        <div className="flex items-center justify-center gap-3 my-2 text-[#C7A36A]">
          <span>~ ❀ ~</span>
        </div>
      </div>

      {/* Portrait & Core details */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-6 p-4 bg-[#F1E8DC]/40 rounded-xl border border-[#E7DCD2]">
        <div className="shrink-0">
          {data.photoUrl ? (
            <img
              src={data.photoUrl}
              alt={data.fullName || 'Candidate'}
              referrerPolicy="no-referrer"
              className="w-24 h-28 sm:w-28 sm:h-32 object-cover rounded-full border-2 border-[#C7A36A] shadow-sm"
            />
          ) : (
            <div className="w-24 h-28 sm:w-28 sm:h-32 rounded-full border-2 border-[#C7A36A] flex flex-col items-center justify-center bg-white shadow-sm">
              <span className="text-2xl text-[#671C32] font-bold">{getInitials(data.fullName)}</span>
              <span className="text-[10px] text-[#786B6B] font-sans">Floral</span>
            </div>
          )}
        </div>

        <div className="flex-1 w-full text-xs sm:text-sm">
          {data.aboutMe && (
            <p className="italic text-[#671C32] mb-3 text-center sm:text-left">
              "{data.aboutMe}"
            </p>
          )}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
            {dobFormatted && <div><strong className="text-[#671C32] font-sans">DOB:</strong> {dobFormatted} {age ? `(${age} yrs)` : ''}</div>}
            {data.height && <div><strong className="text-[#671C32] font-sans">Height:</strong> {data.height}</div>}
            {data.currentCity && <div><strong className="text-[#671C32] font-sans">City:</strong> {data.currentCity}</div>}
            {data.religion && <div><strong className="text-[#671C32] font-sans">Community:</strong> {data.religion} {data.caste ? `(${data.caste})` : ''}</div>}
            {data.motherTongue && <div><strong className="text-[#671C32] font-sans">Mother Tongue:</strong> {data.motherTongue}</div>}
            {data.diet && <div><strong className="text-[#671C32] font-sans">Diet:</strong> {data.diet}</div>}
          </div>
        </div>
      </div>

      {/* Academic & Career */}
      {(data.highestQualification || data.profession) && (
        <section className="mb-6">
          <h2 className="text-base font-semibold text-[#4B1020] border-b border-[#C7A36A]/40 pb-1 mb-2 flex items-center justify-between">
            <span>Education & Career</span>
            <span className="text-[#C7A36A] text-xs">❦</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
            {data.highestQualification && <div><strong>Qualification:</strong> {data.highestQualification}</div>}
            {data.collegeUniversity && <div><strong>University:</strong> {data.collegeUniversity}</div>}
            {data.profession && <div><strong>Profession:</strong> {data.profession}</div>}
            {data.jobTitle && <div><strong>Role:</strong> {data.jobTitle}</div>}
            {data.companyName && data.showCompanyInPrint && <div><strong>Company:</strong> {data.companyName}</div>}
            {data.annualIncome && data.showIncomeInPrint && <div><strong>Package:</strong> {data.annualIncome}</div>}
          </div>
        </section>
      )}

      {/* Family Details */}
      {(data.fatherName || data.motherName || hasGrandparents || hasSiblings) && (
        <section className="mb-6">
          <h2 className="text-base font-semibold text-[#4B1020] border-b border-[#C7A36A]/40 pb-1 mb-2 flex items-center justify-between">
            <span>Family Lineage</span>
            <span className="text-[#C7A36A] text-xs">❦</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
            {data.fatherName && <div><strong>Father:</strong> {data.fatherName} {data.fatherOccupation ? `(${data.fatherOccupation})` : ''}</div>}
            {data.motherName && <div><strong>Mother:</strong> {data.motherName} {data.motherOccupation ? `(${data.motherOccupation})` : ''}</div>}

            {hasGrandparents && (
              <div className="sm:col-span-2 text-xs border-t border-[#E7DCD2] pt-1">
                <span className="text-[#671C32] font-sans font-bold block mb-1">Grandparents:</span>
                {(data.paternalGrandfather || data.paternalGrandmother) && <div>Paternal: {[data.paternalGrandfather, data.paternalGrandmother].filter(Boolean).join(' · ')}</div>}
                {(data.maternalGrandfather || data.maternalGrandmother) && <div>Maternal: {[data.maternalGrandfather, data.maternalGrandmother].filter(Boolean).join(' · ')}</div>}
              </div>
            )}

            {hasSiblings && (
              <div className="sm:col-span-2 text-xs border-t border-[#E7DCD2] pt-1">
                <span className="text-[#671C32] font-sans font-bold block mb-1">Siblings:</span>
                {data.brothers?.map(b => <div key={b.id}>Brother: {b.name} {b.occupation ? `(${b.occupation})` : ''}</div>)}
                {data.sisters?.map(s => <div key={s.id}>Sister: {s.name} {s.occupation ? `(${s.occupation})` : ''}</div>)}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Partner Preferences */}
      {hasPreferences && (
        <section className="mb-6">
          <h2 className="text-base font-semibold text-[#4B1020] border-b border-[#C7A36A]/40 pb-1 mb-2 flex items-center justify-between">
            <span>Partner Preferences</span>
            <span className="text-[#C7A36A] text-xs">❦</span>
          </h2>
          <div className="text-xs sm:text-sm space-y-1">
            {[data.prefAgeRange ? `Age: ${data.prefAgeRange}` : null, data.prefEducation ? `Education: ${data.prefEducation}` : null, data.prefProfession ? `Profession: ${data.prefProfession}` : null].filter(Boolean).join(' · ')}
            {data.prefExpectations && <div className="italic text-[#671C32] mt-1">"{data.prefExpectations}"</div>}
          </div>
        </section>
      )}

      {/* Contact Details */}
      {hasContact && (
        <footer className="pt-4 border-t border-[#C7A36A]/50 text-center text-xs">
          <span className="font-sans text-[11px] uppercase tracking-wider text-[#671C32] font-bold block mb-1">
            Contact Details
          </span>
          <div className="flex flex-wrap justify-center gap-4">
            {data.contactPersonName && <span><strong>{data.contactPersonName}</strong></span>}
            {data.contactPhone && <span>Phone: {data.contactPhone}</span>}
            {data.contactWhatsapp && <span>WhatsApp: {data.contactWhatsapp}</span>}
            {data.contactEmail && <span>Email: {data.contactEmail}</span>}
          </div>
        </footer>
      )}
    </div>
  );
};
