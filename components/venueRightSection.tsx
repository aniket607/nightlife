import { startOfDay } from "date-fns";
import { EventCard } from "./event-card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

interface Event {
    eventId: number;
    eventName: string;
    eventDescription: string | null;
    eventDate: Date;
    eventTime: Date;
    stagGlCount: number;
    coupleGl: boolean;
    coupleGlCount: number | null;
    eventImgUrl: string|null;
    eventType: string;
    venueId: string;
    userId: string;
    featuredEvent: boolean | null;
    createdAt: Date;
}

interface VenueRightSectionProps {
    eventsData: Event[];
}
interface EventsResult {
    upcomingEvents: Event[];
    pastEvents: Event[];
  }

export function VenueRightSection({ eventsData }: VenueRightSectionProps) {
    const now = new Date();
    const start = startOfDay(now);
    const { upcomingEvents, pastEvents } = eventsData.reduce<EventsResult>((acc, event) => {
        if (new Date(event.eventDate) > start) {
          acc.upcomingEvents.push(event);
        } else {
          acc.pastEvents.push(event);
        }
        return acc;
      }, { upcomingEvents: [], pastEvents: [] } as EventsResult);
      console.log(upcomingEvents)
      console.log(pastEvents)
    return(
        <div className="mx-auto">
             {/* Past Events Accordion */}
            <Accordion type="single" collapsible defaultValue="past-events" className="min-w-[800px] max-w-[800px] shadow shadow-gray-600/60 rounded-2xl">
                <AccordionItem value="past-events" className="border-white/50 rounded-2xl hover:border-white/70">
                <AccordionTrigger className="text-xl font-bold text-white hover:text-white/80 px-5">
                    PAST EVENTS
                </AccordionTrigger>
                <AccordionContent className="mx-2 md:mx-16">
                    <div className="flex flex-col gap-10 pt-6">
                            {pastEvents.map((pastEvent) => (
                        <div key={pastEvent.eventId}>
                        <EventCard {...pastEvent} isPastEvent={true} venue={{venueName: pastEvent.eventName}}/>
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
                        {upcomingEvents.map((upcomingEvent) => (
                    <div key={upcomingEvent.eventId}>
                    <EventCard {...upcomingEvent} isPastEvent={false} venue={{venueName: upcomingEvent.eventName}}/>
                    </div>
                    ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
    );
}