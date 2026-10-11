import { BiodataData } from './biodataTypes';

/**
 * Calculates age accurately taking into account month and day.
 */
export function calculateAge(dobString: string): number | null {
  if (!dobString) return null;
  const birthDate = new Date(dobString);
  if (isNaN(birthDate.getTime())) return null;

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age >= 0 && age < 120 ? age : null;
}

/**
 * Formats a Date of Birth into an elegant readable format (e.g. 14 October 1996)
 */
export function formatDobDisplay(dobString: string): string {
  if (!dobString) return '';
  const date = new Date(dobString);
  if (isNaN(date.getTime())) return dobString;
  
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

/**
 * Get initials from full name for monogram templates
 */
export function getInitials(name: string): string {
  if (!name) return 'MW';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Checks if grandparent information exists and has at least one field filled
 */
export function hasGrandparentDetails(data: BiodataData): boolean {
  if (!data.includeGrandparents) return false;
  return Boolean(
    data.paternalGrandfather?.trim() ||
    data.paternalGrandmother?.trim() ||
    data.maternalGrandfather?.trim() ||
    data.maternalGrandmother?.trim()
  );
}

/**
 * Checks if sibling details should be rendered
 */
export function hasSiblingDetails(data: BiodataData): boolean {
  if (!data.includeSiblingsInPrint || data.siblingType === 'none') return false;
  const hasBrothers = data.brothers && data.brothers.length > 0 && data.brothers.some(b => b.name?.trim());
  const hasSisters = data.sisters && data.sisters.length > 0 && data.sisters.some(s => s.name?.trim());
  
  if (data.siblingType === 'brother') return hasBrothers;
  if (data.siblingType === 'sister') return hasSisters;
  if (data.siblingType === 'both') return hasBrothers || hasSisters;
  return false;
}

/**
 * Checks if partner preference details exist
 */
export function hasPartnerPreferences(data: BiodataData): boolean {
  if (!data.includePreferencesInPrint) return false;
  return Boolean(
    data.prefAgeRange?.trim() ||
    data.prefHeightRange?.trim() ||
    data.prefEducation?.trim() ||
    data.prefProfession?.trim() ||
    data.prefLocation?.trim() ||
    data.prefLanguages?.trim() ||
    data.prefLifestyle?.trim() ||
    data.prefFamilyType?.trim() ||
    data.prefExpectations?.trim()
  );
}

/**
 * Checks if contact details exist
 */
export function hasContactDetails(data: BiodataData): boolean {
  if (!data.includeContactInPrint) return false;
  return Boolean(
    data.contactPersonName?.trim() ||
    data.contactPhone?.trim() ||
    data.contactWhatsapp?.trim() ||
    data.contactEmail?.trim() ||
    data.contactAddress?.trim()
  );
}
