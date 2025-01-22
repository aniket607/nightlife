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
      <div className="relative z-10 pt-24 px-4">
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
