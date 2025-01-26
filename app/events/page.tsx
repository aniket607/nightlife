import { StarsBackground } from "@/components/ui/stars-background";
import fetchAllEvents from "@/actions/fetchAllEvents";
import { EventCard } from "@/components/event-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default async function EventsPage() {
  const events = await fetchAllEvents()
  const {pastEvents, upcomingEvents} = events

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
      <div className="relative z-10 py-20 md:py-32 px-2 md:px-4 flex flex-col items-center">
        <div className="text-center mb-16 px-2">
          <h2 className="text-4xl font-bold mb-4 text-white">Discover Events</h2>
          <p className="text-xl text-[#9ca3af]">Discover the hottest events in your City</p>
        </div>

        <div className="w-full max-w-[1200px] mx-auto space-y-6 px-4">
            {/* Past Events Accordion */}
            <Accordion type="single" collapsible className="w-full shadow shadow-gray-600/60 rounded-2xl">
            <AccordionItem value="past-events" className="border-white/50 rounded-2xl hover:border-white/70">
              <AccordionTrigger className="text-xl font-bold text-white hover:text-white/80 px-5">
                PAST EVENTS
              </AccordionTrigger>
              <AccordionContent className="mx-2 md:mx-16">
                <div className="flex flex-col gap-10 pt-6">
                  {pastEvents.map((event) => (
                    <div key={event.eventId}>
                      <EventCard {...event} isPastEvent={true} />
                    </div>
                  ))}
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
              <AccordionContent className="mx-2 md:mx-16">
                <div className="flex flex-col gap-10 pt-6">
                  {upcomingEvents.map((event) => (
                    <div key={event.eventId}>
                      <EventCard {...event} isPastEvent={false} />
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

        
        </div>
      </div>
    </div>
  )
}
