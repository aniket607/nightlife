'use server'

import { redirect } from 'next/navigation'
import fetchEventById from '@/actions/fetchEventById'
import Image from 'next/image'

interface PageProps {
  params: {
    event: string
  },
  searchParams: {
    eventId?: string
  }
}

interface ParsedEventSlug {
  eventId: string;
}

export default async function EventPage({ params }: PageProps) {
  const parseEventSlug = (slug: string): ParsedEventSlug => {
    const [eventId, ...eventNameParts] = slug.split('-');
    const eventName = eventNameParts.join('-');
    
    if (!eventId || !eventName) {
      redirect('/');
    }
    
    return {
      eventId
    };
  };

  // Parse the incoming slug
  const { eventId } = parseEventSlug(params.event);          
  
  // Fetch event details
  const eventDetails = await fetchEventById(parseInt(eventId));
  if (!eventDetails) {
    redirect('/'); 
  }

  // Time formatting
  let displayTime = 'TBA';
  if (eventDetails.eventTime) {
    const timeObj = new Date(eventDetails.eventTime);
    const hours = timeObj.getUTCHours();
    const minutes = timeObj.getUTCMinutes().toString().padStart(2, "0");
    const amPm = hours >= 12 ? "pm" : "am";
    const hours12 = hours % 12 || 12;
    displayTime = `${hours12}:${minutes} ${amPm}`;
  }

// Date formatting
  let month = '';
  let day = '';
  let year = '';
  try {
    const dateObj = new Date(eventDetails.eventDate);
    if (!isNaN(dateObj.getTime())) {
      month = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
      day = dateObj.getDate().toString();
      year = dateObj.getFullYear().toString();
    }
  } catch (error) {
    console.error('Invalid date:', eventDetails.eventDate);
  }

  return (
    <div className="h-screen overflow-x-hidden overflow-y-auto" style={{
      scrollbarWidth: 'thin',
      scrollbarColor: 'rgb(75 85 99) transparent'
    }}>
      {/* Blurred background wrapper */}
      <div className="fixed inset-0 -z-1">
        <Image
          src={eventDetails.eventImgUrl!}
          alt=""
          fill
          className="object-cover opacity-50"
          style={{ filter: 'blur(30px)' }}
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto mt-36">
        <div className="flex gap-8 relative">
          {/* Left fixed section */}
          <div className="w-[350px] fixed">
            <div className="rounded-lg overflow-hidden w-[350px] h-[400px] relative">
              <Image
                src={eventDetails.eventImgUrl!}
                alt={eventDetails.eventName}
                fill
                sizes="(max-width: 350px) 100vw, 350px"
                className="object-cover"
                priority
              />
            </div>
            <div className="mt-4 space-y-2 font-helvetica">
              <p className="text-gray-400">@ {eventDetails.venue.venueName}</p>
            </div>
          </div>

          {/* Placeholder for fixed section */}
          <div className="w-[350px] flex-shrink-0"></div>

          {/* Right section */}
          <div className="w-[600px]">
            <div className="text-white space-y-8 pb-8 font-helvetica">
              {/* Event Header Info */}
              <div className="w-full">
                <h1 className="text-5xl font-bold">{eventDetails.eventName}</h1>
                <p className="text-2xl text-gray-400 my-4">{eventDetails.venue.venueName}</p>
                <div className="flex items-center gap-2 text-xl mt-4">
                  <span>{day} {month}, {year}</span>
                  <span>•</span>
                  <span>{displayTime}</span>
                </div>
                <div className="flex items-center gap-4 text-gray-400 mt-2">
                  <div className="flex items-center gap-2">
                    <svg 
                      viewBox="0 0 24 24" 
                      className="w-5 h-5"
                      fill="currentColor"
                    >
                      <path d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-1.8C18 6.57 15.35 4 12 4s-6 2.57-6 6.2c0 2.34 1.95 5.44 6 9.14 4.05-3.7 6-6.8 6-9.14zM12 2c4.2 0 8 3.22 8 8.2 0 3.32-2.67 7.25-8 11.8-5.33-4.55-8-8.48-8-11.8C4 5.22 7.8 2 12 2z"/>
                    </svg>
                    <span>{eventDetails.venue.venueArea}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <svg 
                      viewBox="0 0 24 24" 
                      className="w-5 h-5"
                      fill="currentColor"
                    >
                      <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/>
                    </svg>
                    <span>{eventDetails.eventType || 'Party'}</span>
                  </div>
                </div>
                
                {/* Call to Action Button */}
                <button className="my-10 bg-white/10 hover:bg-white/20 transition-colors text-white py-3 w-full rounded-lg">
                  Join Guest List
                </button>
              </div>

              {/* About Section */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">About</h2>
                <p className="text-gray-300 leading-relaxed">
                  {eventDetails.eventDescription || 'No description available.'}
                </p>
              </div>              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}