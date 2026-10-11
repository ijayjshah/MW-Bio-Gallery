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

export const FormalProfessional: React.FC<TemplateProps> = ({ data, isThumbnail = false }) => {
  const age = calculateAge(data.dateOfBirth);
  const dobFormatted = formatDobDisplay(data.dateOfBirth);
  const hasGrandparents = hasGrandparentDetails(data);
  const hasSiblings = hasSiblingDetails(data);
  const hasPreferences = hasPartnerPreferences(data);
  const hasContact = hasContactDetails(data);

  return (
    <div
      className={`relative w-full bg-white text-[#292122] font-sans shadow-md border-t-4 border-[#4B1020] transition-all ${
        isThumbnail ? 'p-3 text-[8px] leading-tight select-none' : 'p-8 sm:p-12 text-sm leading-relaxed'
      }`}
      style={{ boxSizing: 'border-box' }}
    >
      {/* Auspicious Deity Invocation */}
      {data.showGodNameInPrint !== false && data.godName && (
        <div className="text-center pb-3 mb-4 border-b border-[#E7DCD2]">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-[#4B1020] uppercase font-sans">
            ॥ {data.godName.replace(/[॥]/g, '').trim()} ॥
          </span>
        </div>
      )}

      {/* Executive Clean Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#E7DCD2] pb-6 mb-6 gap-4">
        <div>
          <span className="text-[11px] font-bold tracking-widest text-[#786B6B] uppercase block">
            Curriculum Vitae / Marriage Biodata
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#4B1020]">
            {data.fullName || 'Candidate Name'}
          </h1>
          <p className="text-xs sm:text-sm font-medium text-[#292122] mt-0.5">
            {[data.profession, data.highestQualification, data.currentCity].filter(Boolean).join(' • ')}
          </p>
        </div>

        <div className="shrink-0">
          {data.photoUrl ? (
            <img
              src={data.photoUrl}
              alt={data.fullName || 'Candidate'}
              referrerPolicy="no-referrer"
              className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded border border-[#E7DCD2] shadow-sm"
            />
          ) : (
            <div className="w-20 h-24 sm:w-24 sm:h-28 rounded border border-[#E7DCD2] bg-[#FAF6EF] flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-[#4B1020]">{getInitials(data.fullName)}</span>
              <span className="text-[9px] uppercase tracking-wider text-[#786B6B]">Candidate</span>
            </div>
          )}
        </div>
      </div>

      {data.aboutMe && (
        <div className="bg-[#FAF6EF] p-3 rounded border-l-2 border-[#4B1020] mb-6 text-xs sm:text-sm text-[#292122]">
          <span className="font-bold text-[#4B1020] block mb-0.5">Executive Summary</span>
          {data.aboutMe}
        </div>
      )}

      {/* Structured Sections */}
      <div className="space-y-6">
        {/* Personal Details Table */}
        <section>
          <h2 className="text-xs uppercase font-bold tracking-wider text-[#4B1020] bg-[#FAF6EF] px-3 py-1.5 border border-[#E7DCD2] mb-3">
            1. Personal Demographics
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4 text-xs sm:text-sm px-1">
            {dobFormatted && <div><span className="text-[#786B6B] block text-xs">Date of Birth</span> <span className="font-semibold">{dobFormatted} {age ? `(${age} yrs)` : ''}</span></div>}
            {data.height && <div><span className="text-[#786B6B] block text-xs">Height</span> <span className="font-semibold">{data.height}</span></div>}
            {data.religion && <div><span className="text-[#786B6B] block text-xs">Community</span> <span className="font-semibold">{data.religion}{data.caste ? ` (${data.caste})` : ''}</span></div>}
            {data.motherTongue && <div><span className="text-[#786B6B] block text-xs">Mother Tongue</span> <span className="font-semibold">{data.motherTongue}</span></div>}
            {data.currentCity && <div><span className="text-[#786B6B] block text-xs">Residence</span> <span className="font-semibold">{data.currentCity}{data.currentState ? `, ${data.currentState}` : ''}</span></div>}
            {data.diet && <div><span className="text-[#786B6B] block text-xs">Diet</span> <span className="font-semibold">{data.diet}</span></div>}
          </div>
        </section>

        {/* Education & Employment */}
        {(data.highestQualification || data.profession) && (
          <section>
            <h2 className="text-xs uppercase font-bold tracking-wider text-[#4B1020] bg-[#FAF6EF] px-3 py-1.5 border border-[#E7DCD2] mb-3">
              2. Academic & Corporate Credentials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-xs sm:text-sm px-1">
              {data.highestQualification && <div><span className="text-[#786B6B] block text-xs">Highest Degree</span> <span className="font-semibold">{data.highestQualification}</span></div>}
              {data.collegeUniversity && <div><span className="text-[#786B6B] block text-xs">University / Institute</span> <span>{data.collegeUniversity}</span></div>}
              {data.jobTitle && <div><span className="text-[#786B6B] block text-xs">Current Designation</span> <span className="font-semibold">{data.jobTitle}</span></div>}
              {data.companyName && data.showCompanyInPrint && <div><span className="text-[#786B6B] block text-xs">Organization</span> <span>{data.companyName}</span></div>}
              {data.workLocation && <div><span className="text-[#786B6B] block text-xs">Work Location</span> <span>{data.workLocation}</span></div>}
              {data.annualIncome && data.showIncomeInPrint && <div><span className="text-[#786B6B] block text-xs">Annual Compensation</span> <span className="font-mono font-semibold">{data.annualIncome}</span></div>}
            </div>
          </section>
        )}

        {/* Family Background */}
        {(data.fatherName || data.motherName || hasGrandparents || hasSiblings) && (
          <section>
            <h2 className="text-xs uppercase font-bold tracking-wider text-[#4B1020] bg-[#FAF6EF] px-3 py-1.5 border border-[#E7DCD2] mb-3">
              3. Family Details
            </h2>
            <div className="space-y-2 text-xs sm:text-sm px-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {data.fatherName && <div><span className="text-[#786B6B]">Father:</span> <span className="font-semibold">{data.fatherName}</span> {data.fatherOccupation ? `(${data.fatherOccupation})` : ''}</div>}
                {data.motherName && <div><span className="text-[#786B6B]">Mother:</span> <span className="font-semibold">{data.motherName}</span> {data.motherOccupation ? `(${data.motherOccupation})` : ''}</div>}
              </div>

              {hasGrandparents && (
                <div className="pt-1 text-xs border-t border-[#E7DCD2]">
                  <span className="text-[#786B6B] font-semibold block">Grandparents:</span>
                  {(data.paternalGrandfather || data.paternalGrandmother) && <div>Paternal: {[data.paternalGrandfather, data.paternalGrandmother].filter(Boolean).join(' · ')}</div>}
                  {(data.maternalGrandfather || data.maternalGrandmother) && <div>Maternal: {[data.maternalGrandfather, data.maternalGrandmother].filter(Boolean).join(' · ')}</div>}
                </div>
              )}

              {hasSiblings && (
                <div className="pt-1 text-xs border-t border-[#E7DCD2]">
                  <span className="text-[#786B6B] font-semibold block">Siblings:</span>
                  {data.brothers?.map(b => <div key={b.id}>Brother: <span className="font-semibold">{b.name}</span> {b.occupation ? `(${b.occupation})` : ''}</div>)}
                  {data.sisters?.map(s => <div key={s.id}>Sister: <span className="font-semibold">{s.name}</span> {s.occupation ? `(${s.occupation})` : ''}</div>)}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Preferences */}
        {hasPreferences && (
          <section>
            <h2 className="text-xs uppercase font-bold tracking-wider text-[#4B1020] bg-[#FAF6EF] px-3 py-1.5 border border-[#E7DCD2] mb-2">
              4. Partner Preferences
            </h2>
            <div className="text-xs sm:text-sm px-1 space-y-1">
              {[data.prefAgeRange ? `Age: ${data.prefAgeRange}` : null, data.prefEducation ? `Education: ${data.prefEducation}` : null, data.prefProfession ? `Profession: ${data.prefProfession}` : null].filter(Boolean).join(' • ')}
              {data.prefExpectations && <div className="italic text-xs text-[#786B6B] mt-1">"{data.prefExpectations}"</div>}
            </div>
          </section>
        )}
      </div>

      {/* Contact Footer */}
      {hasContact && (
        <footer className="mt-6 pt-4 border-t border-[#E7DCD2] flex flex-wrap justify-between items-center text-xs text-[#786B6B]">
          <span className="font-bold text-[#4B1020]">
            {data.contactPersonName ? `Contact Point: ${data.contactPersonName}` : 'Correspondence Details'}
          </span>
          <div className="flex gap-4">
            {data.contactPhone && <span>Phone: <strong className="text-[#292122]">{data.contactPhone}</strong></span>}
            {data.contactWhatsapp && <span>WA: <strong className="text-[#292122]">{data.contactWhatsapp}</strong></span>}
            {data.contactEmail && <span>Email: <strong className="text-[#292122]">{data.contactEmail}</strong></span>}
          </div>
        </footer>
      )}
    </div>
  );
};
