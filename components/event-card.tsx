"use client"

import Image from 'next/image'
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { cn } from "@/lib/utils";
import { useRouter } from 'next/navigation'

interface EventCardProps {
  eventId: number
  eventName: string
  eventDescription: string | null
  eventDate: string | Date
  eventTime: string | Date | null
  venue: {
    venueName: string
  }
  eventType: string
  eventImgUrl: string | null
  featuredEvent?: boolean | null
  stagGlCount?: number | null
  coupleGlCount?: number | null
  isPastEvent?: boolean
}

export function EventCard({ 
  eventId,
  eventName, 
  eventDescription, 
  eventDate, 
  eventTime, 
  venue,
  eventType,
  eventImgUrl,
  stagGlCount = 101,
  coupleGlCount = 0,
  isPastEvent = false
}: EventCardProps) {
 
  let month = '';
  let day = '';
  
  try {
    const dateObj = new Date(eventDate);
    if (!isNaN(dateObj.getTime())) {
      month = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
      day = dateObj.getDate().toString();
    }
  } catch (error) {
    console.error('Invalid date:', eventDate);
  }

  // Format the time
  let displayTime = 'TBA';
  if (eventTime) {
    const timeObj = new Date(eventTime);
    const hours = timeObj.getUTCHours();
    const minutes = timeObj.getUTCMinutes().toString().padStart(2, "0");
    const amPm = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12;
    displayTime = `${hours12}:${minutes} ${amPm}`;
  }

  const router = useRouter();

  const handleJoinGuestList = (eventId: number) => {
    if (isPastEvent) return;
    
    // Create a URL-friendly slug with just eventId and venueName
    const eventSlug = `${eventId}-${encodeURIComponent(venue.venueName)}`;
    
    router.push(`/events/${eventSlug}/`);

  };
  
  return (
    <>
      {/* Mobile Date and Slots */}
      <div className="md:hidden flex flex-col w-full">
        <div className="flex items-center justify-between bg-gradient-to-r from-black/40 to-black/20 backdrop-blur-xl rounded-t-2xl p-4 border-x border-t border-white/10">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold text-white">{month} {day}</div>
            <div className="text-lg text-white/80">{displayTime}</div>
          </div>
          <div className="flex items-center gap-2">
            {stagGlCount! > 0 && (
              <div className="flex items-center gap-1 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-sm">{stagGlCount}</span>
              </div>
            )}
            {coupleGlCount! > 0 && (
              <div className="flex items-center gap-1 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span className="text-sm">{coupleGlCount}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="relative w-full min-w-[280px] md:min-w-[800px] max-w-[800px] flex bg-gradient-to-br from-slate-950/70 via-zinc-900 to-slate-950/60 backdrop-blur-xl border border-white/10 rounded-none md:rounded-2xl rounded-b-2xl overflow-hidden group transform transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
        {/* Desktop Date Display */}
        <div className="hidden md:flex items-center justify-center w-32 bg-gradient-to-br  from-slate-950/80 via-zinc-900 to-slate-950/60 text-center">
          <div className="text-white">
            <div className="text-2xl font-light tracking-wider mb-2">{month}</div>
            <div className="text-6xl font-bold mb-3 leading-none">{day}</div>
            <div className="text-xl text-white/80 font-light">{displayTime}</div>
          </div>
        </div>

        {/* Desktop Slots Counter */}
        <div className="hidden md:flex absolute top-2 right-2 z-50 flex-col gap-2">
          {stagGlCount! > 0 && (
            <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <div className="flex items-center gap-2 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-xs font-medium">{stagGlCount} stag slots</span>
              </div>
            </div>
          )}
          {coupleGlCount! > 0 && (
            <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <div className="flex items-center gap-2 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span className="text-xs font-medium">{coupleGlCount} couple slots</span>
              </div>
            </div>
          )}
        </div>

        {/* Image container */}
        <div className="relative min-w-[150px] md:min-w-[280px] h-[250px] md:h-[400px]">
          <Image 
            src={eventImgUrl || ""} 
            alt={eventName} 
            fill 
            sizes="(max-width: 768px) 150px, 280px"
            className="object-cover" 
            priority 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between px-4 py-2 md:p-8 flex-1">
          <div>
            {/* Category */}
            <div className="mb-2 md:my-4">
              <span className="text-purple-400 text-sm font-normal">{eventType}</span>
            </div>

            {/* Title & Description */}
            <h3 className="text-lg md:text-2xl font-bold text-white mb-2">{eventName}</h3>
            <p className="text-sm md:text-base text-[#9ca3af] mb-4 line-clamp-3">{eventDescription}</p>

            {/* Venue */}
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm md:text-base text-white/80 hover:text-white transition-colors">{venue.venueName}</span>
            </div>
          </div>

          {/* Join Guest List Button */}
          <div className="mt-4 md:mt-8 flex justify-center">
            <InteractiveHoverButton 
              text={isPastEvent ? "Event Ended" : "Join Guest List"}
              disabled={isPastEvent}
              className={cn(
                "w-full md:w-auto min-w-[150px] bg-transparent px-6 md:px-10 py-3 md:py-4 border-white/10 text-white text-xs md:text-base",
                isPastEvent && "opacity-50 cursor-not-allowed hover:scale-100"
              )}
              onClick={() => handleJoinGuestList(eventId)}
            />
          </div>
        </div>
      </div>
    </>
  )
}
