import { useState, useCallback } from 'react';
import type { Notification } from '@/types/form';

/**
 * Custom hook for centralized error handling
 * Provides consistent error handling across components
 */
export function useErrorHandler() {
  const [notification, setNotification] = useState<Notification | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  /**
   * Set a notification message
   */
  const showNotification = useCallback((message: string, type: 'success' | 'error', additionalData?: Partial<Notification>) => {
    setNotification({
      message,
      type,
      ...additionalData
    });
  }, []);

  /**
   * Clear the current notification
   */
  const clearNotification = useCallback(() => {
    setNotification(null);
  }, []);

  /**
   * Handle form field errors
   */
  const setFieldError = useCallback((fieldName: string, errorMessage: string) => {
    setFormErrors(prev => ({
      ...prev,
      [fieldName]: errorMessage
    }));
  }, []);

  /**
   * Clear a specific field error
   */
  const clearFieldError = useCallback((fieldName: string) => {
    setFormErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  /**
   * Set multiple field errors at once
   */
  const setMultipleFieldErrors = useCallback((errors: Record<string, string>) => {
    setFormErrors(errors);
  }, []);

  /**
   * Clear all form errors
   */
  const clearAllFieldErrors = useCallback(() => {
    setFormErrors({});
  }, []);

  /**
   * Handle API errors with appropriate user feedback
   */
  const handleApiError = useCallback((error: unknown, defaultMessage = 'An unexpected error occurred') => {
    console.error('API Error:', error);
    
    let errorMessage = defaultMessage;
    
    // Handle different error types
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    
    showNotification(errorMessage, 'error');
  }, [showNotification]);

  return {
    notification,
    formErrors,
    showNotification,
    clearNotification,
    setFieldError,
    clearFieldError,
    setMultipleFieldErrors,
    clearAllFieldErrors,
    handleApiError
  };
}
