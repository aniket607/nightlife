import fetchVenues from "@/actions/fetchVenues"
import { StarsBackground } from "@/components/ui/stars-background";
import { VenueCard } from "@/components/venue-card";

export default async function VenuesPage() {
  const venues = await fetchVenues()
  
  return (
    <div className="min-h-screen w-full bg-black">
      {/* Stars Background with fixed positioning */}
      <div className="fixed inset-0 z-0">
        <StarsBackground
          starDensity={0.00030}
          allStarsTwinkle={true}
          twinkleProbability={1}
          minTwinkleSpeed={2.0}
          maxTwinkleSpeed={2.0}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 py-20 md:py-32 px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">Discover Venues</h2>
          <p className="text-xl text-[#9ca3af]">Discover the hottest clubs and bars in your City</p>
        </div>
        
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {venues.map((venue) => (
              <div key={venue.venueName} className="relative">
                <VenueCard {...venue} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
