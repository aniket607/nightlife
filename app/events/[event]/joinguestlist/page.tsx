"use client"

import { FormToggle } from '@/components/ui/form-toggle'
import { useState, use, useTransition, useRef } from 'react'
import handleGuestlistSubmit from '@/actions/handleGuestlistSubmit';
import { Plus, Minus, X } from 'lucide-react';

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
    <div className="container mx-auto mt-24 px-4">
      <h1 className="text-4xl font-bold text-white text-center mb-12">Join Guestlist</h1>
      
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

      <div className="max-w-4xl mx-auto">
        <div className="bg-primary backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-xl">
          <FormToggle 
            onToggle={(value) => {
              setFormType(value);
              setGuestCount(1);
            }} 
            className="mb-6"
          />
          
          {/* Form Container */}
          <div className="mt-8 mx-auto">
            <div className="relative bg-zinc-900/50 rounded-xl">
              {/* Form Content */}
              <div className="relative px-6 py-5">
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
                        <div key={index} className="space-y-4 p-4 bg-white/5 rounded-lg">
                          <h3 className="text-white font-medium">Guest {index + 1}</h3>
                          <div className="space-y-2">
                            <label htmlFor={`guestName${index}`} className="block text-sm font-medium text-white">
                              Guest Name
                            </label>
                            <input
                              id={`guestName${index}`}
                              type="text"
                              name={`guests[${index}].name`}
                              placeholder="Enter full name"
                              required
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/20"
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor={`guestAge${index}`} className="block text-sm font-medium text-white">
                              Age
                            </label>
                            <input
                              id={`guestAge${index}`}
                              type="number"
                              name={`guests[${index}].age`}
                              placeholder="Must be 18 or older"
                              required
                              min="18"
                              max="100"
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/20"
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor={`guestMobile${index}`} className="block text-sm font-medium text-white">
                              Mobile Number
                            </label>
                            <input
                              id={`guestMobile${index}`}
                              type="tel"
                              name={`guests[${index}].mobile`}
                              required
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/20"
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor={`guestEmail${index}`} className="block text-sm font-medium text-white">
                              Email
                            </label>
                            <input
                              id={`guestEmail${index}`}
                              type="email"
                              name={`guests[${index}].email`}
                              required
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/20"
                            />
                          </div>
                        </div>
                      ))}
                      
                      {/* Guest Controls */}
                      <div className="flex justify-between items-center pt-4">
                        <div className="flex items-center gap-2">
                          {guestCount > 1 && (
                            <button
                              type="button"
                              onClick={handleRemoveGuest}
                              className="flex items-center gap-1 px-3 py-1 text-sm text-white/70 hover:text-white bg-white/5 rounded-lg transition-colors"
                            >
                              <Minus size={16} />
                              Remove Guest
                            </button>
                          )}
                          {guestCount < maxGuests && (
                            <button
                              type="button"
                              onClick={handleAddGuest}
                              className="flex items-center gap-1 px-3 py-1 text-sm text-white/70 hover:text-white bg-white/5 rounded-lg transition-colors"
                            >
                              <Plus size={16} />
                              Add Guest
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
                          className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isPending ? 'Submitting...' : 'Submit'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {[...Array(guestCount)].map((_, index) => (
                        <div key={index} className="space-y-4 p-4 bg-white/5 rounded-lg">
                          <h3 className="text-white font-medium">Couple {index + 1}</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label htmlFor={`maleName${index}`} className="block text-sm font-medium text-white">
                                Male Name
                              </label>
                              <input
                                id={`maleName${index}`}
                                type="text"
                                name={`couples[${index}].male.name`}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/20"
                              />
                            </div>
                            <div className="space-y-2">
                              <label htmlFor={`femaleName${index}`} className="block text-sm font-medium text-white">
                                Female Name
                              </label>
                              <input
                                id={`femaleName${index}`}
                                type="text"
                                name={`couples[${index}].female.name`}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/20"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label htmlFor={`maleAge${index}`} className="block text-sm font-medium text-white">
                                Male Age
                              </label>
                              <input
                                id={`maleAge${index}`}
                                type="number"
                                name={`couples[${index}].male.age`}
                                required
                                min="18"
                                max="100"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/20"
                              />
                            </div>
                            <div className="space-y-2">
                              <label htmlFor={`femaleAge${index}`} className="block text-sm font-medium text-white">
                                Female Age
                              </label>
                              <input
                                id={`femaleAge${index}`}
                                type="number"
                                name={`couples[${index}].female.age`}
                                required
                                min="18"
                                max="100"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/20"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label htmlFor={`maleMobile${index}`} className="block text-sm font-medium text-white">
                                Male Mobile Number
                              </label>
                              <input
                                id={`maleMobile${index}`}
                                type="tel"
                                name={`couples[${index}].male.mobile`}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/20"
                              />
                            </div>
                            <div className="space-y-2">
                              <label htmlFor={`femaleMobile${index}`} className="block text-sm font-medium text-white">
                                Female Mobile Number
                              </label>
                              <input
                                id={`femaleMobile${index}`}
                                type="tel"
                                name={`couples[${index}].female.mobile`}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/20"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label htmlFor={`maleEmail${index}`} className="block text-sm font-medium text-white">
                                Male Email
                              </label>
                              <input
                                id={`maleEmail${index}`}
                                type="email"
                                name={`couples[${index}].male.email`}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/20"
                              />
                            </div>
                            <div className="space-y-2">
                              <label htmlFor={`femaleEmail${index}`} className="block text-sm font-medium text-white">
                                Female Email
                              </label>
                              <input
                                id={`femaleEmail${index}`}
                                type="email"
                                name={`couples[${index}].female.email`}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/20"
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Couple Controls */}
                      <div className="flex justify-between items-center pt-4">
                        <div className="flex items-center gap-2">
                          {guestCount > 1 && (
                            <button
                              type="button"
                              onClick={handleRemoveGuest}
                              className="flex items-center gap-1 px-3 py-1 text-sm text-white/70 hover:text-white bg-white/5 rounded-lg transition-colors"
                            >
                              <Minus size={16} />
                              Remove Couple
                            </button>
                          )}
                          {guestCount < maxGuests && (
                            <button
                              type="button"
                              onClick={handleAddGuest}
                              className="flex items-center gap-1 px-3 py-1 text-sm text-white/70 hover:text-white bg-white/5 rounded-lg transition-colors"
                            >
                              <Plus size={16} />
                              Add Couple
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
                          className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
    </div>
  );
}
