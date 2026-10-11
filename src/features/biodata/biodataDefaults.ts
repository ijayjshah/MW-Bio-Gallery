import { BiodataData } from './biodataTypes';
import {
  DEFAULT_GROOM_PORTRAIT,
  DEFAULT_BRIDE_PORTRAIT,
  SAMPLE_PORTRAITS,
} from '../../assets/samplePortraits';

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

// Rich Groom sample data for realistic showcase rendering
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
  lifestyle: 'Non-smoker, Fitness enthusiast, Teetotaler',
  hobbies: 'Classical Hindustani music, trekking in the Sahyadris, badminton, avid reader',
  aboutMe: 'A balanced individual grounded in family traditions with an open, progressive outlook. Passionate about technology, sustainable living, and exploring new cultures.',
  photoUrl: DEFAULT_GROOM_PORTRAIT,

  highestQualification: 'Master of Science (Computer Science)',
  collegeUniversity: 'COEP Technological University, Pune',
  additionalQualifications: 'B.Tech in Information Technology · Certified AWS Solutions Architect',
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

// Rich Bride sample data for realistic showcase rendering
export const sampleBrideBiodataData: BiodataData = {
  godName: '॥ श्री कुलस्वामिनी प्रसन्न ॥',
  showGodNameInPrint: true,
  fullName: 'Ananya S. Deshmukh',
  dateOfBirth: '1998-09-22',
  height: `5' 5" (165 cm)`,
  currentCity: 'Mumbai',
  currentState: 'Maharashtra',
  gender: 'Female',
  maritalStatus: 'Never Married',
  religion: 'Hindu',
  caste: 'Maratha / 96 Kuli',
  motherTongue: 'Marathi',
  languages: 'English, Marathi, Hindi',
  nationality: 'Indian',
  hometown: 'Kolhapur',
  diet: 'Vegetarian',
  lifestyle: 'Non-smoker, Yoga practitioner, Culturally rooted',
  hobbies: 'Classical Bharatanatyam, interior architecture sketching, reading, classical music',
  aboutMe: 'An energetic, affectionate person who blends artistic sensibility with strong cultural roots. Believes in mutual respect, laughter, and lifelong growth.',
  photoUrl: DEFAULT_BRIDE_PORTRAIT,

  highestQualification: 'Master of Architecture (Urban Design)',
  collegeUniversity: 'Sir J.J. College of Architecture, Mumbai',
  additionalQualifications: 'B.Arch (First Class with Distinction) · Registered Architect (COA)',
  profession: 'Senior Urban Architect & Designer',
  jobTitle: 'Senior Architectural Associate',
  companyName: 'Atelier Design Studio Mumbai',
  employmentType: 'Full-time Professional Practice',
  workLocation: 'Bandra Kurla Complex, Mumbai',
  annualIncome: '₹ 22,00,000 p.a.',
  careerAbout: 'Specializing in sustainable heritage conservation and modern biophilic residential spaces. Passionate about craftsmanship and thoughtful design.',
  showIncomeInPrint: true,
  showCompanyInPrint: true,

  fatherName: 'Shri Shashikant R. Deshmukh',
  fatherOccupation: 'Executive Engineer (Retd. PWD Govt. of Maharashtra)',
  motherName: 'Mrs. Jayashree S. Deshmukh',
  motherOccupation: 'High School Principal (Retd.)',
  
  includeGrandparents: true,
  paternalGrandfather: 'Late Shri Raosaheb Deshmukh (Landholder & Social Worker)',
  paternalGrandmother: 'Late Smt. Parvatibai Deshmukh',
  maternalGrandfather: 'Late Shri Dattajirao Patil (Freedom Fighter)',
  maternalGrandmother: 'Smt. Shalinibai Patil',

  siblingType: 'brother',
  includeSiblingsInPrint: true,
  brothers: [
    {
      id: 'bro-1',
      name: 'Aditya S. Deshmukh',
      age: '29',
      maritalStatus: 'Married',
      occupation: 'Investment Banker, Deutsche Bank Singapore',
      details: 'Alumnus of IIM Ahmedabad · Settled in Singapore'
    }
  ],
  sisters: [],

  familyType: 'Nuclear Family',
  familyValues: 'Cultured, warm, traditional with liberal values',
  nativePlace: 'Karad, District Satara / Kolhapur',
  currentFamilyLocation: 'Prabhadevi, Mumbai',
  familyAbout: 'A noble, deeply respected family with generations of service in education and public administration.',

  includePreferencesInPrint: true,
  prefAgeRange: '27 to 32 years',
  prefHeightRange: `5' 8" to 6' 2"`,
  prefEducation: 'Well-educated professional (Engineering, Medicine, Management, Civil Services, or Architecture)',
  prefProfession: 'Working in Mumbai / Pune / Abroad or established entrepreneur',
  prefLocation: 'Mumbai, Pune, Bangalore or Metro cities',
  prefLanguages: 'Marathi / English',
  prefLifestyle: 'Vegetarian, family-loving, cheerful, mutual companionship',
  prefFamilyType: 'Respected, cultured family background',
  prefExpectations: 'Looking for a kind, ambitious, and understanding partner with whom to build a warm, happy life based on equality and family harmony.',

  includeContactInPrint: true,
  contactPersonName: 'Shri Shashikant Deshmukh (Father)',
  contactRelation: 'Father',
  contactPhone: '+91 98201 54321',
  contactWhatsapp: '+91 98201 54321',
  contactEmail: 'deshmukh.family.mumbai@gmail.com',
  contactAddress: '702, Raj Bhavan Enclave, Prabhadevi, Mumbai - 400025',
  contactInstructions: 'Feel free to connect on WhatsApp or call in the evenings (6:00 PM - 9:00 PM)',

  templateId: 'royal-burgundy',
};

/**
 * Returns authentic, beautiful sample data tailored to each template
 * ensuring every reference template showcases a real high-res wedding portrait and god name.
 */
export function getSampleDataForTemplate(templateId: string): BiodataData {
  const brideTemplates = [
    'royal-burgundy',
    'floral-grace',
    'botanical-ivory',
    'contemporary-portrait',
    'graceful-rose',
  ];

  if (brideTemplates.includes(templateId)) {
    return {
      ...sampleBrideBiodataData,
      templateId,
      photoUrl: templateId === 'graceful-rose' ? SAMPLE_PORTRAITS.brideSample1 : DEFAULT_BRIDE_PORTRAIT,
    };
  }

  return {
    ...sampleBiodataData,
    templateId,
    photoUrl: templateId === 'contemporary-editorial' ? SAMPLE_PORTRAITS.groomSample1 : DEFAULT_GROOM_PORTRAIT,
  };
}

