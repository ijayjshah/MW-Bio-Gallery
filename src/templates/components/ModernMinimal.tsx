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

export const ModernMinimal: React.FC<TemplateProps> = ({ data, isThumbnail = false }) => {
  const age = calculateAge(data.dateOfBirth);
  const dobFormatted = formatDobDisplay(data.dateOfBirth);
  const hasGrandparents = hasGrandparentDetails(data);
  const hasSiblings = hasSiblingDetails(data);
  const hasPreferences = hasPartnerPreferences(data);
  const hasContact = hasContactDetails(data);

  return (
    <div
      className={`relative w-full bg-white text-[#292122] font-sans shadow-md border border-[#E7DCD2] transition-all ${
        isThumbnail ? 'p-3 text-[8px] leading-tight select-none' : 'p-8 sm:p-12 text-sm leading-relaxed'
      }`}
      style={{ boxSizing: 'border-box' }}
    >
      {/* Auspicious Deity Header */}
      {data.showGodNameInPrint !== false && data.godName && (
        <div className="text-center pb-3 mb-4 border-b border-[#E7DCD2]">
          <span className="font-serif text-[#4B1020] text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold">
            {data.godName}
          </span>
        </div>
      )}

      {/* Top minimalist header bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-[#292122] pb-6 mb-8 gap-4">
        <div>
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#786B6B] block mb-1">
            Curated Biodata
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#292122]">
            {data.fullName || 'Candidate Name'}
          </h1>
          {(data.profession || data.highestQualification) && (
            <p className="text-[#4B1020] font-medium text-sm sm:text-base mt-1">
              {[data.profession, data.highestQualification].filter(Boolean).join(' · ')}
            </p>
          )}
        </div>

        {/* Profile photo or monogram */}
        <div className="shrink-0 self-start sm:self-auto">
          {data.photoUrl ? (
            <img
              src={data.photoUrl}
              alt={data.fullName || 'Candidate'}
              referrerPolicy="no-referrer"
              className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-none border border-[#292122]"
            />
          ) : (
            <div className="w-20 h-24 sm:w-24 sm:h-28 border border-[#292122] flex items-center justify-center bg-[#FAF6EF]">
              <span className="text-xl font-bold tracking-wider text-[#4B1020]">
                {getInitials(data.fullName)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Main 2-column minimalist layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Left Column: Personal Metrics */}
        <div className="space-y-6 md:border-r md:border-[#E7DCD2] md:pr-6">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#786B6B] mb-3">
              Overview
            </h2>
            <dl className="space-y-2 text-xs sm:text-sm">
              {dobFormatted && (
                <div>
                  <dt className="text-[#786B6B]">Born</dt>
                  <dd className="font-medium text-[#292122]">{dobFormatted} {age ? `(${age} yrs)` : ''}</dd>
                </div>
              )}
              {data.height && (
                <div>
                  <dt className="text-[#786B6B]">Height</dt>
                  <dd className="font-medium text-[#292122]">{data.height}</dd>
                </div>
              )}
              {data.currentCity && (
                <div>
                  <dt className="text-[#786B6B]">Residence</dt>
                  <dd className="font-medium text-[#292122]">{data.currentCity}{data.currentState ? `, ${data.currentState}` : ''}</dd>
                </div>
              )}
              {data.religion && (
                <div>
                  <dt className="text-[#786B6B]">Community</dt>
                  <dd className="font-medium text-[#292122]">{data.religion}{data.caste ? ` · ${data.caste}` : ''}</dd>
                </div>
              )}
              {data.motherTongue && (
                <div>
                  <dt className="text-[#786B6B]">Mother Tongue</dt>
                  <dd className="font-medium text-[#292122]">{data.motherTongue}</dd>
                </div>
              )}
              {data.diet && (
                <div>
                  <dt className="text-[#786B6B]">Diet</dt>
                  <dd className="font-medium text-[#292122]">{data.diet}</dd>
                </div>
              )}
              {data.languages && (
                <div>
                  <dt className="text-[#786B6B]">Languages</dt>
                  <dd className="font-medium text-[#292122]">{data.languages}</dd>
                </div>
              )}
            </dl>
          </div>

          {data.aboutMe && (
            <div className="pt-4 border-t border-[#E7DCD2]">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#786B6B] mb-2">
                Personal Note
              </h2>
              <p className="text-xs text-[#292122] leading-relaxed">
                {data.aboutMe}
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Career & Family */}
        <div className="md:col-span-2 space-y-6">
          {/* Career & Education */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#786B6B] mb-3">
              Career & Academics
            </h2>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between items-baseline border-b border-[#F1E8DC] pb-1">
                <span className="text-[#786B6B]">Highest Degree</span>
                <span className="font-semibold text-right">{data.highestQualification || '—'}</span>
              </div>
              {data.collegeUniversity && (
                <div className="flex justify-between items-baseline border-b border-[#F1E8DC] pb-1">
                  <span className="text-[#786B6B]">Institution</span>
                  <span className="text-right">{data.collegeUniversity}</span>
                </div>
              )}
              {data.jobTitle && (
                <div className="flex justify-between items-baseline border-b border-[#F1E8DC] pb-1">
                  <span className="text-[#786B6B]">Current Role</span>
                  <span className="font-semibold text-right">{data.jobTitle}</span>
                </div>
              )}
              {data.companyName && data.showCompanyInPrint && (
                <div className="flex justify-between items-baseline border-b border-[#F1E8DC] pb-1">
                  <span className="text-[#786B6B]">Company</span>
                  <span className="text-right">{data.companyName}</span>
                </div>
              )}
              {data.workLocation && (
                <div className="flex justify-between items-baseline border-b border-[#F1E8DC] pb-1">
                  <span className="text-[#786B6B]">Location</span>
                  <span className="text-right">{data.workLocation}</span>
                </div>
              )}
              {data.annualIncome && data.showIncomeInPrint && (
                <div className="flex justify-between items-baseline border-b border-[#F1E8DC] pb-1">
                  <span className="text-[#786B6B]">Compensation</span>
                  <span className="font-mono text-right">{data.annualIncome}</span>
                </div>
              )}
            </div>
          </div>

          {/* Family */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#786B6B] mb-3">
              Family Lineage
            </h2>
            <div className="space-y-3 text-xs sm:text-sm">
              {data.fatherName && (
                <div className="flex justify-between items-baseline border-b border-[#F1E8DC] pb-1">
                  <span className="text-[#786B6B]">Father</span>
                  <span className="text-right font-medium">{data.fatherName} {data.fatherOccupation ? `(${data.fatherOccupation})` : ''}</span>
                </div>
              )}
              {data.motherName && (
                <div className="flex justify-between items-baseline border-b border-[#F1E8DC] pb-1">
                  <span className="text-[#786B6B]">Mother</span>
                  <span className="text-right font-medium">{data.motherName} {data.motherOccupation ? `(${data.motherOccupation})` : ''}</span>
                </div>
              )}

              {hasGrandparents && (
                <div className="pt-2 text-xs">
                  <span className="text-[#786B6B] block mb-1">Grandparents</span>
                  {(data.paternalGrandfather || data.paternalGrandmother) && (
                    <div className="text-[#292122]">Paternal: {[data.paternalGrandfather, data.paternalGrandmother].filter(Boolean).join(' · ')}</div>
                  )}
                  {(data.maternalGrandfather || data.maternalGrandmother) && (
                    <div className="text-[#292122]">Maternal: {[data.maternalGrandfather, data.maternalGrandmother].filter(Boolean).join(' · ')}</div>
                  )}
                </div>
              )}

              {hasSiblings && (
                <div className="pt-2 text-xs">
                  <span className="text-[#786B6B] block mb-1">Siblings</span>
                  <div className="space-y-1">
                    {data.brothers?.map((b) => (
                      <div key={b.id} className="text-[#292122]">
                        Brother: <strong>{b.name}</strong> {b.occupation ? `— ${b.occupation}` : ''}
                      </div>
                    ))}
                    {data.sisters?.map((s) => (
                      <div key={s.id} className="text-[#292122]">
                        Sister: <strong>{s.name}</strong> {s.occupation ? `— ${s.occupation}` : ''}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(data.familyType || data.nativePlace) && (
                <div className="pt-2 text-xs flex gap-4 text-[#786B6B]">
                  {data.familyType && <span>Type: {data.familyType}</span>}
                  {data.nativePlace && <span>Native: {data.nativePlace}</span>}
                </div>
              )}
            </div>
          </div>

          {/* Preferences */}
          {hasPreferences && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#786B6B] mb-2">
                Preferences
              </h2>
              <div className="text-xs text-[#292122] space-y-1 bg-[#FAF6EF] p-3 rounded-none">
                {data.prefAgeRange && <div>Age: {data.prefAgeRange}</div>}
                {data.prefEducation && <div>Education: {data.prefEducation}</div>}
                {data.prefProfession && <div>Profession: {data.prefProfession}</div>}
                {data.prefExpectations && <div className="italic mt-1 text-[#786B6B]">"{data.prefExpectations}"</div>}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contact Minimal Footer */}
      {hasContact && (
        <div className="border-t border-[#292122] pt-4 flex flex-wrap justify-between items-center text-xs text-[#786B6B]">
          <span className="font-semibold text-[#292122]">
            {data.contactPersonName ? `Contact: ${data.contactPersonName}` : 'Contact Details'}
          </span>
          <div className="flex gap-4">
            {data.contactPhone && <span>Tel: {data.contactPhone}</span>}
            {data.contactWhatsapp && <span>WA: {data.contactWhatsapp}</span>}
            {data.contactEmail && <span>{data.contactEmail}</span>}
          </div>
        </div>
      )}
    </div>
  );
};
