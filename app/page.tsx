import { VenueCard } from "@/components/venue-card"
import { Waves } from "@/components/ui/waves-background"
import { ExploreButton } from "@/components/ui/explore-button"

const featuredVenues = [
  {
    name: "Notch Indore",
    description: "Premium nightclub featuring world-class DJs",
    rating: 4.1,
    imageUrl: "https://aws-nightlife.s3.eu-north-1.amazonaws.com/1736529631197-notch.jpg"
  },
  {
    name: "Dopamine",
    description: "Sophisticated cocktail bar with live music",
    rating: 4.2,
    imageUrl: "https://aws-nightlife.s3.eu-north-1.amazonaws.com/1736530138889-dopamine.jpg"
  },
  {
    name: " Kave - Sky.Sip.Dine",
    description: "Underground electronic music venue",
    rating: 3,
    imageUrl: "https://aws-nightlife.s3.eu-north-1.amazonaws.com/1736768662847-Kave.jpg"
  }
]

export default function Home() {
  return (
    <main className="relative">
      {/* Hero Section */}
      <div className="relative min-h-screen w-screen z-20">
        {/* Hero Background */}
        <div className="absolute inset-0">
          {/* Dancing GIF Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("/dancing.gif")',
            }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/65 to-black">
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black backdrop-blur-lg" />
          </div>
        </div>

        <div className="relative z-50 h-full flex flex-col items-center justify-center text-white px-4 py-32">
          <h1 className="text-4xl md:text-6xl font-bold font-futura text-center mb-6 marble-gradient leading-normal md:leading-normal">
            Discover Your Perfect Night Out
          </h1>
          <p className="text-xl md:text-2xl text-center max-w-2xl mb-8 font-light">
            Skip the line and get free entry to the hottest clubs in your city. Join the guestlist now!
          </p>
          <div className="relative">
            <ExploreButton />
          </div>
        </div>
      </div>

      {/* Featured Venues Section */}
      <section id="featured-venues" className="relative py-24 px-6 bg-black">
        {/* Content */}
        <div className="relative z-50 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Featured Venues</h2>
            <p className="text-xl text-[#9ca3af]">Discover the hottest clubs and bars in your area</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredVenues.map((venue, index) => (
              <div key={venue.name} className="relative" style={{ zIndex: 20 + index }}>
                <VenueCard {...venue} />
              </div>
            ))}
          </div>

          <div className="text-center mt-20">
            <a 
              href="/venues" 
              className="inline-block border-2 border-white text-white hover:bg-white hover:text-[#ed6969] px-8 py-4 rounded-2xl transition-all duration-300 text-lg font-semibold"
            >
              View All Venues
            </a>
          </div>
        </div>
      </section>

      {/* Waves Background - Fixed for entire page, on top of other backgrounds */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 10 }}>
        <div className="absolute inset-0 bg-black/50" /> {/* Semi-transparent overlay */}
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
    </main>
  )
}
