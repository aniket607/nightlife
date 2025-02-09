"use client"

import { FormToggle } from '@/components/ui/form-toggle'
import { GuestFormFields } from '@/components/ui/guest-form-fields'
import { useState, use, useTransition, useRef } from 'react'
import handleGuestlistSubmit from '@/actions/handleGuestlistSubmit';

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
    max: '100'
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
    max: '100'
  },
  {
    id: 'femaleAge',
    label: 'Female Age',
    type: 'number',
    name: (index: number) => `couples[${index}].female.age`,
    placeholder: 'Must be 18 or older',
    required: true,
    min: '18',
    max: '100'
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
    placeholder: 'Enter email address (optional)'
  }
];
import { Plus, X , Trash} from 'lucide-react';

interface PageProps {
  searchParams: Promise<{ eventId?: string }>
}

export default function JoinGuestlistPage({ searchParams }: PageProps) {
  const [formType, setFormType] = useState<'stag' | 'couple'>('stag');
  const [guestCount, setGuestCount] = useState(1);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isPending, startTransition] = useTransition();
  const { eventId } = use(searchParams);
  const formRef = useRef<HTMLFormElement>(null);

  const maxGuests = formType === 'stag' ? 3 : 2;
  
  const handleAddGuest = () => {
    if (guestCount < maxGuests) {
      setGuestCount(prev => prev + 1);
    }
  };

  const handleRemoveGuest = () => {
    if (guestCount > 1) {
      setGuestCount(prev => prev - 1);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      try {
        const response = await handleGuestlistSubmit(formData);
        setNotification({
          message: response.message,
          type: response.success ? 'success' : 'error'
        });

        if (response.success) {
          // Reset form if submission was successful
          setGuestCount(1);
          formRef.current?.reset();
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
      
      {/*Confirmation Popup */}
      {notification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          
          <div className={`relative bg-zinc-900 p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 text-center border ${
            notification.type === 'success' ? 'border-green-500' : 'border-red-500'
          }`}>
            <button
              onClick={() => setNotification(null)}
              className="absolute top-2 right-2 p-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full transition-colors"
            >
              <X size={16} />
            </button>
            <div className={`text-xl mb-2 ${
              notification.type === 'success' ? 'text-green-500' : 'text-red-500'
            }`}>
              {notification.type === 'success' ? 'Success!' : 'Error'}
            </div>
            <p className="text-white text-lg mb-6">{notification.message}</p>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto mb-16">
        <div className="bg-gradient-to-br from-slate-900/60 via-zinc-900/80 to-slate-900/90 backdrop-blur-xl rounded-3xl p-2 md:p-8 border border-white/10 shadow-xl">
          <FormToggle 
            onToggle={(value) => {
              setFormType(value);
              setGuestCount(1);
            }} 
            className="mb-6"
          />
          
          {/* Form Container */}
          <div className="mt-8 mx-auto">
              {/* Form Content */}
              <div className="relative px-6 py-5  ">
                <form ref={formRef} onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  handleSubmit(formData);
                }}>
                  <input type="hidden" name="formType" value={formType} />
                  <input type="hidden" name="eventId" value={eventId} />
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
                            name: field.name(index)
                          }))}
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
                            name: field.name(index)
                          }))}
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
