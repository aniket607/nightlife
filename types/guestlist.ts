/**
 * Types for guestlist-related data structures
 */

/**
 * Guest data structure for form submissions
 */
export interface GuestData {
  name: string;
  age: number;
  mobile: string;
  email: string;
}

/**
 * Couple data structure for form submissions
 */
export interface CoupleData {
  male: GuestData;
  female: GuestData;
}

/**
 * Stag guestlist entry from the database
 */
export interface StagGuestlist {
  glId: number;
  guestName: string;
  guestAge: number;
  guestMobile: string;
  guestEmail: string;
  eventId: number;
}

/**
 * Couple guestlist entry from the database
 */
export interface CoupleGuestlist {
  glId: number;
  maleName: string;
  maleAge: number;
  maleMobile: string;
  maleEmail: string;
  femaleName: string;
  femaleAge: number;
  femaleMobile: string;
  femaleEmail: string | null;
  eventId: number;
}
