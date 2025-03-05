"use client"

import { FormToggle } from '@/components/ui/form-toggle'
import { GuestFormFields } from '@/components/ui/guest-form-fields'
import { useState, useEffect, useTransition, useRef, use, useCallback } from 'react'
import handleGuestlistSubmit from '@/actions/handleGuestlistSubmit';
import { validateField } from '@/utils/form-validation';
import { Plus, X , Trash} from 'lucide-react';
import fetchEventById from '@/actions/fetchEventById';
import type { Event } from '@prisma/client';

interface StagGuestlist {
  glId: number;
  guestName: string;
  guestAge: number;
  guestMobile: string;
  guestEmail: string;
  eventId: number;
}

interface CoupleGuestlist {
  glId: number;
  maleName: string;
  femaleName: string;
  maleAge: number;
  femaleAge: number;
  maleMobile: string;
  femaleMobile: string;
  maleEmail: string;
  femaleEmail: string | null;
  eventId: number;
}

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

const stagFields = [
  {
    id: 'guestName',
    label: 'Guest Name',
    type: 'text',
    name: (index: number) => `guests[${index}].name`,
    placeholder: 'Enter full name',
    required: true
  },
  {
    id: 'guestAge',
    label: 'Age',
    type: 'number',
    name: (index: number) => `guests[${index}].age`,
    placeholder: 'Must be 18 or older',
    required: true,
    min: '18',
    max: '80'
  },
  {
    id: 'guestMobile',
    label: 'Mobile Number',
    type: 'tel',
    name: (index: number) => `guests[${index}].mobile`,
    placeholder: '10 Digit Mobile number',
    required: true
  },
  {
    id: 'guestEmail',
    label: 'Email',
    type: 'email',
    name: (index: number) => `guests[${index}].email`,
    placeholder: 'Enter email address',
    required: true
  }
];

const coupleFields = [
  {
    id: 'maleName',
    label: 'Male Name',
    type: 'text',
    name: (index: number) => `couples[${index}].male.name`,
    placeholder: 'Enter full name',
    required: true
  },
  {
    id: 'femaleName',
    label: 'Female Name',
    type: 'text',
    name: (index: number) => `couples[${index}].female.name`,
    placeholder: 'Enter full name',
    required: true
  },
  {
    id: 'maleAge',
    label: 'Male Age',
    type: 'number',
    name: (index: number) => `couples[${index}].male.age`,
    placeholder: 'Must be 18 or older',
    required: true,
    min: '18',
    max: '80'
  },
  {
    id: 'femaleAge',
    label: 'Female Age',
    type: 'number',
    name: (index: number) => `couples[${index}].female.age`,
    placeholder: 'Must be 18 or older',
    required: true,
    min: '18',
    max: '80'
  },
  {
    id: 'maleMobile',
    label: 'Male Mobile Number',
    type: 'tel',
    name: (index: number) => `couples[${index}].male.mobile`,
    placeholder: 'Enter mobile number',
    required: true
  },
  {
    id: 'femaleMobile',
    label: 'Female Mobile Number',
    type: 'tel',
    name: (index: number) => `couples[${index}].female.mobile`,
    placeholder: 'Enter mobile number',
    required: true
  },
  {
    id: 'maleEmail',
    label: 'Male Email',
    type: 'email',
    name: (index: number) => `couples[${index}].male.email`,
    placeholder: 'Enter email address',
    required: true
  },
  {
    id: 'femaleEmail',
    label: 'Female Email',
    type: 'email',
    name: (index: number) => `couples[${index}].female.email`,
    placeholder: 'Enter email address (optional)',
    required: false
  }
];

interface PageProps {
  searchParams: Promise<{ eventId?: string }>
}

export default function JoinGuestlistPage({ searchParams }: PageProps) {
  const params = use(searchParams);
  // Initialize formType as 'couple' if stagGlCount is 0, otherwise default to 'stag'
  const [formType, setFormType] = useState<'stag' | 'couple'>('stag');
  const [guestCount, setGuestCount] = useState(1);
  const [notification, setNotification] = useState<{ 
    message: string; 
    type: 'success' | 'error';
    formType?: 'stag' | 'couple';
    count?: number;
    eventName?: string;
    eventDate?: Date;
    venueName?: string;
  } | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();
  const [eventDetails, setEventDetails] = useState<ExtendedEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);

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
      console.error('Error fetching event:', error);
      setNotification({
        type: 'error',
        message: 'Failed to load event details'
      });
    } finally {
      setIsLoading(false);
    }
  }, [params.eventId, setFormType, setEventDetails, setNotification, setIsLoading]);

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
      setFormErrors(prev => ({
        ...prev,
        [name]: result.error!
      }));
    } else {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const maxGuests = formType === 'stag' ? Math.min(3, eventDetails.stagGlCount) : Math.min(2, eventDetails.coupleGlCount || 0);
  
  const handleAddGuest = () => {
    if (guestCount < maxGuests && validateSlots(formType, guestCount + 1)) {
      setGuestCount(prev => prev + 1);
    } else {
      setNotification({
        type: 'error',
        message: `No more ${formType} slots available`
      });
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

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  //Form Submit Handler
  const handleSubmit = async (formData: FormData) => {
    // Reset form errors
    setFormErrors({});

    // Validate slots availability
    const submissionCount = parseInt(formData.get('guestCount') as string);
    if (!validateSlots(formType, submissionCount)) {
      setNotification({
        message: `Not enough ${formType} slots available`,
        type: 'error'
      });
      return;
    }

    // Validate form
    if (!validateForm(formData)) {
      setNotification({
        message: 'Please fix the errors in the form',
        type: 'error'
      });
      return;
    }

    startTransition(async () => {
      try {
        const response = await handleGuestlistSubmit(formData);
        setNotification({
          message: response.message,
          type: response.success ? 'success' : 'error',
          // Add additional details for successful submissions
          ...(response.success && {
            formType,
            count: guestCount,
            eventName: eventDetails?.eventName,
            eventDate: eventDetails?.eventDate,
            venueName: eventDetails?.venue?.venueName
          })
        });

        if (response.success) {
          // Reset form if submission was successful
          setGuestCount(1);
          formRef.current?.reset();
          
          // Refetch event details to update available slots count
          fetchEventDetails();
        }
      } catch (error) {
        setNotification({
          message: 'An error occurred while submitting the form',
          type: 'error'
        });
      }
    });
  };

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

      {/*Confirmation Popup */}
      {notification && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className={`relative bg-gradient-to-br from-zinc-900 to-slate-900 p-6 md:p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 border ${
            notification.type === 'success' ? 'border-green-500/50' : 'border-red-500/50'
          }`}>
            {/* Close button */}
            <button
              onClick={() => setNotification(null)}
              className="absolute top-3 right-3 p-2 bg-zinc-800/80 hover:bg-zinc-700 text-white/80 hover:text-white rounded-full transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>
            
            {/* Success content with more details */}
            {notification.type === 'success' && notification.eventName ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-12 h-12 bg-green-500/30 rounded-full flex items-center justify-center">
                    <div className="text-green-500 text-2xl">✓</div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-green-500 mb-3">Confirmed!</h3>
                
                <div className="bg-white/5 rounded-xl p-4 mb-5 border border-white/10">
                  <h4 className="text-xl font-semibold text-white mb-3">{notification.eventName}</h4>
                  
                  <div className="space-y-2 text-left">
                    {notification.eventDate && (
                      <div className="flex items-center gap-2">
                        <div className="text-white/60">Date:</div>
                        <div className="text-white">
                          {new Date(notification.eventDate).toLocaleDateString('en-US', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                    )}
                    
                    {notification.venueName && (
                      <div className="flex items-center gap-2">
                        <div className="text-white/60">Venue:</div>
                        <div className="text-white">{notification.venueName}</div>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <div className="text-white/60">Entry Type:</div>
                      <div className="text-white capitalize">{notification.formType ?? 'stag'}</div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="text-white/60">Guests:</div>
                      <div className="text-white">
                        {notification.count ?? 0} {(notification.formType ?? 'stag') === 'stag' ? 
                          `${(notification.count ?? 0) > 1 ? 'people' : 'person'}` : 
                          `${(notification.count ?? 0) > 1 ? 'couples' : 'couple'}`}
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-white/80 text-sm mb-4">
                  A confirmation email has been sent to your registered email address.
                  Please check your inbox for details.
                </p>
                
                <button
                  onClick={() => setNotification(null)}
                  className="bg-[#E5FF10] hover:bg-[#E5FF10]/80 text-black font-helvetica px-6 py-2 rounded-xl transition-colors w-full"
                >
                  Done
                </button>
              </div>
            ) : (
              // Error content
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-12 h-12 bg-red-500/30 rounded-full flex items-center justify-center">
                    <div className="text-red-500 text-2xl">✗</div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-red-500 mb-3">Error</h3>
                <p className="text-white text-lg mb-6">{notification.message}</p>
                
                <button
                  onClick={() => setNotification(null)}
                  className="bg-white/10 hover:bg-white/20 text-white font-helvetica px-6 py-2 rounded-xl transition-colors w-full"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto flow-root pb-20">
        <div className="bg-gradient-to-br from-slate-900/60 via-zinc-900/80 to-slate-900/90 backdrop-blur-xl rounded-3xl p-2 md:p-8 border border-white/10 shadow-xl mb-8">
          <FormToggle 
            onToggle={(value) => {
              // Only allow switching to couple if coupleGl is true
              if (value === 'couple' && !eventDetails.coupleGl) {
                setNotification({
                  message: 'Couple entries are not available for this event',
                  type: 'error'
                });
                return;
              }
              // Only allow switching to stag if stagGlCount > 0
              if (value === 'stag' && eventDetails.stagGlCount === 0) {
                setNotification({
                  message: 'Stag entries are not available for this event',
                  type: 'error'
                });
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
              <div className="relative px-6 py-5  ">
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
                    <div className="space-y-6 max-w-xl mx-auto">
                      {[...Array(guestCount)].map((_, index) => (
                        <GuestFormFields
                          key={index}
                          index={index}
                          title="Guest"
                          fields={stagFields.map(field => ({
                            ...field,
                            name: field.name(index),
                            type: field.type
                          }))}
                          errors={formErrors}
                          onFieldChange={handleFieldChange}
                          layout="single"
                        />
                      ))}
                      
                      {/* Guest Controls */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {guestCount > 1 && (
                            <button
                              type="button"
                              onClick={handleRemoveGuest}
                              className="flex items-center gap-1 px-3 py-1 text-sm text-red-500/80 hover:text-red-600/80 bg-white/5 rounded-lg transition-colors"
                            >
                              <Trash size={16} />
                              <span className="hidden sm:inline">Remove Guest</span>
                            </button>
                          )}
                          {guestCount < maxGuests && (
                            <button
                              type="button"
                              onClick={handleAddGuest}
                              className="flex items-center gap-1 px-3 py-1 text-sm text-white/70 hover:text-white bg-white/5 rounded-lg transition-colors"
                            >
                              <Plus size={16} />
                              <span className="hidden sm:inline">Add Guest</span>
                            </button>
                          )}
                        </div>
                        <span className="text-sm text-white/50">
                          {guestCount} of {maxGuests} guests
                        </span>
                      </div>

                      <div className="flex justify-end pt-4">
                        <button
                          type="submit"
                          disabled={isPending}
                          className="bg-[#E5FF10] hover:bg-[#E5FF10]/80 text-black font-helvetica  px-6 py-2 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isPending ? 'Submitting...' : 'Submit'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {[...Array(guestCount)].map((_, index) => (
                        <GuestFormFields
                          key={index}
                          index={index}
                          title="Couple"
                          fields={coupleFields.map(field => ({
                            ...field,
                            name: field.name(index),
                            type: field.type
                          }))}
                          errors={formErrors}
                          onFieldChange={handleFieldChange}
                        />
                      ))}

                      {/* Couple Controls */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {guestCount > 1 && (
                            <button
                              type="button"
                              onClick={handleRemoveGuest}
                              className="flex items-center gap-1 px-3 py-1 text-sm text-red-500/80 hover:text-red-600/80 bg-white/5 rounded-lg transition-colors"
                            >
                              <Trash size={16} />
                              <span className="hidden sm:inline">Remove Couple</span>
                            </button>
                          )}
                          {guestCount < maxGuests && (
                            <button
                              type="button"
                              onClick={handleAddGuest}
                              className="flex items-center gap-1 px-3 py-1 text-sm text-white/70 hover:text-white bg-white/5 rounded-lg transition-colors"
                            >
                              <Plus size={16} />
                              <span className="hidden sm:inline">Add Couple</span>
                            </button>
                          )}
                        </div>
                        <span className="text-sm text-white/50">
                          {guestCount} of {maxGuests} couples
                        </span>
                      </div>

                      <div className="flex justify-end pt-4">
                        <button
                          type="submit"
                          disabled={isPending}
                          className="bg-[#E5FF10] hover:bg-[#E5FF10]/80 text-black font-helvetica px-6 py-2 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isPending ? 'Submitting...' : 'Submit'}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
          </div>
        </div>
      </div>
      </div>
  );
}
