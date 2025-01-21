import Image from 'next/image'
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

interface EventCardProps {
  eventName: string
  eventDescription: string | null
  eventDate: string | Date
  eventTime: string | Date | null
  venue: {
    venueName: string
    // ... other venue fields if needed
  }
  eventType: string
  eventImgUrl: string | null
  featuredEvent?: boolean | null
  stagGlCount?: number | null
  coupleGlCount?: number | null
}

export function EventCard({ 
  eventName, 
  eventDescription, 
  eventDate, 
  eventTime, 
  venue,
  eventType,
  eventImgUrl,
  stagGlCount = 101,
  coupleGlCount = 0
}: EventCardProps) {
  // Parse the date string to get month and day
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
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
      <div className="relative w-full min-w-[280px] md:min-w-[1000px] max-w-5xl flex bg-gradient-to-r from-black/40 to-black/20 backdrop-blur-xl border border-white/10 rounded-none md:rounded-2xl rounded-b-2xl overflow-hidden group transform transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
        {/* Desktop Date Display */}
        <div className="hidden md:flex items-center justify-center w-32 bg-black/60 text-center">
          <div className="text-white">
            <div className="text-2xl font-light tracking-wider mb-2">{month}</div>
            <div className="text-6xl font-bold mb-3 leading-none">{day}</div>
            <div className="text-xl text-white/80 font-light">{displayTime}</div>
          </div>
        </div>

        {/* Desktop Slots Counter */}
        <div className="hidden md:flex absolute top-4 right-4 z-50 flex-col gap-2">
          {stagGlCount! > 0 && (
            <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <div className="flex items-center gap-2 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-sm font-medium">{stagGlCount} stag slots</span>
              </div>
            </div>
          )}
          {coupleGlCount! > 0 && (
            <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <div className="flex items-center gap-2 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span className="text-sm font-medium">{coupleGlCount} couple slots</span>
              </div>
            </div>
          )}
        </div>

        {/* Image container - smaller on mobile */}
        <div className="relative min-w-[180px] md:min-w-[280px] h-[300px] md:h-[400px]">
          <Image 
            src={eventImgUrl || ""} 
            alt={eventName} 
            fill 
            className="object-cover" 
            priority 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between px-4 py-2 md:p-8 flex-1">
          <div>
            {/* Category */}
            <div className="mb-3 md:mb-4">
              <span className="text-purple-400 text-sm font-medium">{eventType}</span>
            </div>

            {/* Title & Description */}
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{eventName}</h3>
            <p className="text-sm md:text-base text-[#9ca3af] mb-6 line-clamp-3">{eventDescription}</p>

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
              text="Join Guest List" 
              className="w-full md:w-auto min-w-[150px] bg-transparent px-6 md:px-10 py-3 md:py-4 border-white/10 text-white text-sm md:text-base font-medium hover:text-black hover:bg-white/80 transition-all ease-in-out  hover:scale-[1.02] active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            />
          </div>
        </div>
      </div>
    </>
  )
}
