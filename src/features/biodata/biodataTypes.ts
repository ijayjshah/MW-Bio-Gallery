export interface SiblingRecord {
  id: string;
  name: string;
  age?: string;
  maritalStatus?: string;
  occupation?: string;
  details?: string;
}

export type SiblingSelectionType = 'none' | 'brother' | 'sister' | 'both';

export interface BiodataData {
  // Step 0 / Header: Deity / Auspicious Invocation
  godName?: string;
  showGodNameInPrint?: boolean;

  // Step 1: Personal Details
  fullName: string;
  dateOfBirth: string; // YYYY-MM-DD
  height: string;
  currentCity: string;
  currentState: string;
  photoUrl?: string; // base64 or object URL
  gender?: string;
  maritalStatus?: string;
  religion?: string;
  caste?: string;
  motherTongue?: string;
  languages?: string;
  nationality?: string;
  hometown?: string;
  diet?: string;
  lifestyle?: string;
  hobbies?: string;
  aboutMe?: string;

  // Step 2: Education & Career
  highestQualification: string;
  collegeUniversity?: string;
  additionalQualifications?: string;
  profession?: string;
  jobTitle?: string;
  companyName?: string;
  businessDetails?: string;
  employmentType?: string;
  workLocation?: string;
  annualIncome?: string;
  careerAbout?: string;
  // Field visibility
  showIncomeInPrint?: boolean;
  showCompanyInPrint?: boolean;

  // Step 3: Family Details
  fatherName?: string;
  fatherOccupation?: string;
  motherName?: string;
  motherOccupation?: string;
  
  // Grandparents
  includeGrandparents?: boolean;
  paternalGrandfather?: string;
  paternalGrandmother?: string;
  maternalGrandfather?: string;
  maternalGrandmother?: string;

  // Siblings
  siblingType: SiblingSelectionType;
  includeSiblingsInPrint: boolean;
  brothers: SiblingRecord[];
  sisters: SiblingRecord[];

  // Additional Family
  familyType?: string; // Joint / Nuclear
  familyValues?: string; // Traditional / Moderate / Liberal
  nativePlace?: string;
  currentFamilyLocation?: string;
  familyAbout?: string;

  // Step 4: Partner Preferences (Optional)
  includePreferencesInPrint: boolean;
  prefAgeRange?: string;
  prefHeightRange?: string;
  prefEducation?: string;
  prefProfession?: string;
  prefLocation?: string;
  prefLanguages?: string;
  prefLifestyle?: string;
  prefFamilyType?: string;
  prefExpectations?: string;

  // Step 5: Contact Information
  includeContactInPrint: boolean;
  contactPersonName?: string;
  contactRelation?: string;
  contactPhone?: string;
  contactWhatsapp?: string;
  contactEmail?: string;
  contactAddress?: string;
  contactInstructions?: string;

  // Step 6: Selected Template ID
  templateId: string;
}
