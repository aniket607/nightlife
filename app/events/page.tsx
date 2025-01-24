import { StarsBackground } from "@/components/ui/stars-background";
import fetchEvents from "@/actions/fetchEvents";
import { EventCard } from "@/components/event-card";
export default async function EventsPage() {
  const events = await fetchEvents()
  console.log(events)
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
      <div className="relative z-10 py-20 md:py-32 px-4 flex flex-col items-center justify-center content-center">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">Discover Events</h2>
          <p className="text-xl text-[#9ca3af]">Discover the hottest events in your City</p>
        </div>
        <div className="mx-auto">
          <div className="flex flex-col gap-10">
              {events.map((event) => (
                <div key={event.eventId} className="relative">
                  <EventCard {...event} />
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  )
}
