import { VenueCard } from "@/components/venue-card"
import { Waves } from "@/components/ui/waves-background"
import { ExploreButton } from "@/components/ui/explore-button"
import { EventCard } from "@/components/event-card"
import Link from "next/link"
import fetchFeatured from "@/actions/fetchFeatured"

export default async function Home() {
  const { featuredVenues, featuredEvents } = await fetchFeatured();

  return (
    <main className="relative overflow-x-hidden">
      {/* Background Waves*/}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <div className="absolute inset-0 bg-black/50" />
        <Waves
          lineColor="rgba(255, 255, 255, 0.2)"
          backgroundColor="transparent"
          waveSpeedX={0.015}
          waveSpeedY={0.01}
          waveAmpX={50}
          waveAmpY={25}
          friction={0.9}
          tension={0.01}
          maxCursorMove={150}
          xGap={15}
          yGap={40}
        />
      </div>

      {/* Hero Section */}
      <div className="relative min-h-screen w-full">
        {/* Hero Background Layers */}
        <div className="absolute left-1/2 -translate-x-1/2 w-screen h-full pointer-events-none" style={{ zIndex: 2 }}>
          {/* Dancing GIF Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("/dancing.gif")',
            }}
          />
          
          {/* Gradient Overlay of GIF */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/65 to-black">
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black backdrop-blur-lg" />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-white px-4 py-32" style={{ zIndex: 50 }}>
          <h1 className="text-4xl md:text-6xl font-bold font-futura text-center mb-6 marble-gradient leading-normal md:leading-normal">
            Discover Your Perfect Night Out
          </h1>
          <p className="text-xl md:text-2xl font-helvetica text-center max-w-2xl mb-8 font-light">
            Skip the line and get free entry to the hottest clubs in your city.<br/> Join the guestlist now!
          </p>
          <ExploreButton />
        </div>
      </div>
        
      {/* Featured Venues Section */}
      <section id="featured-venues" className="relative py-24 px-6 bg-black">
        {/* Content */}
        <div className="relative max-w-7xl mx-auto" style={{ zIndex: 50 }}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Featured Venues</h2>
            <p className="text-xl text-[#9ca3af]">Discover the hottest clubs and bars in your area</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredVenues.map((venue) => (
              <div key={venue.venueName} className="relative">
                <VenueCard {...venue} />
              </div>
            ))}
          </div>

          <div className="text-center mt-20">
          <Link 
            href="/venues" 
            className="inline-block border-2 border-white text-white hover:bg-white/70 hover:text-black px-8 py-4 rounded-2xl transition-all duration-500 ease-in-out text-lg font-semibold"
          >
            View All Venues
          </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-36 px-6 bg-black">
        <div className="relative max-w-7xl mx-auto" style={{ zIndex: 50 }}>
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white font-futura">How It Works</h2>
            <p className="text-xl text-[#b3b9c2] font-helvetica">Get on the guestlist in three simple steps:</p>
          </div>
          
          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {/* Step 1 */}
            <div className="group flex flex-col items-center">
              <div className="w-24 h-24 mb-8 bg-black/40 backdrop-blur-xl rounded-full flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] border border-white/30">
                <div className="w-12 h-12 text-white/80">
                  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold font-helvetica text-white mb-4 text-center">Browse Venues</h3>
              <p className="text-[#9ca3af] text-center text-lg">Explore our curated selection of premium clubs and bars in your area</p>
            </div>

            {/* Step 2 */}
            <div className="group flex flex-col items-center">
              <div className="w-24 h-24 mb-8 bg-black/40 backdrop-blur-xl rounded-full flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] border border-white/30">
                <div className="w-12 h-12 text-white/80">
                  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold font-helvetica text-white mb-4 text-center">Join Guestlist</h3>
              <p className="text-[#9ca3af] text-center text-lg">Select your preferred Event and add your name to the guestlist</p>
            </div>

            {/* Step 3 */}
            <div className="group flex flex-col items-center">
              <div className="w-24 h-24 mb-8 bg-black/40 backdrop-blur-xl rounded-full flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] border border-white/30">
                <div className="w-12 h-12 text-white/80">
                  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold font-helvetica text-white mb-4 text-center">Enjoy VIP Entry</h3>
              <p className="text-[#9ca3af] text-center text-lg">Skip the line and enjoy free entry at your chosen venue</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="relative py-24 px-6 bg-black" >
        <div className="relative max-w-7xl mx-auto " style={{ zIndex: 50 }}>
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white font-futura">Featured Events</h2>
            <p className="text-xl text-[#b3b9c2] font-helvetica">Don&apos;t miss out on these exclusive parties :</p>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 gap-8 place-items-center">
            {featuredEvents.map((event) => (
              <div key={event.eventName} className="relative">
                <EventCard {...event} />
              </div>
            ))}
            
          </div>

          {/* View All Events Button */}
          <div className="text-center mt-16">
            <a 
              href="/events" 
              className="inline-block border-2 border-white text-white hover:bg-white/70 hover:text-black px-8 py-4 rounded-2xl transition-all duration-500 ease-in-out text-lg font-semibold"
            >
              View All Events
            </a>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="relative py-16 px-6">
        {/* Glass Effect Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 backdrop-blur-xl" style={{ zIndex: 1 }} />
        
        <div className="relative max-w-7xl mx-auto" style={{ zIndex: 2 }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">NightLife</h2>
              <p className="text-[#9ca3af] text-sm">
                Your premier destination for hassle-free nightlife experiences and exclusive club access.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-[#9ca3af] hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/about" className="text-[#9ca3af] hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/venues" className="text-[#9ca3af] hover:text-white transition-colors">Venues</Link></li>
                <li><Link href="/events" className="text-[#9ca3af] hover:text-white transition-colors">Events</Link></li>
                <li><Link href="/contact" className="text-[#9ca3af] hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
              <ul className="space-y-2">
                <li className="text-[#9ca3af] hover:text-white transition-colors">
                  <Link href="/guestlist">Guestlist Entry</Link>
                </li>
                <li className="text-[#9ca3af]/60 flex items-center gap-2">
                  VIP Tables
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">Coming Soon</span>
                </li>
                <li className="text-[#9ca3af]/60 flex items-center gap-2">
                  Private Events
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">Coming Soon</span>
                </li>
                <li className="text-[#9ca3af]/60 flex items-center gap-2">
                  Corporate Bookings
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">Coming Soon</span>
                </li>
                <li className="text-[#9ca3af]/60 flex items-center gap-2">
                  Birthday Packages
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">Coming Soon</span>
                </li>
              </ul>
            </div>

            {/* Stay Updated */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
              <p className="text-[#9ca3af] text-sm mb-4">Subscribe to our newsletter for exclusive offers and updates</p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-white/50"
                />
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-[#9ca3af] text-sm">© 2025 NightLife. All rights reserved.</p>
              <div className="flex gap-6">
                <Link href="/privacy" className="text-[#9ca3af] hover:text-white text-sm transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="text-[#9ca3af] hover:text-white text-sm transition-colors">Terms of Service</Link>
                <Link href="/cookies" className="text-[#9ca3af] hover:text-white text-sm transition-colors">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
