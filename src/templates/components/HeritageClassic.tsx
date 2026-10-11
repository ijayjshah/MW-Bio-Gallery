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

export const HeritageClassic: React.FC<TemplateProps> = ({ data, isThumbnail = false }) => {
  const age = calculateAge(data.dateOfBirth);
  const dobFormatted = formatDobDisplay(data.dateOfBirth);
  const hasGrandparents = hasGrandparentDetails(data);
  const hasSiblings = hasSiblingDetails(data);
  const hasPreferences = hasPartnerPreferences(data);
  const hasContact = hasContactDetails(data);

  return (
    <div
      className={`relative w-full bg-[#FAF6EF] text-[#292122] font-serif shadow-md transition-all border-2 border-[#C7A36A] ${
        isThumbnail ? 'p-3 text-[8px] leading-tight select-none' : 'p-8 sm:p-12 text-sm leading-relaxed'
      }`}
      style={{ boxSizing: 'border-box' }}
    >
      {/* Decorative Traditional Arch SVG at Top */}
      <div className="flex flex-col items-center justify-center mb-6">
        <svg className="w-24 h-8 text-[#C7A36A]" viewBox="0 0 120 40" fill="none" stroke="currentColor">
          <path d="M10,35 C30,35 40,15 60,10 C80,15 90,35 110,35" strokeWidth="1.5" />
          <circle cx="60" cy="8" r="2" fill="#C7A36A" />
        </svg>
        {data.showGodNameInPrint !== false && data.godName && (
          <span className="text-[#C7A36A] text-xs sm:text-sm tracking-widest font-serif font-bold">
            {data.godName}
          </span>
        )}
        <h1 className="text-2xl sm:text-4xl font-bold text-[#4B1020] mt-1 tracking-wide">
          {data.fullName || 'Candidate Name'}
        </h1>
        <div className="text-xs text-[#786B6B] font-sans mt-0.5">
          Heritage Matrimonial Profile
        </div>
      </div>

      {/* Main Grid with Indian Classic Partition */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-y border-[#C7A36A]/50 py-4 mb-6 bg-[#F1E8DC]/30">
        <div className="shrink-0">
          {data.photoUrl ? (
            <img
              src={data.photoUrl}
              alt={data.fullName || 'Candidate'}
              referrerPolicy="no-referrer"
              className="w-24 h-32 sm:w-28 sm:h-36 object-cover border border-[#C7A36A] p-1 bg-white"
            />
          ) : (
            <div className="w-24 h-32 sm:w-28 sm:h-36 border border-[#C7A36A] p-1 bg-white flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-[#4B1020]">{getInitials(data.fullName)}</span>
              <span className="text-[10px] text-[#786B6B] font-sans uppercase">Heritage</span>
            </div>
          )}
        </div>

        <div className="flex-1 w-full text-xs sm:text-sm">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
            {dobFormatted && <div><strong className="text-[#4B1020]">Date of Birth:</strong> {dobFormatted} {age ? `(${age} yrs)` : ''}</div>}
            {data.height && <div><strong className="text-[#4B1020]">Height:</strong> {data.height}</div>}
            {data.religion && <div><strong className="text-[#4B1020]">Religion:</strong> {data.religion}</div>}
            {data.caste && <div><strong className="text-[#4B1020]">Caste/Subcaste:</strong> {data.caste}</div>}
            {data.currentCity && <div><strong className="text-[#4B1020]">Current City:</strong> {data.currentCity}{data.currentState ? `, ${data.currentState}` : ''}</div>}
            {data.motherTongue && <div><strong className="text-[#4B1020]">Mother Tongue:</strong> {data.motherTongue}</div>}
            {data.diet && <div><strong className="text-[#4B1020]">Diet:</strong> {data.diet}</div>}
            {data.maritalStatus && <div><strong className="text-[#4B1020]">Status:</strong> {data.maritalStatus}</div>}
          </div>
          {data.aboutMe && <p className="italic text-xs text-[#4B1020]/90 mt-2">"{data.aboutMe}"</p>}
        </div>
      </div>

      {/* Education & Profession */}
      {(data.highestQualification || data.profession) && (
        <div className="mb-6">
          <div className="bg-[#4B1020] text-[#FAF6EF] px-3 py-1 text-xs sm:text-sm font-sans uppercase tracking-wider font-semibold mb-2">
            Education & Career
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs sm:text-sm px-1">
            {data.highestQualification && <div><strong>Degree:</strong> {data.highestQualification}</div>}
            {data.collegeUniversity && <div><strong>Institute:</strong> {data.collegeUniversity}</div>}
            {data.profession && <div><strong>Profession:</strong> {data.profession}</div>}
            {data.jobTitle && <div><strong>Designation:</strong> {data.jobTitle}</div>}
            {data.companyName && data.showCompanyInPrint && <div><strong>Organization:</strong> {data.companyName}</div>}
            {data.annualIncome && data.showIncomeInPrint && <div><strong>Income:</strong> {data.annualIncome}</div>}
          </div>
        </div>
      )}

      {/* Family Details */}
      {(data.fatherName || data.motherName || hasGrandparents || hasSiblings) && (
        <div className="mb-6">
          <div className="bg-[#4B1020] text-[#FAF6EF] px-3 py-1 text-xs sm:text-sm font-sans uppercase tracking-wider font-semibold mb-2">
            Family Particulars
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs sm:text-sm px-1">
            {data.fatherName && <div><strong>Father:</strong> {data.fatherName} {data.fatherOccupation ? `(${data.fatherOccupation})` : ''}</div>}
            {data.motherName && <div><strong>Mother:</strong> {data.motherName} {data.motherOccupation ? `(${data.motherOccupation})` : ''}</div>}

            {hasGrandparents && (
              <div className="sm:col-span-2 text-xs border-t border-[#E7DCD2] pt-1">
                <span className="font-bold text-[#4B1020] block mb-0.5">Grandparents:</span>
                {(data.paternalGrandfather || data.paternalGrandmother) && <div>Paternal: {[data.paternalGrandfather, data.paternalGrandmother].filter(Boolean).join(' & ')}</div>}
                {(data.maternalGrandfather || data.maternalGrandmother) && <div>Maternal: {[data.maternalGrandfather, data.maternalGrandmother].filter(Boolean).join(' & ')}</div>}
              </div>
            )}

            {hasSiblings && (
              <div className="sm:col-span-2 text-xs border-t border-[#E7DCD2] pt-1">
                <span className="font-bold text-[#4B1020] block mb-0.5">Brothers & Sisters:</span>
                {data.brothers?.map(b => <div key={b.id}>Brother: {b.name} {b.occupation ? `· ${b.occupation}` : ''}</div>)}
                {data.sisters?.map(s => <div key={s.id}>Sister: {s.name} {s.occupation ? `· ${s.occupation}` : ''}</div>)}
              </div>
            )}

            {(data.nativePlace || data.familyType) && (
              <div className="sm:col-span-2 text-xs text-[#786B6B]">
                {[data.nativePlace ? `Native: ${data.nativePlace}` : null, data.familyType ? `Family: ${data.familyType}` : null].filter(Boolean).join(' • ')}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Preferences */}
      {hasPreferences && (
        <div className="mb-6">
          <div className="bg-[#4B1020] text-[#FAF6EF] px-3 py-1 text-xs sm:text-sm font-sans uppercase tracking-wider font-semibold mb-2">
            Expectations
          </div>
          <div className="text-xs sm:text-sm px-1 space-y-1">
            {[data.prefAgeRange ? `Age: ${data.prefAgeRange}` : null, data.prefEducation ? `Education: ${data.prefEducation}` : null, data.prefProfession ? `Profession: ${data.prefProfession}` : null].filter(Boolean).join(' • ')}
            {data.prefExpectations && <div className="italic text-xs text-[#4B1020]">"{data.prefExpectations}"</div>}
          </div>
        </div>
      )}

      {/* Contact */}
      {hasContact && (
        <footer className="pt-3 border-t border-[#C7A36A] text-center text-xs">
          <span className="font-sans font-semibold text-[#4B1020] uppercase text-[11px] block mb-1">
            Contact for Proposals
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
