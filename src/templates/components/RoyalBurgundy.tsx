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

export const RoyalBurgundy: React.FC<TemplateProps> = ({ data, isThumbnail = false }) => {
  const age = calculateAge(data.dateOfBirth);
  const dobFormatted = formatDobDisplay(data.dateOfBirth);
  const hasGrandparents = hasGrandparentDetails(data);
  const hasSiblings = hasSiblingDetails(data);
  const hasPreferences = hasPartnerPreferences(data);
  const hasContact = hasContactDetails(data);

  return (
    <div
      className={`relative w-full bg-[#310914] text-[#FAF6EF] font-serif shadow-xl border-4 border-[#C7A36A] transition-all overflow-hidden ${
        isThumbnail ? 'p-3 text-[8px] leading-tight select-none' : 'p-8 sm:p-12 text-sm leading-relaxed'
      }`}
      style={{ boxSizing: 'border-box' }}
    >
      {/* Gold Inner Frame */}
      <div className="border border-[#C7A36A]/60 p-4 sm:p-8 relative">
        {/* Decorative corner medallions */}
        <div className="absolute -top-3 -left-3 w-6 h-6 border border-[#C7A36A] bg-[#4B1020] rotate-45 flex items-center justify-center">
          <div className="w-2 h-2 bg-[#C7A36A]"></div>
        </div>
        <div className="absolute -top-3 -right-3 w-6 h-6 border border-[#C7A36A] bg-[#4B1020] rotate-45 flex items-center justify-center">
          <div className="w-2 h-2 bg-[#C7A36A]"></div>
        </div>
        <div className="absolute -bottom-3 -left-3 w-6 h-6 border border-[#C7A36A] bg-[#4B1020] rotate-45 flex items-center justify-center">
          <div className="w-2 h-2 bg-[#C7A36A]"></div>
        </div>
        <div className="absolute -bottom-3 -right-3 w-6 h-6 border border-[#C7A36A] bg-[#4B1020] rotate-45 flex items-center justify-center">
          <div className="w-2 h-2 bg-[#C7A36A]"></div>
        </div>

        {/* Header Ribbon & Auspicious Deity Invocation */}
        <div className="text-center mb-6">
          {data.showGodNameInPrint !== false && data.godName && (
            <div className="mb-2">
              <span className="text-[#C7A36A] font-serif tracking-[0.25em] text-xs sm:text-sm font-bold uppercase inline-block border-b border-[#C7A36A]/50 pb-0.5">
                ✦ {data.godName} ✦
              </span>
            </div>
          )}
          <div className="inline-block px-4 py-1 border-y border-[#C7A36A] text-[#C7A36A] tracking-[0.25em] uppercase text-[11px] font-sans font-semibold mb-2">
            Royal Biodata
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-wide text-[#FAF6EF] font-serif">
            {data.fullName || 'Candidate Name'}
          </h1>
          <p className="text-xs sm:text-sm text-[#C7A36A] mt-1 font-sans tracking-wider">
            {[data.profession, data.highestQualification].filter(Boolean).join(' • ')}
          </p>
        </div>

        {/* Photo & Key Overview */}
        <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-[#4B1020]/70 border border-[#C7A36A]/40 mb-6">
          <div className="shrink-0">
            {data.photoUrl ? (
              <img
                src={data.photoUrl}
                alt={data.fullName || 'Candidate'}
                referrerPolicy="no-referrer"
                className="w-24 h-32 sm:w-28 sm:h-36 object-cover border-2 border-[#C7A36A] p-1 bg-[#310914]"
              />
            ) : (
              <div className="w-24 h-32 sm:w-28 sm:h-36 border-2 border-[#C7A36A] p-1 bg-[#310914] flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-bold text-[#C7A36A]">{getInitials(data.fullName)}</span>
                <span className="text-[10px] text-[#FAF6EF]/60 uppercase tracking-widest mt-1">Portrait</span>
              </div>
            )}
          </div>

          <div className="flex-1 w-full text-xs sm:text-sm">
            {data.aboutMe && (
              <p className="italic text-[#FAF6EF]/90 border-b border-[#C7A36A]/30 pb-2 mb-2">
                "{data.aboutMe}"
              </p>
            )}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              {dobFormatted && (
                <div>
                  <span className="text-[#C7A36A] font-sans">Birth Date:</span>{' '}
                  <span className="text-[#FAF6EF]">{dobFormatted} {age ? `(${age} yrs)` : ''}</span>
                </div>
              )}
              {data.height && (
                <div>
                  <span className="text-[#C7A36A] font-sans">Height:</span>{' '}
                  <span className="text-[#FAF6EF]">{data.height}</span>
                </div>
              )}
              {data.religion && (
                <div>
                  <span className="text-[#C7A36A] font-sans">Religion:</span>{' '}
                  <span className="text-[#FAF6EF]">{data.religion}{data.caste ? ` (${data.caste})` : ''}</span>
                </div>
              )}
              {data.currentCity && (
                <div>
                  <span className="text-[#C7A36A] font-sans">Current City:</span>{' '}
                  <span className="text-[#FAF6EF]">{data.currentCity}{data.currentState ? `, ${data.currentState}` : ''}</span>
                </div>
              )}
              {data.motherTongue && (
                <div>
                  <span className="text-[#C7A36A] font-sans">Mother Tongue:</span>{' '}
                  <span className="text-[#FAF6EF]">{data.motherTongue}</span>
                </div>
              )}
              {data.diet && (
                <div>
                  <span className="text-[#C7A36A] font-sans">Diet:</span>{' '}
                  <span className="text-[#FAF6EF]">{data.diet}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Education & Profession */}
        {(data.highestQualification || data.profession) && (
          <div className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#C7A36A] font-sans border-b border-[#C7A36A]/50 pb-1 mb-2">
              Academic & Professional Record
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs sm:text-sm">
              {data.highestQualification && (
                <div>
                  <span className="text-[#C7A36A] font-sans">Degree:</span> {data.highestQualification}
                </div>
              )}
              {data.collegeUniversity && (
                <div>
                  <span className="text-[#C7A36A] font-sans">University:</span> {data.collegeUniversity}
                </div>
              )}
              {data.profession && (
                <div>
                  <span className="text-[#C7A36A] font-sans">Profession:</span> {data.profession}
                </div>
              )}
              {data.jobTitle && (
                <div>
                  <span className="text-[#C7A36A] font-sans">Designation:</span> {data.jobTitle}
                </div>
              )}
              {data.companyName && data.showCompanyInPrint && (
                <div>
                  <span className="text-[#C7A36A] font-sans">Organization:</span> {data.companyName}
                </div>
              )}
              {data.annualIncome && data.showIncomeInPrint && (
                <div>
                  <span className="text-[#C7A36A] font-sans">Package:</span> {data.annualIncome}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Family Details */}
        {(data.fatherName || data.motherName || hasGrandparents || hasSiblings) && (
          <div className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#C7A36A] font-sans border-b border-[#C7A36A]/50 pb-1 mb-2">
              Noble Family Background
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm">
              {data.fatherName && (
                <div>
                  <span className="text-[#C7A36A] font-sans">Father:</span> {data.fatherName}{' '}
                  {data.fatherOccupation ? <span className="text-xs text-[#FAF6EF]/70">({data.fatherOccupation})</span> : ''}
                </div>
              )}
              {data.motherName && (
                <div>
                  <span className="text-[#C7A36A] font-sans">Mother:</span> {data.motherName}{' '}
                  {data.motherOccupation ? <span className="text-xs text-[#FAF6EF]/70">({data.motherOccupation})</span> : ''}
                </div>
              )}

              {hasGrandparents && (
                <div className="sm:col-span-2 pt-1 border-t border-[#C7A36A]/20">
                  <span className="text-[#C7A36A] font-sans block text-xs">Grandparents:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#FAF6EF]/85">
                    {(data.paternalGrandfather || data.paternalGrandmother) && (
                      <div>Paternal: {[data.paternalGrandfather, data.paternalGrandmother].filter(Boolean).join(' & ')}</div>
                    )}
                    {(data.maternalGrandfather || data.maternalGrandmother) && (
                      <div>Maternal: {[data.maternalGrandfather, data.maternalGrandmother].filter(Boolean).join(' & ')}</div>
                    )}
                  </div>
                </div>
              )}

              {hasSiblings && (
                <div className="sm:col-span-2 pt-1 border-t border-[#C7A36A]/20">
                  <span className="text-[#C7A36A] font-sans block text-xs">Siblings:</span>
                  <div className="space-y-1 text-xs">
                    {data.brothers?.map((b) => (
                      <div key={b.id}>Brother: {b.name} {b.occupation ? `· ${b.occupation}` : ''}</div>
                    ))}
                    {data.sisters?.map((s) => (
                      <div key={s.id}>Sister: {s.name} {s.occupation ? `· ${s.occupation}` : ''}</div>
                    ))}
                  </div>
                </div>
              )}

              {(data.familyType || data.nativePlace) && (
                <div className="sm:col-span-2 text-xs text-[#FAF6EF]/70">
                  {[data.familyType ? `Type: ${data.familyType}` : null, data.nativePlace ? `Native: ${data.nativePlace}` : null].filter(Boolean).join(' • ')}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Partner Preferences */}
        {hasPreferences && (
          <div className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#C7A36A] font-sans border-b border-[#C7A36A]/50 pb-1 mb-2">
              Partner Expectations
            </h2>
            <div className="text-xs sm:text-sm text-[#FAF6EF]/90 space-y-1">
              {[
                data.prefAgeRange ? `Age: ${data.prefAgeRange}` : null,
                data.prefHeightRange ? `Height: ${data.prefHeightRange}` : null,
                data.prefEducation ? `Education: ${data.prefEducation}` : null,
                data.prefProfession ? `Profession: ${data.prefProfession}` : null,
              ].filter(Boolean).join(' • ')}
              {data.prefExpectations && (
                <div className="italic text-xs text-[#C7A36A] mt-1">"{data.prefExpectations}"</div>
              )}
            </div>
          </div>
        )}

        {/* Contact Strip */}
        {hasContact && (
          <div className="mt-4 pt-3 border-t border-[#C7A36A] text-center text-xs text-[#FAF6EF]/90">
            <span className="text-[#C7A36A] uppercase font-sans tracking-wider text-[11px] block mb-1">
              Direct Contact
            </span>
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              {data.contactPersonName && <span>Contact: {data.contactPersonName}</span>}
              {data.contactPhone && <span>Phone: {data.contactPhone}</span>}
              {data.contactWhatsapp && <span>WhatsApp: {data.contactWhatsapp}</span>}
              {data.contactEmail && <span>Email: {data.contactEmail}</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
