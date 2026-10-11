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

export const ClassicElegance: React.FC<TemplateProps> = ({ data, isThumbnail = false }) => {
  const age = calculateAge(data.dateOfBirth);
  const dobFormatted = formatDobDisplay(data.dateOfBirth);
  const hasGrandparents = hasGrandparentDetails(data);
  const hasSiblings = hasSiblingDetails(data);
  const hasPreferences = hasPartnerPreferences(data);
  const hasContact = hasContactDetails(data);

  return (
    <div
      className={`relative w-full bg-[#FAF6EF] text-[#292122] font-serif shadow-md transition-all ${
        isThumbnail ? 'p-3 text-[8px] leading-tight select-none' : 'p-8 sm:p-12 text-sm sm:text-base leading-relaxed'
      }`}
      style={{ boxSizing: 'border-box' }}
    >
      {/* Double Ornamental Gold Border */}
      <div className="border-2 border-[#C7A36A] p-2 relative h-full">
        <div className="border border-[#C7A36A]/60 p-4 sm:p-6 relative h-full">
          {/* Corner Flourishes */}
          <div className="absolute top-1 left-1 text-[#C7A36A] text-xs">✤</div>
          <div className="absolute top-1 right-1 text-[#C7A36A] text-xs">✤</div>
          <div className="absolute bottom-1 left-1 text-[#C7A36A] text-xs">✤</div>
          <div className="absolute bottom-1 right-1 text-[#C7A36A] text-xs">✤</div>

          {/* Auspicious Deity Invocation */}
          {data.showGodNameInPrint !== false && data.godName && (
            <div className="text-center mb-3">
              <span className="font-serif text-[#C7A36A] text-xs sm:text-sm font-semibold tracking-widest px-4 py-0.5 border-b border-[#C7A36A]/40 inline-block">
                {data.godName}
              </span>
            </div>
          )}

          {/* Header */}
          <header className="text-center mb-6">
            <div className="text-[#671C32] text-xs sm:text-sm tracking-[0.25em] uppercase mb-1 font-sans font-semibold">
              ✦ Marriage Biodata ✦
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#4B1020] tracking-wide font-serif">
              {data.fullName || 'Full Name'}
            </h1>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="h-[1px] w-12 bg-[#C7A36A]"></span>
              <span className="text-[#C7A36A] text-xs">❦</span>
              <span className="h-[1px] w-12 bg-[#C7A36A]"></span>
            </div>
          </header>

          {/* Photo & Key Intro */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6 pb-6 border-b border-[#E7DCD2]">
            <div className="shrink-0">
              {data.photoUrl ? (
                <img
                  src={data.photoUrl}
                  alt={data.fullName || 'Candidate'}
                  referrerPolicy="no-referrer"
                  className="w-24 h-32 sm:w-28 sm:h-36 object-cover rounded-sm border-2 border-[#C7A36A] p-1 bg-white shadow-sm"
                />
              ) : (
                <div className="w-24 h-32 sm:w-28 sm:h-36 flex flex-col items-center justify-center border-2 border-[#C7A36A] p-1 bg-white shadow-sm text-center">
                  <span className="text-2xl text-[#4B1020] font-bold">{getInitials(data.fullName)}</span>
                  <span className="text-[10px] text-[#786B6B] mt-1 font-sans uppercase tracking-wider">Portrait</span>
                </div>
              )}
            </div>

            <div className="flex-1 text-center sm:text-left">
              {data.aboutMe && (
                <p className="italic text-[#4B1020]/90 mb-3 text-sm leading-relaxed">
                  "{data.aboutMe}"
                </p>
              )}
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs sm:text-sm">
                {dobFormatted && (
                  <div>
                    <span className="text-[#786B6B] font-sans">Date of Birth:</span>{' '}
                    <span className="font-semibold">{dobFormatted} {age ? `(${age} yrs)` : ''}</span>
                  </div>
                )}
                {data.height && (
                  <div>
                    <span className="text-[#786B6B] font-sans">Height:</span>{' '}
                    <span className="font-semibold">{data.height}</span>
                  </div>
                )}
                {data.currentCity && (
                  <div>
                    <span className="text-[#786B6B] font-sans">Location:</span>{' '}
                    <span className="font-semibold">{data.currentCity}{data.currentState ? `, ${data.currentState}` : ''}</span>
                  </div>
                )}
                {data.religion && (
                  <div>
                    <span className="text-[#786B6B] font-sans">Religion & Caste:</span>{' '}
                    <span className="font-semibold">{data.religion}{data.caste ? ` (${data.caste})` : ''}</span>
                  </div>
                )}
                {data.motherTongue && (
                  <div>
                    <span className="text-[#786B6B] font-sans">Mother Tongue:</span>{' '}
                    <span className="font-semibold">{data.motherTongue}</span>
                  </div>
                )}
                {data.maritalStatus && (
                  <div>
                    <span className="text-[#786B6B] font-sans">Marital Status:</span>{' '}
                    <span className="font-semibold">{data.maritalStatus}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Personal & Lifestyle Information */}
          {(data.diet || data.lifestyle || data.languages || data.hobbies) && (
            <section className="mb-6">
              <h2 className="text-base sm:text-lg font-bold text-[#4B1020] pb-1 border-b border-[#C7A36A]/50 flex items-center gap-2">
                <span>Personal Attributes</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 mt-2 text-xs sm:text-sm">
                {data.languages && (
                  <div>
                    <span className="text-[#786B6B] font-sans">Languages Known:</span>{' '}
                    <span>{data.languages}</span>
                  </div>
                )}
                {data.diet && (
                  <div>
                    <span className="text-[#786B6B] font-sans">Dietary Habits:</span>{' '}
                    <span>{data.diet}</span>
                  </div>
                )}
                {data.lifestyle && (
                  <div className="sm:col-span-2">
                    <span className="text-[#786B6B] font-sans">Lifestyle:</span>{' '}
                    <span>{data.lifestyle}</span>
                  </div>
                )}
                {data.hobbies && (
                  <div className="sm:col-span-2">
                    <span className="text-[#786B6B] font-sans">Interests & Hobbies:</span>{' '}
                    <span>{data.hobbies}</span>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Education & Career */}
          {(data.highestQualification || data.profession || data.jobTitle) && (
            <section className="mb-6">
              <h2 className="text-base sm:text-lg font-bold text-[#4B1020] pb-1 border-b border-[#C7A36A]/50">
                Education & Career
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 mt-2 text-xs sm:text-sm">
                {data.highestQualification && (
                  <div>
                    <span className="text-[#786B6B] font-sans">Highest Education:</span>{' '}
                    <span className="font-semibold">{data.highestQualification}</span>
                  </div>
                )}
                {data.collegeUniversity && (
                  <div>
                    <span className="text-[#786B6B] font-sans">University / Institute:</span>{' '}
                    <span>{data.collegeUniversity}</span>
                  </div>
                )}
                {data.profession && (
                  <div>
                    <span className="text-[#786B6B] font-sans">Profession:</span>{' '}
                    <span className="font-semibold">{data.profession}</span>
                  </div>
                )}
                {data.jobTitle && (
                  <div>
                    <span className="text-[#786B6B] font-sans">Designation:</span>{' '}
                    <span>{data.jobTitle}</span>
                  </div>
                )}
                {data.companyName && data.showCompanyInPrint && (
                  <div>
                    <span className="text-[#786B6B] font-sans">Organization:</span>{' '}
                    <span>{data.companyName}</span>
                  </div>
                )}
                {data.workLocation && (
                  <div>
                    <span className="text-[#786B6B] font-sans">Work Location:</span>{' '}
                    <span>{data.workLocation}</span>
                  </div>
                )}
                {data.annualIncome && data.showIncomeInPrint && (
                  <div>
                    <span className="text-[#786B6B] font-sans">Annual Income:</span>{' '}
                    <span>{data.annualIncome}</span>
                  </div>
                )}
              </div>
              {data.careerAbout && (
                <p className="mt-2 text-xs sm:text-sm text-[#4B1020]/90">
                  {data.careerAbout}
                </p>
              )}
            </section>
          )}

          {/* Family Background */}
          {(data.fatherName || data.motherName || hasGrandparents || hasSiblings) && (
            <section className="mb-6">
              <h2 className="text-base sm:text-lg font-bold text-[#4B1020] pb-1 border-b border-[#C7A36A]/50">
                Family Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 text-xs sm:text-sm">
                {data.fatherName && (
                  <div>
                    <span className="text-[#786B6B] font-sans">Father:</span>{' '}
                    <span className="font-semibold">{data.fatherName}</span>
                    {data.fatherOccupation && <span className="block text-xs text-[#786B6B]">({data.fatherOccupation})</span>}
                  </div>
                )}
                {data.motherName && (
                  <div>
                    <span className="text-[#786B6B] font-sans">Mother:</span>{' '}
                    <span className="font-semibold">{data.motherName}</span>
                    {data.motherOccupation && <span className="block text-xs text-[#786B6B]">({data.motherOccupation})</span>}
                  </div>
                )}

                {/* Grandparents */}
                {hasGrandparents && (
                  <div className="sm:col-span-2 pt-1 border-t border-[#E7DCD2]/70">
                    <span className="text-xs uppercase tracking-wider text-[#C7A36A] font-bold font-sans block mb-1">
                      Grandparents
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {(data.paternalGrandfather || data.paternalGrandmother) && (
                        <div>
                          <span className="text-[#786B6B] font-sans">Paternal:</span>{' '}
                          {[data.paternalGrandfather, data.paternalGrandmother].filter(Boolean).join(' & ')}
                        </div>
                      )}
                      {(data.maternalGrandfather || data.maternalGrandmother) && (
                        <div>
                          <span className="text-[#786B6B] font-sans">Maternal:</span>{' '}
                          {[data.maternalGrandfather, data.maternalGrandmother].filter(Boolean).join(' & ')}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Siblings */}
                {hasSiblings && (
                  <div className="sm:col-span-2 pt-1 border-t border-[#E7DCD2]/70">
                    <span className="text-xs uppercase tracking-wider text-[#C7A36A] font-bold font-sans block mb-1">
                      Siblings
                    </span>
                    <div className="space-y-1.5 text-xs sm:text-sm">
                      {data.brothers?.map((b) => (
                        <div key={b.id} className="flex flex-wrap gap-x-2">
                          <span className="font-semibold">Brother: {b.name}</span>
                          {b.maritalStatus && <span className="text-[#786B6B]">({b.maritalStatus})</span>}
                          {b.occupation && <span>· {b.occupation}</span>}
                        </div>
                      ))}
                      {data.sisters?.map((s) => (
                        <div key={s.id} className="flex flex-wrap gap-x-2">
                          <span className="font-semibold">Sister: {s.name}</span>
                          {s.maritalStatus && <span className="text-[#786B6B]">({s.maritalStatus})</span>}
                          {s.occupation && <span>· {s.occupation}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Family Notes */}
                {(data.familyType || data.nativePlace || data.familyValues) && (
                  <div className="sm:col-span-2 pt-1 text-xs">
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[#786B6B] font-sans">
                      {data.familyType && <span>Family Type: <strong className="text-[#292122]">{data.familyType}</strong></span>}
                      {data.nativePlace && <span>Native Place: <strong className="text-[#292122]">{data.nativePlace}</strong></span>}
                      {data.familyValues && <span>Values: <strong className="text-[#292122]">{data.familyValues}</strong></span>}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Partner Preferences */}
          {hasPreferences && (
            <section className="mb-6">
              <h2 className="text-base sm:text-lg font-bold text-[#4B1020] pb-1 border-b border-[#C7A36A]/50">
                Partner Expectations
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 mt-2 text-xs sm:text-sm">
                {data.prefAgeRange && (
                  <div>
                    <span className="text-[#786B6B] font-sans">Age:</span> {data.prefAgeRange}
                  </div>
                )}
                {data.prefHeightRange && (
                  <div>
                    <span className="text-[#786B6B] font-sans">Height:</span> {data.prefHeightRange}
                  </div>
                )}
                {data.prefEducation && (
                  <div>
                    <span className="text-[#786B6B] font-sans">Education:</span> {data.prefEducation}
                  </div>
                )}
                {data.prefProfession && (
                  <div>
                    <span className="text-[#786B6B] font-sans">Profession:</span> {data.prefProfession}
                  </div>
                )}
                {data.prefExpectations && (
                  <div className="sm:col-span-2 mt-1 italic text-xs text-[#4B1020]/90">
                    "{data.prefExpectations}"
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Contact Details */}
          {hasContact && (
            <footer className="pt-4 border-t border-[#C7A36A]/60 text-xs sm:text-sm">
              <div className="text-center font-bold text-[#4B1020] uppercase tracking-wider text-xs font-sans mb-2">
                Contact & Correspondence
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 text-center text-xs">
                {data.contactPersonName && (
                  <span>
                    <strong>{data.contactPersonName}</strong>
                    {data.contactRelation ? ` (${data.contactRelation})` : ''}
                  </span>
                )}
                {data.contactPhone && (
                  <span>Phone: <strong>{data.contactPhone}</strong></span>
                )}
                {data.contactWhatsapp && (
                  <span>WhatsApp: <strong>{data.contactWhatsapp}</strong></span>
                )}
                {data.contactEmail && (
                  <span>Email: {data.contactEmail}</span>
                )}
              </div>
              {data.contactAddress && (
                <div className="text-center text-[11px] text-[#786B6B] mt-1">
                  Address: {data.contactAddress}
                </div>
              )}
            </footer>
          )}
        </div>
      </div>
    </div>
  );
};
