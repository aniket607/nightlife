import { BackgroundPlus } from "@/components/ui/plusBg";

export default function About() {
  return (
    <div className="min-h-screen w-full bg-black">
      {/* Plus gradient background */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center pointer-events-none">
        <div
          className="h-32 w-[90%] bg-[rgb(54,157,253)] bg-opacity-80 md:bg-opacity-90 blur-[337.4px]"
          style={{ transform: "rotate(-40deg)" }}
        />
      </div>
      <BackgroundPlus className="fixed bottom-0 left-0 w-full h-full opacity-70 md:opacity-50" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-futura">About NightLife</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-helvetica">
            Revolutionizing your nightlife experience with seamless guestlist access to the best venues in town.
          </p>
        </div>

        {/* Mission Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-gradient-to-br from-slate-900/60 via-zinc-900/80 to-slate-900/90 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-xl">
            <h2 className="text-3xl font-bold text-white mb-6 font-futura">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              At NightLife, we&apos;re on a mission to transform how you experience the city&apos;s vibrant nightlife. 
              We believe everyone deserves VIP treatment and hassle-free access to the best venues and events.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Our platform connects party-goers with exclusive venues, ensuring you never miss out on the hottest events 
              and always get the VIP treatment you deserve.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Feature 1 */}
          <div className="bg-black/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Exclusive Access</h3>
            <p className="text-gray-400">Skip the lines and enjoy priority entry at the city&apos;s most exclusive venues.</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-black/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Real-Time Updates</h3>
            <p className="text-gray-400">Stay informed about events, guest lists, and special promotions in real-time.</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-black/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Verified Venues</h3>
            <p className="text-gray-400">All our partner venues are carefully selected and verified for quality assurance.</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">50+</div>
            <div className="text-gray-400">Partner Venues</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">10K+</div>
            <div className="text-gray-400">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">100+</div>
            <div className="text-gray-400">Events Monthly</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">4.8</div>
            <div className="text-gray-400">User Rating</div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <div className="inline-block bg-gradient-to-br from-slate-900/60 via-zinc-900/80 to-slate-900/90 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Experience the Night?</h2>
            <p className="text-gray-300 mb-6">Join thousands of party-goers who have already elevated their nightlife experience.</p>
            <button className="bg-[#E5FF10] hover:bg-[#E5FF10]/80 text-black font-bold py-3 px-8 rounded-xl transition-all">
              Join Guestlist Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 