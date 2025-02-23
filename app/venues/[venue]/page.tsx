import fetchEventsOfVenue from "@/actions/fetchEventsOfVenue";
import { StarsBackground } from "@/components/ui/stars-background";
import { VenueLeftSection } from "@/components/venueLeftSection";
import { VenueRightSection } from "@/components/venueRightSection";

interface PageProps {
  params: Promise<{ venue: string }>
}

export default async function VenuePage({ params }: PageProps) {
  // Await the params before using them
  const { venue } = await params;
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
    <div className="w-full max-w-[1400px] mx-auto md:px-6 pt-24 md:pt-36 pb-20 relative z-10">
      <div className="flex flex-col md:flex-row md:gap-12">
        {/* Left section - scrollable on mobile, fixed on desktop */}
        <div className="w-full md:w-[400px] md:fixed md:top-36 z-20">
          <VenueLeftSection venueData={venueData} />
        </div>

        {/* Placeholder for fixed section - only visible on desktop */}
        <div className="hidden md:block md:w-[400px] md:flex-shrink-0"></div>

        {/* Right section */}
        <div className="w-full md:w-[900px] mt-8 md:mt-0 relative z-20">
          <VenueRightSection eventsData={venueData.events} venue={venueName}/>
        </div>
      </div>
    </div>
    </>
  )
}