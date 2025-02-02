import fetchEventsOfVenue from "@/actions/fetchEventsOfVenue";
import { StarsBackground } from "@/components/ui/stars-background";
import { VenueLeftSection } from "@/components/venueLeftSection";
import { VenueRightSection } from "@/components/venueRightSection";

interface PageProps {
  params: { venue: string }
}

export default async function VenuePage({ params }: PageProps) {
  // Await the params before using them
  const { venue } = await Promise.resolve(params);
  const venueName = decodeURIComponent(venue);
  const venueData = await fetchEventsOfVenue(venueName);

  if (!venueData) {
    return <div>Loading...</div>; // or some error state
  }

  return (
    <>
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
    <div className="flex flex-col md:flex-row container mx-auto mt-1 md:mt-48">
      <VenueLeftSection venueData={venueData} />
      <VenueRightSection eventsData={venueData.events} venue={venueName}/>
    </div>
    </>
  )
}