interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateField = (value: string | null, type: string, required: boolean = true): ValidationResult => {
  if (!value) {
    return required ? { isValid: false, error: 'This field is required' } : { isValid: true };
  }

  switch (type) {
    case 'name':
      // Name should be at least 3 characters and contain only letters and spaces
      if (value.length < 3) {
        return { isValid: false, error: 'Name must be at least 3 characters' };
      }
      if (!/^[A-Za-z\s]+$/.test(value)) {
        return { isValid: false, error: 'Name can only contain letters and spaces' };
      }
      break;

    case 'tel':
      // Phone number should be exactly 10 digits and start with 6, 7, 8, or 9
      if (!/^[6-9]\d{9}$/.test(value)) {
        return { isValid: false, error: 'Please enter a valid 10-digit mobile number' };
      }
      break;

    case 'email':
      // Basic email validation
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return { isValid: false, error: 'Please enter a valid email address' };
      }
      break;

    case 'age':
      const age = parseInt(value);
      if (isNaN(age) || age < 18 || age > 80) {
        return { isValid: false, error: 'Age must be between 18 and 80' };
      }
      break;
  }

  return { isValid: true };
};
