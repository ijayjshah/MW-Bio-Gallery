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

export const ContemporaryPortrait: React.FC<TemplateProps> = ({ data, isThumbnail = false }) => {
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
      {/* Auspicious Deity Invocation */}
      {data.showGodNameInPrint !== false && data.godName && (
        <div className="text-center pb-3 mb-4 border-b border-[#E7DCD2]">
          <span className="text-xs sm:text-sm font-serif font-semibold text-[#4B1020] tracking-widest uppercase">
            ✦ {data.godName} ✦
          </span>
        </div>
      )}

      {/* Top Banner with Prominent Hero Portrait Frame */}
      <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-[#FAF6EF] border border-[#E7DCD2] mb-8">
        <div className="shrink-0">
          {data.photoUrl ? (
            <img
              src={data.photoUrl}
              alt={data.fullName || 'Candidate'}
              referrerPolicy="no-referrer"
              className="w-28 h-36 sm:w-32 sm:h-40 object-cover rounded-lg shadow-md border-2 border-[#4B1020]"
            />
          ) : (
            <div className="w-28 h-36 sm:w-32 sm:h-40 rounded-lg shadow-md border-2 border-[#4B1020] bg-white flex flex-col items-center justify-center">
              <span className="text-3xl font-serif text-[#4B1020] font-bold">{getInitials(data.fullName)}</span>
              <span className="text-[10px] uppercase font-sans tracking-wider text-[#786B6B] mt-1">Portrait Focus</span>
            </div>
          )}
        </div>

        <div className="flex-1 text-center sm:text-left">
          <span className="text-[11px] uppercase tracking-widest text-[#C7A36A] font-bold block mb-1">
            Personal Profile
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#4B1020]">
            {data.fullName || 'Candidate Name'}
          </h1>
          <p className="text-xs sm:text-sm text-[#786B6B] font-medium mt-1">
            {[data.profession, data.currentCity].filter(Boolean).join(' • ')}
          </p>
          {data.aboutMe && (
            <p className="mt-3 text-xs sm:text-sm italic text-[#292122]/90 border-t border-[#E7DCD2] pt-2">
              "{data.aboutMe}"
            </p>
          )}
        </div>
      </div>

      {/* 2-Column Balanced Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Left Column: Personal Attributes & Academics */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xs uppercase tracking-wider font-bold text-[#4B1020] pb-1 border-b border-[#E7DCD2] mb-3">
              Personal Metrics
            </h2>
            <dl className="grid grid-cols-2 gap-y-2 text-xs sm:text-sm">
              {dobFormatted && (
                <div>
                  <dt className="text-[#786B6B]">Date of Birth</dt>
                  <dd className="font-semibold">{dobFormatted} {age ? `(${age} yrs)` : ''}</dd>
                </div>
              )}
              {data.height && (
                <div>
                  <dt className="text-[#786B6B]">Height</dt>
                  <dd className="font-semibold">{data.height}</dd>
                </div>
              )}
              {data.religion && (
                <div>
                  <dt className="text-[#786B6B]">Religion / Caste</dt>
                  <dd className="font-semibold">{data.religion} {data.caste ? `(${data.caste})` : ''}</dd>
                </div>
              )}
              {data.motherTongue && (
                <div>
                  <dt className="text-[#786B6B]">Mother Tongue</dt>
                  <dd className="font-semibold">{data.motherTongue}</dd>
                </div>
              )}
              {data.diet && (
                <div>
                  <dt className="text-[#786B6B]">Diet</dt>
                  <dd className="font-semibold">{data.diet}</dd>
                </div>
              )}
              {data.maritalStatus && (
                <div>
                  <dt className="text-[#786B6B]">Marital Status</dt>
                  <dd className="font-semibold">{data.maritalStatus}</dd>
                </div>
              )}
            </dl>
          </div>

          {(data.highestQualification || data.profession) && (
            <div>
              <h2 className="text-xs uppercase tracking-wider font-bold text-[#4B1020] pb-1 border-b border-[#E7DCD2] mb-3">
                Career & Education
              </h2>
              <div className="space-y-2 text-xs sm:text-sm">
                {data.highestQualification && (
                  <div>
                    <span className="text-[#786B6B]">Highest Degree:</span>{' '}
                    <span className="font-semibold">{data.highestQualification}</span>
                    {data.collegeUniversity && <span className="block text-xs text-[#786B6B]">{data.collegeUniversity}</span>}
                  </div>
                )}
                {data.jobTitle && (
                  <div>
                    <span className="text-[#786B6B]">Role:</span>{' '}
                    <span className="font-semibold">{data.jobTitle}</span>
                    {data.companyName && data.showCompanyInPrint && <span> ({data.companyName})</span>}
                  </div>
                )}
                {data.annualIncome && data.showIncomeInPrint && (
                  <div>
                    <span className="text-[#786B6B]">Income:</span>{' '}
                    <span className="font-semibold">{data.annualIncome}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Family & Partner Expectations */}
        <div className="space-y-6">
          {(data.fatherName || data.motherName || hasGrandparents || hasSiblings) && (
            <div>
              <h2 className="text-xs uppercase tracking-wider font-bold text-[#4B1020] pb-1 border-b border-[#E7DCD2] mb-3">
                Family Background
              </h2>
              <div className="space-y-2 text-xs sm:text-sm">
                {data.fatherName && (
                  <div>
                    <span className="text-[#786B6B]">Father:</span>{' '}
                    <span className="font-semibold">{data.fatherName}</span> {data.fatherOccupation ? `(${data.fatherOccupation})` : ''}
                  </div>
                )}
                {data.motherName && (
                  <div>
                    <span className="text-[#786B6B]">Mother:</span>{' '}
                    <span className="font-semibold">{data.motherName}</span> {data.motherOccupation ? `(${data.motherOccupation})` : ''}
                  </div>
                )}

                {hasGrandparents && (
                  <div className="pt-1 text-xs border-t border-[#E7DCD2]">
                    <span className="text-[#786B6B] block">Grandparents:</span>
                    {(data.paternalGrandfather || data.paternalGrandmother) && <div>Paternal: {[data.paternalGrandfather, data.paternalGrandmother].filter(Boolean).join(' · ')}</div>}
                    {(data.maternalGrandfather || data.maternalGrandmother) && <div>Maternal: {[data.maternalGrandfather, data.maternalGrandmother].filter(Boolean).join(' · ')}</div>}
                  </div>
                )}

                {hasSiblings && (
                  <div className="pt-1 text-xs border-t border-[#E7DCD2]">
                    <span className="text-[#786B6B] block">Siblings:</span>
                    {data.brothers?.map(b => <div key={b.id}>Brother: {b.name} {b.occupation ? `· ${b.occupation}` : ''}</div>)}
                    {data.sisters?.map(s => <div key={s.id}>Sister: {s.name} {s.occupation ? `· ${s.occupation}` : ''}</div>)}
                  </div>
                )}
              </div>
            </div>
          )}

          {hasPreferences && (
            <div>
              <h2 className="text-xs uppercase tracking-wider font-bold text-[#4B1020] pb-1 border-b border-[#E7DCD2] mb-3">
                Expectations
              </h2>
              <div className="text-xs sm:text-sm space-y-1">
                {[data.prefAgeRange ? `Age: ${data.prefAgeRange}` : null, data.prefEducation ? `Education: ${data.prefEducation}` : null, data.prefProfession ? `Profession: ${data.prefProfession}` : null].filter(Boolean).join(' • ')}
                {data.prefExpectations && <div className="italic text-xs text-[#786B6B] mt-1">"{data.prefExpectations}"</div>}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contact Bar */}
      {hasContact && (
        <footer className="border-t border-[#E7DCD2] pt-4 flex flex-wrap justify-between items-center text-xs text-[#786B6B]">
          <span className="font-semibold text-[#4B1020]">
            {data.contactPersonName ? `Contact: ${data.contactPersonName}` : 'Contact Information'}
          </span>
          <div className="flex gap-4">
            {data.contactPhone && <span>Tel: {data.contactPhone}</span>}
            {data.contactWhatsapp && <span>WA: {data.contactWhatsapp}</span>}
            {data.contactEmail && <span>{data.contactEmail}</span>}
          </div>
        </footer>
      )}
    </div>
  );
};
