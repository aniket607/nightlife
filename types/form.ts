/**
 * Types for form handling in the application
 */

/**
 * Represents a form field with its properties
 */
export interface FormField {
  id: string;
  label: string;
  name: (index: number) => string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  min?: string;
  max?: string;
}

/**
 * Notification type for displaying success or error messages
 */
export interface Notification {
  message: string;
  type: 'success' | 'error';
  formType?: 'stag' | 'couple';
  count?: number;
  eventName?: string;
  eventDate?: Date;
  venueName?: string;
}
