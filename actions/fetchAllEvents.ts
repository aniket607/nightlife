"use server"

import prisma from "@/lib/prisma"
import { Event, Venue } from "@prisma/client";
import { startOfDay } from "date-fns";

interface EventWithVenue extends Event {
  venue: Venue;
}
interface EventsResult {
  upcomingEvents: EventWithVenue[];
  pastEvents: EventWithVenue[];
}
export default async function fetchAllEvents() {
    const now = new Date();
    const start = startOfDay(now);
    try {
        // Fetch all events in ascending order
        const events = await prisma.event.findMany({
          orderBy: {
            eventDate: "asc", 
          },
          include: {
            venue: true, 
          }
        });
    
        // Split events into upcoming and past arrays
        const { upcomingEvents, pastEvents } = events.reduce<EventsResult>((acc, event) => {
          if (new Date(event.eventDate) > start) {
            acc.upcomingEvents.push(event);
          } else {
            acc.pastEvents.push(event);
          }
          return acc;
        }, { upcomingEvents: [], pastEvents: [] } as EventsResult);
        return { upcomingEvents, pastEvents };
      } catch (error) {
        console.error("[fetchMyEvents] Error fetching events:", error);
        throw new Error("Failed to fetch events. Please try again later.");
      }

}