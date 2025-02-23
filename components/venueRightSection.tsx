"use client"
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
    eventsData: Event[],
    venue: string
}
interface EventsResult {
    upcomingEvents: Event[];
    pastEvents: Event[];
  }

export function VenueRightSection({ eventsData, venue }: VenueRightSectionProps) {
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

    return(
        <div className="w-full max-w-[900px] mx-auto px-4">
            {/* Past Events Accordion */}
            <Accordion type="single" collapsible className="w-full shadow shadow-gray-600/60 rounded-2xl mb-6">
                <AccordionItem value="past-events" className="border-white/50 rounded-2xl hover:border-white/70">
                    <AccordionTrigger className="flex flex-1 items-center justify-between py-4 text-xl font-bold text-white hover:text-white/80 px-5">
                        PAST EVENTS
                    </AccordionTrigger>
                    <AccordionContent className="flex justify-center px-3">
                        <div className="flex flex-col gap-10 pt-6">
                            {pastEvents.map((pastEvent) => (
                                <div key={pastEvent.eventId}>
                                    <EventCard {...pastEvent} isPastEvent={true} venue={{venueName: venue}}/>
                                </div>
                            ))}
                            {pastEvents.length === 0 && (
                                <div className="text-center text-white/80 font-bold font-helvetica">
                                    <p>No Past Events</p>
                                </div>
                            )}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            
            {/* Upcoming Events Accordion */}
            <Accordion type="single" collapsible defaultValue="upcoming-events" className="w-full shadow shadow-gray-600/70 rounded-2xl mb-20">
                <AccordionItem value="upcoming-events" className="border-white/50 rounded-2xl hover:border-white/70">
                    <AccordionTrigger className="flex flex-1 items-center justify-between py-4 text-xl font-bold text-white hover:text-white/80 px-5">
                        UPCOMING EVENTS
                    </AccordionTrigger>
                    <AccordionContent className="flex justify-center px-3">
                        <div className="flex flex-col gap-10 pt-6">
                            {upcomingEvents.map((upcomingEvent) => (
                                <div key={upcomingEvent.eventId}>
                                    <EventCard {...upcomingEvent} isPastEvent={false} venue={{venueName: venue}}/>
                                </div>
                            ))}
                            {upcomingEvents.length === 0 && (
                                <div className="text-center text-white/80 font-bold font-helvetica">
                                    <p>No Upcoming Events</p>
                                </div>
                            )}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}