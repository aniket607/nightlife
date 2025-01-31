"use client"

import { redirect } from 'next/navigation'
import { FormToggle } from '@/components/ui/form-toggle'
import { useState, use } from 'react'
import { motion } from 'motion/react';
import { TextMorph } from '@/components/ui/text-morph';
import { GlowEffect } from '@/components/ui/glow-effect';
import { cn } from '@/lib/utils';

interface PageProps {
  params: Promise<{
    venue: string
  }>,
  searchParams: Promise<{
    eventId?: string
  }>
}

interface StagGuestlist {
  guestName: string;
  guestAge: number;
  guestMobile: string;
  guestEmail: string;
}

interface CoupleGuestlist {
  maleName: string;
  femaleName: string;
  maleAge: number;
  femaleAge: number;
  maleMobile: string;
  femaleMobile: string;
  maleEmail: string;
  femaleEmail?: string;
}

export default function JoinGuestlistPage({ params, searchParams }: PageProps) {
  const { venue } = use(params);
  const { eventId } = use(searchParams);
  const [formType, setFormType] = useState<'stag' | 'couple'>('stag');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stagForm, setStagForm] = useState<StagGuestlist>({
    guestName: '',
    guestAge: 0,
    guestMobile: '',
    guestEmail: '',
  });
  const [coupleForm, setCoupleForm] = useState<CoupleGuestlist>({
    maleName: '',
    femaleName: '',
    maleAge: 0,
    femaleAge: 0,
    maleMobile: '',
    femaleMobile: '',
    maleEmail: '',
    femaleEmail: '',
  });

  if (!eventId) {
    redirect(`/venues/${venue}`);
  }

  const handleSubmit = () => {
    setIsSubmitting(true);
    // form submission logic with the appropriate form data
    const formData = formType === 'stag' ? stagForm : coupleForm;
    console.log('Submitting:', formData);
    
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  const handleStagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStagForm(prev => ({
      ...prev,
      [name]: name === 'guestAge' ? parseInt(value) || 0 : value,
    }));
  };

  const handleCoupleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCoupleForm(prev => ({
      ...prev,
      [name]: name.includes('Age') ? parseInt(value) || 0 : value,
    }));
  };

  return (
    <div className="container mx-auto mt-24 px-4">
      <h1 className="text-4xl font-bold text-white text-center mb-12">Join Guestlist</h1>
      <div className="max-w-4xl mx-auto">
        <div className="bg-primary backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-xl">
          {/* Form Toggle */}
          <FormToggle onToggle={setFormType} />
          
          {/* Form Container */}
          <div className="mt-8">
            <div className="relative h-[400px] bg-zinc-900/50 rounded-xl">
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  opacity: isSubmitting ? 1 : 0,
                }}
                transition={{
                  duration: 0.2,
                  ease: 'easeOut',
                }}
              >
                <GlowEffect
                  colors={['#0894FF', '#C959DD', '#FF2E54', '#FF9004']}
                  mode='colorShift'
                  blur='medium'
                  duration={4}
                />
              </motion.div>

              {/* Form Content */}
              <div className="relative h-full px-6 py-5">
                {formType === 'stag' ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="guestName"
                      value={stagForm.guestName}
                      onChange={handleStagChange}
                      placeholder="Full Name"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/20"
                    />
                    <input
                      type="number"
                      name="guestAge"
                      value={stagForm.guestAge || ''}
                      onChange={handleStagChange}
                      placeholder="Age"
                      min="18"
                      max="100"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/20"
                    />
                    <input
                      type="tel"
                      name="guestMobile"
                      value={stagForm.guestMobile}
                      onChange={handleStagChange}
                      placeholder="Phone Number"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/20"
                    />
                    <input
                      type="email"
                      name="guestEmail"
                      value={stagForm.guestEmail}
                      onChange={handleStagChange}
                      placeholder="Email"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/20"
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className={cn(
                          "group relative flex h-12 items-center gap-2 overflow-hidden rounded-full px-6",
                          "bg-white/10 backdrop-blur-lg border border-white/20",
                          "hover:border-white/30 transition-all duration-300",
                          "disabled:opacity-50 disabled:cursor-not-allowed"
                        )}
                      >
                        <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                          <TextMorph>{isSubmitting ? 'Submitting...' : 'Submit'}</TextMorph>
                        </span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="maleName"
                        value={coupleForm.maleName}
                        onChange={handleCoupleChange}
                        placeholder="Male Name"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/20"
                      />
                      <input
                        type="text"
                        name="femaleName"
                        value={coupleForm.femaleName}
                        onChange={handleCoupleChange}
                        placeholder="Female Name"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/20"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="number"
                        name="maleAge"
                        value={coupleForm.maleAge || ''}
                        onChange={handleCoupleChange}
                        placeholder="Male Age"
                        min="18"
                        max="100"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/20"
                      />
                      <input
                        type="number"
                        name="femaleAge"
                        value={coupleForm.femaleAge || ''}
                        onChange={handleCoupleChange}
                        placeholder="Female Age"
                        min="18"
                        max="100"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/20"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="tel"
                        name="maleMobile"
                        value={coupleForm.maleMobile}
                        onChange={handleCoupleChange}
                        placeholder="Male Phone Number"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/20"
                      />
                      <input
                        type="tel"
                        name="femaleMobile"
                        value={coupleForm.femaleMobile}
                        onChange={handleCoupleChange}
                        placeholder="Female Phone Number"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/20"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="email"
                        name="maleEmail"
                        value={coupleForm.maleEmail}
                        onChange={handleCoupleChange}
                        placeholder="Male Email"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/20"
                      />
                      <input
                        type="email"
                        name="femaleEmail"
                        value={coupleForm.femaleEmail}
                        onChange={handleCoupleChange}
                        placeholder="Female Email (Optional)"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/20"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className={cn(
                          "group relative flex h-12 items-center gap-2 overflow-hidden rounded-full px-6",
                          "bg-white/10 backdrop-blur-lg border border-white/20",
                          "hover:border-white/30 transition-all duration-300",
                          "disabled:opacity-50 disabled:cursor-not-allowed"
                        )}
                      >
                        <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                          <TextMorph>{isSubmitting ? 'Submitting...' : 'Submit'}</TextMorph>
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
