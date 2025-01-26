import fetchEventsOfVenue from "@/actions/fetchEventsOfVenue";
import { VenueLeftSection } from "@/components/venueLeftSection";
import { VenueRightSection } from "@/components/venueRightSection";

interface PageProps {
  params: { venue: string }
}

export default async function VenuePage({ params }: PageProps) {
  // Await the params before using them
  const { venue } = await Promise.resolve(params);
  const decodedVenue = decodeURIComponent(venue);
  const venueData = await fetchEventsOfVenue(decodedVenue);

  if (!venueData) {
    return <div>Loading...</div>; // or some error state
  }

  return (
    <div className="flex flex-col md:flex-row container mx-auto mt-1 md:mt-48">
      <VenueLeftSection venueData={venueData} />
      <VenueRightSection eventsData={venueData.events}/>
    </div>
  )
}