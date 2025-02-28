import { StarsBackground } from "@/components/ui/stars-background";
import fetchAllEvents from "@/actions/fetchAllEvents";
import { EventCard } from "@/components/event-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import EventFilters from "@/components/event-filters";
import { use } from "react";

interface PageProps {
  searchParams: Promise<{ eventType?: string }>;
}

export default function EventsPage({
  searchParams,
}: PageProps) {
  // Get the selected event type from URL params
  const params = use(searchParams);
  const eventType = params.eventType || null;
  
  // Fetch all events (filter them client-side)
  const events = use(fetchAllEvents());
  const { pastEvents, upcomingEvents } = events;

  // Event types for filters
  const eventTypes = [
    "EDM",
    "Bollywood",
    "Techno",
    "Commercial",
    "Old School",
    "Afrobeats",
  ];

  // Filter events client-side based on eventType
  const filteredPastEvents = pastEvents.filter(event => {
    // If no filter or "All" is selected, show all events
    if (!eventType || eventType === "All") return true;
    
    // Filter by exact event type match
    return event.eventType === eventType;
  });
  
  const filteredUpcomingEvents = upcomingEvents.filter(event => {
    // If no filter or "All" is selected, show all events
    if (!eventType || eventType === "All") return true;
    
    // Filter by exact event type match
    return event.eventType === eventType;
  });

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
      <div className="relative z-10 py-20 md:py-32 md:px-4 flex flex-col items-center">
        <div className="text-center mb-8 px-2">
          <h2 className="text-4xl font-bold mb-4 text-white">Discover Events</h2>
          <p className="text-xl text-[#9ca3af]">Discover the hottest events in your City</p>
        </div>

        {/* Event Type Filters */}
        <div className="w-full max-w-[950px] mx-auto mb-10 px-4 overflow-hidden">
          <EventFilters eventTypes={eventTypes} selectedType={eventType} />
        </div>

        <div className="w-full max-w-[950px] mx-auto space-y-6 px-4">
            {/* Past Events Accordion */}
            <Accordion type="single" collapsible className="w-full shadow shadow-gray-600/60 rounded-2xl">
            <AccordionItem value="past-events" className="border-white/50 rounded-2xl hover:border-white/70">
              <AccordionTrigger className="text-xl font-bold text-white hover:text-white/80 px-5">
                PAST EVENTS
              </AccordionTrigger>
              <AccordionContent className="flex justify-center px-3">
                <div className="flex flex-col gap-10 pt-6">
                  {filteredPastEvents.length > 0 ? (
                    filteredPastEvents.map((event) => (
                      <div key={event.eventId}>
                        <EventCard {...event} isPastEvent={true} />
                      </div>
                    ))
                  ) : (
                    <p className="text-white text-center py-4">No past events found for this filter</p>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Upcoming Events Accordion */}
          <Accordion type="single" collapsible defaultValue="upcoming-events" className="w-full shadow shadow-gray-600/70 rounded-2xl mt-10">
            <AccordionItem value="upcoming-events" className="border-white/50 rounded-2xl hover:border-white/70">
              <AccordionTrigger className="text-xl font-bold text-white hover:text-white/80 px-5">
                UPCOMING EVENTS
              </AccordionTrigger>
              <AccordionContent className="flex justify-center px-3">
                <div className="flex flex-col gap-10 pt-6">
                  {filteredUpcomingEvents.length > 0 ? (
                    filteredUpcomingEvents.map((event) => (
                      <div key={event.eventId}>
                        <EventCard {...event} isPastEvent={false} />
                      </div>
                    ))
                  ) : (
                    <p className="text-white text-center py-4">No upcoming events found for this filter</p>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}
