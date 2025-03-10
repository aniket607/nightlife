"use client"

import { FormToggle } from '@/components/ui/form-toggle'
import { NotificationPopup } from '@/components/joinguestlist/notification-popup'
import { StagForm } from '@/components/joinguestlist/stag-form'
import { CoupleForm } from '@/components/joinguestlist/couple-form'
import { useState, useEffect, useTransition, useRef, use, useCallback } from 'react'
import handleGuestlistSubmit from '@/actions/handleGuestlistSubmit';
import { validateField } from '@/utils/form-validation';
import fetchEventById from '@/actions/fetchEventById';
import type { Event } from '@prisma/client';
import type { StagGuestlist, CoupleGuestlist } from '@/types/guestlist';
import { stagFields, coupleFields } from '@/constants/form-fields';
import { useErrorHandler } from '@/hooks/useErrorHandler';

interface ExtendedEvent extends Event {
  venue: {
    venueName: string;
    address: string;
    locationUrl: string | null;
  };
  artists: Array<{
    artist: {
      id: number;
      name: string;
    };
  }>;
  stagGuestlist: StagGuestlist[];
  coupleGuestlist: CoupleGuestlist[];
}

// Form fields are imported directly from constants

interface PageProps {
  searchParams: Promise<{ eventId?: string }>
}

export default function JoinGuestlistPage({ searchParams }: PageProps) {
  const params = use(searchParams);
  // Initialize formType as 'couple' if stagGlCount is 0, otherwise default to 'stag'
  const [formType, setFormType] = useState<'stag' | 'couple'>('stag');
  const [guestCount, setGuestCount] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [eventDetails, setEventDetails] = useState<ExtendedEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);
  
  // Use centralized error handling
  const { 
    notification, 
    formErrors, 
    showNotification, 
    clearNotification, 
    setFieldError,
    clearFieldError,
    setMultipleFieldErrors,
    clearAllFieldErrors,
    handleApiError 
  } = useErrorHandler();

  // Function to fetch event details
  const fetchEventDetails = useCallback(async () => {
    if (!params.eventId) return;
    try {
      setIsLoading(true);
      const event = await fetchEventById(parseInt(params.eventId));
      const eventData = event as ExtendedEvent;
      setEventDetails(eventData);
      
      // If stagGlCount is 0 and coupleGl is true with available slots, switch to couple form
      if (eventData.stagGlCount === 0 && eventData.coupleGl && (eventData.coupleGlCount ?? 0) > 0) {
        setFormType('couple');
      }
    } catch (error) {
      // Use centralized error handling
      handleApiError(error, 'Failed to load event details');
    } finally {
      setIsLoading(false);
    }
  }, [params.eventId, setFormType, setEventDetails, handleApiError, setIsLoading]);

  useEffect(() => {
    fetchEventDetails();
  }, [fetchEventDetails]);

  if (isLoading) {
    return (
      <div className="container mx-auto mt-24 px-4 text-center">
        <div className="text-white space-y-4">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white/80 rounded-full animate-spin mx-auto"/>
          <h2 className="text-xl">Loading event details...</h2>
        </div>
      </div>
    );
  }

  if (!eventDetails) {
    return (
      <div className="container mx-auto mt-24 px-4 text-center">
        <h1 className="text-2xl text-white">Event not found</h1>
      </div>
    );
  }

  // Validate if slots are available
  const validateSlots = (type: 'stag' | 'couple', count: number): boolean => {
    if (type === 'stag') {
      return count <= eventDetails.stagGlCount;
    } else {
      return eventDetails.coupleGl && count <= (eventDetails.coupleGlCount || 0);
    }
  };

  const handleFieldChange = (name: string, value: string, type: string, required: boolean = true) => {
    const result = validateField(value, type, required);
    if (!result.isValid) {
      setFieldError(name, result.error!);
    } else {
      clearFieldError(name);
    }
  };

  const maxGuests = formType === 'stag' ? Math.min(3, eventDetails.stagGlCount) : Math.min(2, eventDetails.coupleGlCount || 0);
  
  const handleAddGuest = () => {
    if (guestCount < maxGuests && validateSlots(formType, guestCount + 1)) {
      setGuestCount(prev => prev + 1);
    } else {
      showNotification(`No more ${formType} slots available`, 'error');
    }
  };

  const handleRemoveGuest = () => {
    if (guestCount > 1) {
      setGuestCount(prev => prev - 1);
    }
  };

  //Client Side form data Validations
  const validateForm = (formData: FormData): boolean => {
    const errors: Record<string, string> = {};

    for (let i = 0; i < guestCount; i++) {
      if (formType === 'stag') {
        // Validate stag fields
        const nameResult = validateField(formData.get(`guests[${i}].name`) as string, 'name');
        const ageResult = validateField(formData.get(`guests[${i}].age`) as string, 'age');
        const mobileResult = validateField(formData.get(`guests[${i}].mobile`) as string, 'tel');
        const emailResult = validateField(formData.get(`guests[${i}].email`) as string, 'email');

        if (!nameResult.isValid) errors[`guests[${i}].name`] = nameResult.error!;
        if (!ageResult.isValid) errors[`guests[${i}].age`] = ageResult.error!;
        if (!mobileResult.isValid) errors[`guests[${i}].mobile`] = mobileResult.error!;
        if (!emailResult.isValid) errors[`guests[${i}].email`] = emailResult.error!;
      } else {
        // Validate couple fields
        const maleNameResult = validateField(formData.get(`couples[${i}].male.name`) as string, 'name');
        const femaleNameResult = validateField(formData.get(`couples[${i}].female.name`) as string, 'name');
        const maleAgeResult = validateField(formData.get(`couples[${i}].male.age`) as string, 'age');
        const femaleAgeResult = validateField(formData.get(`couples[${i}].female.age`) as string, 'age');
        const maleMobileResult = validateField(formData.get(`couples[${i}].male.mobile`) as string, 'tel');
        const femaleMobileResult = validateField(formData.get(`couples[${i}].female.mobile`) as string, 'tel');
        const maleEmailResult = validateField(formData.get(`couples[${i}].male.email`) as string, 'email');
        const femaleEmailResult = validateField(formData.get(`couples[${i}].female.email`) as string, 'email', false);

        if (!maleNameResult.isValid) errors[`couples[${i}].male.name`] = maleNameResult.error!;
        if (!femaleNameResult.isValid) errors[`couples[${i}].female.name`] = femaleNameResult.error!;
        if (!maleAgeResult.isValid) errors[`couples[${i}].male.age`] = maleAgeResult.error!;
        if (!femaleAgeResult.isValid) errors[`couples[${i}].female.age`] = femaleAgeResult.error!;
        if (!maleMobileResult.isValid) errors[`couples[${i}].male.mobile`] = maleMobileResult.error!;
        if (!femaleMobileResult.isValid) errors[`couples[${i}].female.mobile`] = femaleMobileResult.error!;
        if (!maleEmailResult.isValid) errors[`couples[${i}].male.email`] = maleEmailResult.error!;
        if (!femaleEmailResult.isValid) errors[`couples[${i}].female.email`] = femaleEmailResult.error!;
      }
    }

    // Use centralized error handling
    setMultipleFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  //Form Submit Handler
  const handleSubmit = async (formData: FormData) => {
    // Reset form errors
    clearAllFieldErrors();

    // Validate slots availability
    const submissionCount = parseInt(formData.get('guestCount') as string);
    if (!validateSlots(formType, submissionCount)) {
      showNotification(`Not enough ${formType} slots available`, 'error');
      return;
    }

    // Validate form
    if (!validateForm(formData)) {
      showNotification('Please fix the errors in the form', 'error');
      return;
    }

    startTransition(async () => {
      try {
        const response = await handleGuestlistSubmit(formData);
        
        // Show success or error notification
        showNotification(
          response.message,
          response.success ? 'success' : 'error',
          // Add additional details for successful submissions
          response.success ? {
            formType,
            count: guestCount,
            eventName: eventDetails?.eventName,
            eventDate: eventDetails?.eventDate,
            venueName: eventDetails?.venue?.venueName
          } : undefined
        );

        if (response.success) {
          // Reset form if submission was successful
          setGuestCount(1);
          formRef.current?.reset();
          
          // Refetch event details to update available slots count
          fetchEventDetails();
        } else {
          // If the error was due to slot availability, refresh event details
          // to show updated slot counts
          if (response.message.includes('not enough') || response.message.includes('slots available')) {
            fetchEventDetails();
          }
        }
      } catch (error) {
        handleApiError(error, 'An error occurred while submitting the form');
      }
    });
  };

  // Check if any slots are available
  const noSlotsAvailable = eventDetails.stagGlCount === 0 && (!eventDetails.coupleGl || (eventDetails.coupleGlCount || 0) === 0);

  return (
    <div className="container mx-auto mt-24 px-4 relative z-10">
      <h1 className="text-4xl font-bold font-futura text-white text-center mb-12">Join Guestlist</h1>
      
      {/* Display available slots */}
      <div className="text-center mb-8">
        <p className="text-white/80">
          Available Slots: 
          <span className="ml-2 text-white font-semibold">{eventDetails.stagGlCount} Stag</span>
          {eventDetails.coupleGl && (
            <span className="ml-2 text-white font-semibold">• {eventDetails.coupleGlCount} Couple</span>
          )}
        </p>
      </div>

      {/* Confirmation Popup */}
      {notification && (
        <NotificationPopup 
          notification={notification} 
          onClose={clearNotification} 
        />
      )}

      <div className="max-w-4xl mx-auto flow-root pb-20">
        <div className="bg-gradient-to-br from-slate-900/60 via-zinc-900/80 to-slate-900/90 backdrop-blur-xl rounded-3xl p-2 md:p-8 border border-white/10 shadow-xl mb-8">
          {noSlotsAvailable ? (
            // Display message when no slots are available
            <div className="text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-yellow-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h2 className="text-2xl font-bold text-white mb-2">No Guestlist Slots Available</h2>
              <p className="text-white/80 max-w-md mx-auto">
                Sorry, all guestlist slots for this event have been filled. Please check back later or contact the venue for more information.
              </p>
            </div>
          ) : (
            // Show form when slots are available
            <>
              <FormToggle 
                onToggle={(value) => {
                  // Only allow switching to couple if coupleGl is true
                  if (value === 'couple' && !eventDetails.coupleGl) {
                    showNotification('Couple entries are not available for this event', 'error');
                    return;
                  }
                  // Only allow switching to stag if stagGlCount > 0
                  if (value === 'stag' && eventDetails.stagGlCount === 0) {
                    showNotification('Stag entries are not available for this event', 'error');
                    return;
                  }
                  setFormType(value);
                  setGuestCount(1);
                }} 
                className="mb-6"
                disableCouple={!eventDetails.coupleGl}
                disableStag={eventDetails.stagGlCount === 0}
              />
              
              {/* Form Container */}
              <div className="mt-8 mx-auto">
                  {/* Form Content */}
                  <div className="relative px-6 py-5">
                    <form ref={formRef} onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      formData.set('eventId', params.eventId || '0');
                      handleSubmit(formData);
                    }}>
                      <input type="hidden" name="formType" value={formType} />
                      <input type="hidden" name="eventId" value={params.eventId} />
                      <input type="hidden" name="guestCount" value={guestCount} />
                      
                      {formType === 'stag' ? (
                        <StagForm 
                          guestCount={guestCount}
                          maxGuests={maxGuests}
                          stagFields={stagFields}
                          formErrors={formErrors}
                          isPending={isPending}
                          handleFieldChange={handleFieldChange}
                          handleAddGuest={handleAddGuest}
                          handleRemoveGuest={handleRemoveGuest}
                        />
                      ) : (
                        <CoupleForm 
                          guestCount={guestCount}
                          maxGuests={maxGuests}
                          coupleFields={coupleFields}
                          formErrors={formErrors}
                          isPending={isPending}
                          handleFieldChange={handleFieldChange}
                          handleAddGuest={handleAddGuest}
                          handleRemoveGuest={handleRemoveGuest}
                        />
                      )}
                    </form>
                  </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
