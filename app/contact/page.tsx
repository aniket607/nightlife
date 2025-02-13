"use client"

import { Suspense } from 'react';
import { StarsBackground } from "@/components/ui/stars-background";

export default function ContactPage() {
  const handleEmailClick = () => {
    window.location.href = "mailto:support@nightlife.com";
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:+917974767742";
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/+917974767742", "_blank");
  };

  return (
    <div className="min-h-screen w-full bg-black">
      {/* Stars Background with fixed positioning */}
      <Suspense fallback={<div className="fixed inset-0 bg-black" />}>
        <div className="fixed inset-0 z-0">
          <StarsBackground
            starDensity={0.00015}
            allStarsTwinkle={false}
            twinkleProbability={0.5}
            minTwinkleSpeed={1.0}
            maxTwinkleSpeed={2.0}
          />
        </div>
      </Suspense>

      {/* Content */}
      <div className="relative z-10 py-20 md:py-32 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Contact Us</h2>
            <p className="text-xl text-[#9ca3af]">Get in touch with our support team</p>
          </div>

          <div className="space-y-8">
            {/* Email Card */}
            <button 
              onClick={handleEmailClick}
              className="w-full group bg-gradient-to-br from-white/5 via-white/5 to-white/10 hover:from-white/10 hover:via-white/10 hover:to-white/15 border border-white/10 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              <div className="flex items-center gap-6">
                <div className="p-4 bg-purple-500/20 rounded-xl group-hover:bg-purple-500/30 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">Email Support</h3>
                  <p className="text-[#9ca3af] group-hover:text-white/80 transition-colors">support@nightlife.com</p>
                </div>
              </div>
            </button>

            {/* Phone Card */}
            <button 
              onClick={handlePhoneClick}
              className="w-full group bg-gradient-to-br from-white/5 via-white/5 to-white/10 hover:from-white/10 hover:via-white/10 hover:to-white/15 border border-white/10 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              <div className="flex items-center gap-6">
                <div className="p-4 bg-purple-500/20 rounded-xl group-hover:bg-purple-500/30 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">Phone Support</h3>
                  <p className="text-[#9ca3af] group-hover:text-white/80 transition-colors">+91 7974767742</p>
                </div>
              </div>
            </button>

            {/* WhatsApp Card */}
            <button 
              onClick={handleWhatsAppClick}
              className="w-full group bg-gradient-to-br from-white/5 via-white/5 to-white/10 hover:from-white/10 hover:via-white/10 hover:to-white/15 border border-white/10 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              <div className="flex items-center gap-6">
                <div className="p-4 bg-purple-500/20 rounded-xl group-hover:bg-purple-500/30 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">WhatsApp</h3>
                  <p className="text-[#9ca3af] group-hover:text-white/80 transition-colors">Message us on WhatsApp</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}