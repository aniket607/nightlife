import { VenueCard } from "@/components/venue-card"
import { Waves } from "@/components/ui/waves-background"
import { ExploreButton } from "@/components/ui/explore-button"
import { EventCard } from "@/components/event-card"

const featuredVenues = [
  {
    name: "Notch Indore",
    description: "Premium nightclub featuring world-class DJs",
    rating: 4.1,
    imageUrl: "https://aws-nightlife.s3.eu-north-1.amazonaws.com/1736529631197-notch.jpg",
    venueArea: "Vijay Nagar"
  },
  {
    name: "Dopamine",
    description: "Sophisticated cocktail bar with live music",
    rating: 4.2,
    imageUrl: "https://aws-nightlife.s3.eu-north-1.amazonaws.com/1736530138889-dopamine.jpg",
    venueArea: "Vijay Nagar"
  },
  {
    name: " Kave - Sky.Sip.Dine",
    description: "Underground electronic music venue",
    rating: 3,
    imageUrl: "https://aws-nightlife.s3.eu-north-1.amazonaws.com/1736768662847-Kave.jpg",
    venueArea: "Bypass"
  }
]

export default function Home() {
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
              <div key={venue.name} className="relative">
                <VenueCard {...venue} />
              </div>
            ))}
          </div>

          <div className="text-center mt-20">
            <a 
              href="/venues" 
              className="inline-block border-2 border-white text-white hover:bg-white/70 hover:text-black px-8 py-4 rounded-2xl transition-all duration-500 ease-in-out text-lg font-semibold"
            >
              View All Venues
            </a>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-24 px-6 bg-black">
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
          <div className="grid grid-cols-1 gap-8">
            <EventCard
              title="New Year's Eve Spectacular"
              description="Join us for the biggest party of the year featuring top DJs and spectacular shows. Experience an unforgettable night of music, dance, and celebration as we welcome the new year in style."
              date="Dec 31, 2023"
              time="10 PM - 4 AM"
              venue="Club Enigma"
              category="EDM Night"
              imageUrl="https://aws-nightlife.s3.eu-north-1.amazonaws.com/1736623375790-WhatsApp%20Image%202025-01-11%20at%2016.47.38.jpeg"
              isFeatured={true}
              availableSlots={101}
            />
            <EventCard
              title="Christmas Eve Jazz Night"
              description="An evening of smooth jazz and specialty cocktails in an intimate setting. Let the soulful melodies and festive spirits create the perfect holiday atmosphere."
              date="Dec 24, 2023"
              time="8 PM - 1 AM"
              venue="Neon Lounge"
              category="Live Music"
              imageUrl="https://aws-nightlife.s3.eu-north-1.amazonaws.com/1736873909475-HotredNight.jpg"
              availableSlots={45}
            />
            <EventCard
              title="Deep House Sessions"
              description="Experience the best of underground house music with international DJs. Get ready for a night of deep beats and electronic vibes in the city's most exclusive venue."
              date="Jan 7, 2024"
              time="11 PM - 5 AM"
              venue="Pulse"
              category="House Music"
              imageUrl="https://aws-nightlife.s3.eu-north-1.amazonaws.com/1736799234896-SaturdayParty.jpg"
              availableSlots={73}
            />
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

      
    </main>
  )
}
