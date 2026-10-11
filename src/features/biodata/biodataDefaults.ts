import { BiodataData } from './biodataTypes';

export const initialBiodataData: BiodataData = {
  // Deity / Auspicious Invocation
  godName: '॥ श्री गणेशाय नमः ॥',
  showGodNameInPrint: true,

  // Step 1: Personal Details
  fullName: '',
  dateOfBirth: '',
  height: '',
  currentCity: '',
  currentState: '',
  photoUrl: '',
  gender: '',
  maritalStatus: 'Never Married',
  religion: '',
  caste: '',
  motherTongue: '',
  languages: '',
  nationality: 'Indian',
  hometown: '',
  diet: '',
  lifestyle: '',
  hobbies: '',
  aboutMe: '',

  // Step 2: Education & Career
  highestQualification: '',
  collegeUniversity: '',
  additionalQualifications: '',
  profession: '',
  jobTitle: '',
  companyName: '',
  businessDetails: '',
  employmentType: 'Salaried / Corporate',
  workLocation: '',
  annualIncome: '',
  careerAbout: '',
  showIncomeInPrint: true,
  showCompanyInPrint: true,

  // Step 3: Family Details
  fatherName: '',
  fatherOccupation: '',
  motherName: '',
  motherOccupation: '',
  
  includeGrandparents: false,
  paternalGrandfather: '',
  paternalGrandmother: '',
  maternalGrandfather: '',
  maternalGrandmother: '',

  siblingType: 'none',
  includeSiblingsInPrint: true,
  brothers: [],
  sisters: [],

  familyType: 'Nuclear',
  familyValues: 'Moderate / Respectful',
  nativePlace: '',
  currentFamilyLocation: '',
  familyAbout: '',

  // Step 4: Partner Preferences
  includePreferencesInPrint: false,
  prefAgeRange: '',
  prefHeightRange: '',
  prefEducation: '',
  prefProfession: '',
  prefLocation: '',
  prefLanguages: '',
  prefLifestyle: '',
  prefFamilyType: '',
  prefExpectations: '',

  // Step 5: Contact Information
  includeContactInPrint: true,
  contactPersonName: '',
  contactRelation: 'Self / Parents',
  contactPhone: '',
  contactWhatsapp: '',
  contactEmail: '',
  contactAddress: '',
  contactInstructions: '',

  // Template ID
  templateId: 'classic-elegance',
};

// Rich sample data for realistic showcase rendering on the homepage
export const sampleBiodataData: BiodataData = {
  godName: '॥ श्री गणेशाय नमः ॥',
  showGodNameInPrint: true,
  fullName: 'Aarav V. Kulkarni',
  dateOfBirth: '1997-04-18',
  height: `5' 11" (180 cm)`,
  currentCity: 'Pune',
  currentState: 'Maharashtra',
  gender: 'Male',
  maritalStatus: 'Never Married',
  religion: 'Hindu',
  caste: 'Deshastha Brahmin',
  motherTongue: 'Marathi',
  languages: 'English, Marathi, Hindi, German',
  nationality: 'Indian',
  hometown: 'Pune',
  diet: 'Vegetarian',
  lifestyle: 'Non-smoker, Non-drinker, Fitness enthusiast',
  hobbies: 'Classical Hindustani music, trekking in the Sahyadris, badminton, avid reader',
  aboutMe: 'A balanced individual grounded in family traditions with an open, progressive outlook. Passionate about technology, sustainable living, and exploring new cultures.',
  photoUrl: '/images/groom_portrait_sample.jpg',

  highestQualification: 'Master of Science (Computer Science)',
  collegeUniversity: 'COEP Technological University, Pune',
  additionalQualifications: 'B.Tech in Information Technology · Certified AWS Cloud Architect',
  profession: 'Senior Software Engineer',
  jobTitle: 'Senior Engineering Lead',
  companyName: 'Global Cloud Systems India',
  employmentType: 'Full-time Private Corporate',
  workLocation: 'Pune (Hybrid)',
  annualIncome: '₹ 28,00,000 p.a.',
  careerAbout: 'Over 6 years leading distributed backend systems for international fintech applications. Values work-life balance and continuous learning.',
  showIncomeInPrint: true,
  showCompanyInPrint: true,

  fatherName: 'Dr. Vivek S. Kulkarni',
  fatherOccupation: 'Senior Consulting Surgeon (Retd. Civil Hospital)',
  motherName: 'Mrs. Shubhada V. Kulkarni',
  motherOccupation: 'Professor of Literature & Educationist',
  
  includeGrandparents: true,
  paternalGrandfather: 'Late Shri Shankarrao Kulkarni (Magistrate, Pune)',
  paternalGrandmother: 'Late Smt. Yamunabai Kulkarni',
  maternalGrandfather: 'Shri Ramchandra Joshi (Agricultural Entrepreneur)',
  maternalGrandmother: 'Smt. Kamalabai Joshi',

  siblingType: 'sister',
  includeSiblingsInPrint: true,
  brothers: [],
  sisters: [
    {
      id: 'sis-1',
      name: 'Dr. Tanvi Kulkarni, MD',
      age: '24',
      maritalStatus: 'Unmarried',
      occupation: 'Resident Doctor, KEM Hospital Mumbai',
      details: 'Pursuing Post-Graduation in Pediatrics'
    }
  ],

  familyType: 'Nuclear Family',
  familyValues: 'Traditional yet progressive and culturally rooted',
  nativePlace: 'Satara / Pune, Maharashtra',
  currentFamilyLocation: 'Kothrud, Pune, Maharashtra',
  familyAbout: 'A well-educated, cultured family holding high moral values and warm social bonds.',

  includePreferencesInPrint: true,
  prefAgeRange: '23 to 27 years',
  prefHeightRange: `5' 2" to 5' 8"`,
  prefEducation: 'Postgraduate / Professional Graduate (Engineering, Medicine, Management, or Architecture)',
  prefProfession: 'Working professional or entrepreneur',
  prefLocation: 'Pune, Mumbai, or open to relocating within India/Abroad',
  prefLanguages: 'Marathi / English / Hindi',
  prefLifestyle: 'Vegetarian preferred, family-oriented with mutual respect',
  prefFamilyType: 'Cultured, educated family background',
  prefExpectations: 'Looking for an understanding, cheerful life companion who values mutual respect, companionship, and shared life goals.',

  includeContactInPrint: true,
  contactPersonName: 'Dr. Vivek Kulkarni (Father)',
  contactRelation: 'Father',
  contactPhone: '+91 98220 12345',
  contactWhatsapp: '+91 98220 12345',
  contactEmail: 'family.kulkarni.pune@gmail.com',
  contactAddress: 'B-402, Shanti Niketan, Ideal Colony, Kothrud, Pune - 411038',
  contactInstructions: 'Kindly call between 10:00 AM and 8:00 PM IST',

  templateId: 'classic-elegance',
};
