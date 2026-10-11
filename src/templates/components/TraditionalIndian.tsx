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

export const TraditionalIndian: React.FC<TemplateProps> = ({ data, isThumbnail = false }) => {
  const age = calculateAge(data.dateOfBirth);
  const dobFormatted = formatDobDisplay(data.dateOfBirth);
  const hasGrandparents = hasGrandparentDetails(data);
  const hasSiblings = hasSiblingDetails(data);
  const hasPreferences = hasPartnerPreferences(data);
  const hasContact = hasContactDetails(data);

  return (
    <div
      className={`relative w-full bg-[#FAF6EF] text-[#292122] font-serif shadow-md border-4 border-[#671C32] transition-all ${
        isThumbnail ? 'p-3 text-[8px] leading-tight select-none' : 'p-8 sm:p-12 text-sm leading-relaxed'
      }`}
      style={{ boxSizing: 'border-box' }}
    >
      {/* Traditional Auspicious Header */}
      <div className="text-center mb-6">
        {data.showGodNameInPrint !== false && data.godName && (
          <div className="text-red-800 text-sm sm:text-base font-serif font-bold tracking-widest mb-1">
            {data.godName}
          </div>
        )}
        <div className="text-xs uppercase tracking-widest text-[#671C32] font-sans font-bold">
          Marriage Biodata / विवाह बायोडाटा
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-[#4B1020] mt-1">
          {data.fullName || 'Candidate Name'}
        </h1>
        <div className="flex justify-center items-center gap-2 mt-2">
          <span className="w-16 h-[2px] bg-[#C7A36A]"></span>
          <span className="text-[#C7A36A] text-sm">卐</span>
          <span className="w-16 h-[2px] bg-[#C7A36A]"></span>
        </div>
      </div>

      {/* Main Grid: Photo & Personal info */}
      <div className="flex flex-col sm:flex-row gap-6 mb-6 pb-6 border-b border-[#E7DCD2]">
        <div className="shrink-0 flex justify-center">
          {data.photoUrl ? (
            <img
              src={data.photoUrl}
              alt={data.fullName || 'Candidate'}
              referrerPolicy="no-referrer"
              className="w-24 h-32 sm:w-28 sm:h-36 object-cover border-2 border-[#671C32] p-1 bg-white shadow-sm"
            />
          ) : (
            <div className="w-24 h-32 sm:w-28 sm:h-36 border-2 border-[#671C32] p-1 bg-white flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-[#4B1020]">{getInitials(data.fullName)}</span>
              <span className="text-[10px] text-[#786B6B] font-sans">Traditional</span>
            </div>
          )}
        </div>

        <div className="flex-1 w-full text-xs sm:text-sm">
          <div className="bg-[#FAF6EF] border border-[#C7A36A]/60 p-3 mb-2">
            <span className="text-xs uppercase font-sans font-bold text-[#671C32] block mb-1">
              Personal Information
            </span>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              {dobFormatted && <div><strong>Date of Birth:</strong> {dobFormatted} {age ? `(${age} yrs)` : ''}</div>}
              {data.height && <div><strong>Height:</strong> {data.height}</div>}
              {data.religion && <div><strong>Religion / Caste:</strong> {data.religion} {data.caste ? `(${data.caste})` : ''}</div>}
              {data.currentCity && <div><strong>Current City:</strong> {data.currentCity}{data.currentState ? `, ${data.currentState}` : ''}</div>}
              {data.motherTongue && <div><strong>Mother Tongue:</strong> {data.motherTongue}</div>}
              {data.diet && <div><strong>Diet:</strong> {data.diet}</div>}
            </div>
          </div>
          {data.aboutMe && <p className="italic text-xs text-[#4B1020]">"{data.aboutMe}"</p>}
        </div>
      </div>

      {/* Education & Career */}
      {(data.highestQualification || data.profession) && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#FAF6EF] bg-[#671C32] px-3 py-1 font-sans mb-2">
            Educational & Professional Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm px-2">
            {data.highestQualification && <div><strong>Education:</strong> {data.highestQualification}</div>}
            {data.collegeUniversity && <div><strong>College/University:</strong> {data.collegeUniversity}</div>}
            {data.profession && <div><strong>Profession:</strong> {data.profession}</div>}
            {data.jobTitle && <div><strong>Designation:</strong> {data.jobTitle}</div>}
            {data.companyName && data.showCompanyInPrint && <div><strong>Company:</strong> {data.companyName}</div>}
            {data.annualIncome && data.showIncomeInPrint && <div><strong>Income:</strong> {data.annualIncome}</div>}
          </div>
        </div>
      )}

      {/* Family Details */}
      {(data.fatherName || data.motherName || hasGrandparents || hasSiblings) && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#FAF6EF] bg-[#671C32] px-3 py-1 font-sans mb-2">
            Family Details (पारिवारिक विवरण)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm px-2">
            {data.fatherName && <div><strong>Father:</strong> {data.fatherName} {data.fatherOccupation ? `(${data.fatherOccupation})` : ''}</div>}
            {data.motherName && <div><strong>Mother:</strong> {data.motherName} {data.motherOccupation ? `(${data.motherOccupation})` : ''}</div>}

            {hasGrandparents && (
              <div className="sm:col-span-2 pt-1 border-t border-[#E7DCD2] text-xs">
                <span className="font-bold text-[#671C32] block">Grandparents:</span>
                {(data.paternalGrandfather || data.paternalGrandmother) && <div>Paternal: {[data.paternalGrandfather, data.paternalGrandmother].filter(Boolean).join(' · ')}</div>}
                {(data.maternalGrandfather || data.maternalGrandmother) && <div>Maternal: {[data.maternalGrandfather, data.maternalGrandmother].filter(Boolean).join(' · ')}</div>}
              </div>
            )}

            {hasSiblings && (
              <div className="sm:col-span-2 pt-1 border-t border-[#E7DCD2] text-xs">
                <span className="font-bold text-[#671C32] block">Siblings:</span>
                {data.brothers?.map(b => <div key={b.id}>Brother: {b.name} {b.occupation ? `· ${b.occupation}` : ''}</div>)}
                {data.sisters?.map(s => <div key={s.id}>Sister: {s.name} {s.occupation ? `· ${s.occupation}` : ''}</div>)}
              </div>
            )}

            {(data.nativePlace || data.familyType) && (
              <div className="sm:col-span-2 text-xs text-[#786B6B]">
                {[data.nativePlace ? `Native: ${data.nativePlace}` : null, data.familyType ? `Family Type: ${data.familyType}` : null].filter(Boolean).join(' • ')}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Preferences */}
      {hasPreferences && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#FAF6EF] bg-[#671C32] px-3 py-1 font-sans mb-2">
            Expectations / अपेक्षा
          </h2>
          <div className="text-xs sm:text-sm px-2 space-y-1">
            {[data.prefAgeRange ? `Age: ${data.prefAgeRange}` : null, data.prefEducation ? `Education: ${data.prefEducation}` : null, data.prefProfession ? `Profession: ${data.prefProfession}` : null].filter(Boolean).join(' • ')}
            {data.prefExpectations && <div className="italic text-xs text-[#4B1020]">"{data.prefExpectations}"</div>}
          </div>
        </div>
      )}

      {/* Contact */}
      {hasContact && (
        <footer className="pt-3 border-t-2 border-[#671C32] text-center text-xs">
          <div className="font-sans font-bold text-[#671C32] uppercase text-[11px] mb-1">
            Contact Details (संपर्क)
          </div>
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
