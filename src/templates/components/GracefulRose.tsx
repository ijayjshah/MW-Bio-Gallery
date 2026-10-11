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

export const GracefulRose: React.FC<TemplateProps> = ({ data, isThumbnail = false }) => {
  const age = calculateAge(data.dateOfBirth);
  const dobFormatted = formatDobDisplay(data.dateOfBirth);
  const hasGrandparents = hasGrandparentDetails(data);
  const hasSiblings = hasSiblingDetails(data);
  const hasPreferences = hasPartnerPreferences(data);
  const hasContact = hasContactDetails(data);

  return (
    <div
      className={`relative w-full bg-[#FAF6EF] text-[#292122] font-serif shadow-md border-2 border-[#671C32]/30 transition-all ${
        isThumbnail ? 'p-3 text-[8px] leading-tight select-none' : 'p-8 sm:p-12 text-sm leading-relaxed'
      }`}
      style={{ boxSizing: 'border-box' }}
    >
      {/* Rosebud Top Accent & Deity Invocation */}
      <div className="text-center mb-6">
        {data.showGodNameInPrint !== false && data.godName && (
          <div className="mb-2">
            <span className="text-xs sm:text-sm font-serif font-bold text-[#671C32] tracking-widest inline-block border-b border-[#671C32]/30 pb-0.5">
              ❀ {data.godName} ❀
            </span>
          </div>
        )}
        <div className="text-[#671C32] text-xl mb-1">❦ ❀ ❦</div>
        <h1 className="text-2xl sm:text-4xl font-serif text-[#671C32] font-semibold tracking-wide">
          {data.fullName || 'Candidate Name'}
        </h1>
        <div className="text-xs uppercase font-sans tracking-[0.2em] text-[#C7A36A] mt-1 font-bold">
          Marriage Biodata
        </div>
      </div>

      {/* Grid Overview */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-6 p-4 bg-[#F1E8DC]/50 rounded-2xl border border-[#E7DCD2]">
        <div className="shrink-0">
          {data.photoUrl ? (
            <img
              src={data.photoUrl}
              alt={data.fullName || 'Candidate'}
              referrerPolicy="no-referrer"
              className="w-24 h-32 sm:w-28 sm:h-36 object-cover rounded-xl border border-[#671C32] p-1 bg-white shadow-sm"
            />
          ) : (
            <div className="w-24 h-32 sm:w-28 sm:h-36 rounded-xl border border-[#671C32] p-1 bg-white flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-bold text-[#671C32]">{getInitials(data.fullName)}</span>
              <span className="text-[10px] text-[#786B6B] font-sans mt-1">Rose Grace</span>
            </div>
          )}
        </div>

        <div className="flex-1 w-full text-xs sm:text-sm">
          {data.aboutMe && <p className="italic text-[#671C32] mb-3">"{data.aboutMe}"</p>}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
            {dobFormatted && <div><span className="text-[#671C32] font-semibold">Born:</span> {dobFormatted} {age ? `(${age} yrs)` : ''}</div>}
            {data.height && <div><span className="text-[#671C32] font-semibold">Height:</span> {data.height}</div>}
            {data.currentCity && <div><span className="text-[#671C32] font-semibold">Location:</span> {data.currentCity}{data.currentState ? `, ${data.currentState}` : ''}</div>}
            {data.religion && <div><span className="text-[#671C32] font-semibold">Community:</span> {data.religion}{data.caste ? ` (${data.caste})` : ''}</div>}
            {data.motherTongue && <div><span className="text-[#671C32] font-semibold">Mother Tongue:</span> {data.motherTongue}</div>}
            {data.diet && <div><span className="text-[#671C32] font-semibold">Diet:</span> {data.diet}</div>}
          </div>
        </div>
      </div>

      {/* Education & Career */}
      {(data.highestQualification || data.profession) && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-[#671C32] border-b border-[#671C32]/30 pb-1 mb-2 flex items-center justify-between">
            <span>Academic & Professional Career</span>
            <span className="text-[#C7A36A]">❀</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
            {data.highestQualification && <div><strong>Degree:</strong> {data.highestQualification}</div>}
            {data.collegeUniversity && <div><strong>College:</strong> {data.collegeUniversity}</div>}
            {data.profession && <div><strong>Profession:</strong> {data.profession}</div>}
            {data.jobTitle && <div><strong>Designation:</strong> {data.jobTitle}</div>}
            {data.companyName && data.showCompanyInPrint && <div><strong>Organization:</strong> {data.companyName}</div>}
            {data.annualIncome && data.showIncomeInPrint && <div><strong>Income:</strong> {data.annualIncome}</div>}
          </div>
        </section>
      )}

      {/* Family Details */}
      {(data.fatherName || data.motherName || hasGrandparents || hasSiblings) && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-[#671C32] border-b border-[#671C32]/30 pb-1 mb-2 flex items-center justify-between">
            <span>Family Background</span>
            <span className="text-[#C7A36A]">❀</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
            {data.fatherName && <div><strong>Father:</strong> {data.fatherName} {data.fatherOccupation ? `(${data.fatherOccupation})` : ''}</div>}
            {data.motherName && <div><strong>Mother:</strong> {data.motherName} {data.motherOccupation ? `(${data.motherOccupation})` : ''}</div>}

            {hasGrandparents && (
              <div className="sm:col-span-2 pt-1 border-t border-[#E7DCD2] text-xs">
                <span className="text-[#671C32] font-bold block">Grandparents:</span>
                {(data.paternalGrandfather || data.paternalGrandmother) && <div>Paternal: {[data.paternalGrandfather, data.paternalGrandmother].filter(Boolean).join(' · ')}</div>}
                {(data.maternalGrandfather || data.maternalGrandmother) && <div>Maternal: {[data.maternalGrandfather, data.maternalGrandmother].filter(Boolean).join(' · ')}</div>}
              </div>
            )}

            {hasSiblings && (
              <div className="sm:col-span-2 pt-1 border-t border-[#E7DCD2] text-xs">
                <span className="text-[#671C32] font-bold block">Siblings:</span>
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
          <h2 className="text-sm font-semibold text-[#671C32] border-b border-[#671C32]/30 pb-1 mb-2 flex items-center justify-between">
            <span>Partner Expectations</span>
            <span className="text-[#C7A36A]">❀</span>
          </h2>
          <div className="text-xs sm:text-sm space-y-1">
            {[data.prefAgeRange ? `Age: ${data.prefAgeRange}` : null, data.prefEducation ? `Education: ${data.prefEducation}` : null, data.prefProfession ? `Profession: ${data.prefProfession}` : null].filter(Boolean).join(' • ')}
            {data.prefExpectations && <div className="italic text-[#671C32] mt-1">"{data.prefExpectations}"</div>}
          </div>
        </section>
      )}

      {/* Contact */}
      {hasContact && (
        <footer className="pt-3 border-t border-[#671C32]/40 text-center text-xs">
          <span className="font-sans font-bold text-[#671C32] uppercase text-[11px] block mb-1">
            Contact
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
