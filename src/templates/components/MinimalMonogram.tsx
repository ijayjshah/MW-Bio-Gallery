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

export const MinimalMonogram: React.FC<TemplateProps> = ({ data, isThumbnail = false }) => {
  const age = calculateAge(data.dateOfBirth);
  const dobFormatted = formatDobDisplay(data.dateOfBirth);
  const hasGrandparents = hasGrandparentDetails(data);
  const hasSiblings = hasSiblingDetails(data);
  const hasPreferences = hasPartnerPreferences(data);
  const hasContact = hasContactDetails(data);
  const initials = getInitials(data.fullName);

  return (
    <div
      className={`relative w-full bg-[#FAF6EF] text-[#292122] font-serif shadow-md border border-[#E7DCD2] transition-all ${
        isThumbnail ? 'p-3 text-[8px] leading-tight select-none' : 'p-8 sm:p-12 text-sm leading-relaxed'
      }`}
      style={{ boxSizing: 'border-box' }}
    >
      {/* Centered Monogram Seal & Deity Invocation */}
      <div className="text-center mb-6">
        {data.showGodNameInPrint !== false && data.godName && (
          <div className="mb-3">
            <span className="text-xs sm:text-sm font-serif font-bold text-[#4B1020] tracking-widest uppercase inline-block border-b border-[#4B1020]/30 pb-0.5">
              ॥ {data.godName.replace(/[॥]/g, '').trim()} ॥
            </span>
          </div>
        )}
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#4B1020] bg-white text-[#4B1020] font-serif font-bold text-2xl sm:text-3xl shadow-sm mb-3">
          {initials}
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-normal tracking-wide text-[#4B1020]">
          {data.fullName || 'Candidate Name'}
        </h1>
        <div className="text-xs uppercase font-sans tracking-[0.25em] text-[#786B6B] mt-1">
          Personal Biodata
        </div>
        <div className="w-12 h-[1px] bg-[#4B1020] mx-auto mt-3"></div>
      </div>

      {/* Narrative & Photo */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 p-4 bg-white border border-[#E7DCD2]">
        <div className="shrink-0">
          {data.photoUrl ? (
            <img
              src={data.photoUrl}
              alt={data.fullName || 'Candidate'}
              referrerPolicy="no-referrer"
              className="w-20 h-28 sm:w-24 sm:h-32 object-cover border border-[#4B1020] p-1"
            />
          ) : (
            <div className="w-20 h-28 sm:w-24 sm:h-32 border border-[#4B1020] flex items-center justify-center bg-[#FAF6EF] text-[#4B1020] font-serif text-xl font-bold">
              {initials}
            </div>
          )}
        </div>

        <div className="flex-1 w-full text-xs sm:text-sm">
          {data.aboutMe && <p className="italic text-[#4B1020] mb-3">"{data.aboutMe}"</p>}
          <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 font-sans">
            {dobFormatted && <div><span className="text-[#786B6B]">Born:</span> <strong>{dobFormatted} {age ? `(${age} yrs)` : ''}</strong></div>}
            {data.height && <div><span className="text-[#786B6B]">Height:</span> <strong>{data.height}</strong></div>}
            {data.currentCity && <div><span className="text-[#786B6B]">Location:</span> <strong>{data.currentCity}{data.currentState ? `, ${data.currentState}` : ''}</strong></div>}
            {data.religion && <div><span className="text-[#786B6B]">Heritage:</span> <strong>{data.religion} {data.caste ? `(${data.caste})` : ''}</strong></div>}
            {data.motherTongue && <div><span className="text-[#786B6B]">Mother Tongue:</span> <strong>{data.motherTongue}</strong></div>}
            {data.diet && <div><span className="text-[#786B6B]">Diet:</span> <strong>{data.diet}</strong></div>}
          </div>
        </div>
      </div>

      {/* Education & Career */}
      {(data.highestQualification || data.profession) && (
        <section className="mb-6">
          <h2 className="text-xs uppercase font-sans tracking-[0.2em] font-bold text-[#4B1020] border-b border-[#E7DCD2] pb-1 mb-2">
            Education & Career
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm font-sans">
            {data.highestQualification && <div><span className="text-[#786B6B]">Degree:</span> <strong>{data.highestQualification}</strong></div>}
            {data.collegeUniversity && <div><span className="text-[#786B6B]">University:</span> {data.collegeUniversity}</div>}
            {data.profession && <div><span className="text-[#786B6B]">Profession:</span> <strong>{data.profession}</strong></div>}
            {data.jobTitle && <div><span className="text-[#786B6B]">Role:</span> {data.jobTitle}</div>}
            {data.companyName && data.showCompanyInPrint && <div><span className="text-[#786B6B]">Organization:</span> {data.companyName}</div>}
            {data.annualIncome && data.showIncomeInPrint && <div><span className="text-[#786B6B]">Income:</span> {data.annualIncome}</div>}
          </div>
        </section>
      )}

      {/* Family Lineage */}
      {(data.fatherName || data.motherName || hasGrandparents || hasSiblings) && (
        <section className="mb-6">
          <h2 className="text-xs uppercase font-sans tracking-[0.2em] font-bold text-[#4B1020] border-b border-[#E7DCD2] pb-1 mb-2">
            Family Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm font-sans">
            {data.fatherName && <div><span className="text-[#786B6B]">Father:</span> <strong>{data.fatherName}</strong> {data.fatherOccupation ? `(${data.fatherOccupation})` : ''}</div>}
            {data.motherName && <div><span className="text-[#786B6B]">Mother:</span> <strong>{data.motherName}</strong> {data.motherOccupation ? `(${data.motherOccupation})` : ''}</div>}

            {hasGrandparents && (
              <div className="sm:col-span-2 pt-1 border-t border-[#E7DCD2] text-xs">
                <span className="text-[#786B6B] block">Grandparents:</span>
                {(data.paternalGrandfather || data.paternalGrandmother) && <div>Paternal: {[data.paternalGrandfather, data.paternalGrandmother].filter(Boolean).join(' · ')}</div>}
                {(data.maternalGrandfather || data.maternalGrandmother) && <div>Maternal: {[data.maternalGrandfather, data.maternalGrandmother].filter(Boolean).join(' · ')}</div>}
              </div>
            )}

            {hasSiblings && (
              <div className="sm:col-span-2 pt-1 border-t border-[#E7DCD2] text-xs">
                <span className="text-[#786B6B] block">Siblings:</span>
                {data.brothers?.map(b => <div key={b.id}>Brother: <strong>{b.name}</strong> {b.occupation ? `· ${b.occupation}` : ''}</div>)}
                {data.sisters?.map(s => <div key={s.id}>Sister: <strong>{s.name}</strong> {s.occupation ? `· ${s.occupation}` : ''}</div>)}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Preferences */}
      {hasPreferences && (
        <section className="mb-6">
          <h2 className="text-xs uppercase font-sans tracking-[0.2em] font-bold text-[#4B1020] border-b border-[#E7DCD2] pb-1 mb-2">
            Partner Expectations
          </h2>
          <div className="text-xs sm:text-sm space-y-1 font-sans">
            {[data.prefAgeRange ? `Age: ${data.prefAgeRange}` : null, data.prefEducation ? `Education: ${data.prefEducation}` : null, data.prefProfession ? `Profession: ${data.prefProfession}` : null].filter(Boolean).join(' • ')}
            {data.prefExpectations && <div className="italic text-[#4B1020] mt-1 font-serif">"{data.prefExpectations}"</div>}
          </div>
        </section>
      )}

      {/* Contact */}
      {hasContact && (
        <footer className="pt-3 border-t border-[#4B1020] text-center text-xs font-sans text-[#786B6B]">
          <span className="uppercase text-[10px] tracking-wider font-bold text-[#4B1020] block mb-1">
            Correspondence
          </span>
          <div className="flex flex-wrap justify-center gap-4 text-xs">
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
