'use server'

import { redirect } from 'next/navigation'
import fetchEventById from '@/actions/fetchEventById'
import Image from 'next/image'
import JoinGLBtn from '@/components/join-gl-btn'
import CopyAddressBtn from '@/components/copy-address-btn'
import OpenInMapsBtn from '@/components/open-in-maps-btn'
import parse from "html-react-parser";

interface PageProps {
  params: Promise<{
    event: string
  }>
}

interface ParsedEventSlug {
  eventId: string;
}

export default async function EventPage({ params }: PageProps) {
  const parseEventSlug = (slug: string): ParsedEventSlug => {
    const [eventId] = slug.split('-');
    return {
      eventId
    };
  };

  // Parse the incoming slug
  const resolvedParams = await params;
  const { eventId } = parseEventSlug(resolvedParams.event);
  
  // Fetch event details
  const eventDetails = await fetchEventById(parseInt(eventId));
  if (!eventDetails) {
    redirect('/events'); 
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
  // Determine if event has passed
  let isEventPassed = false;
  try {
    const dateObj = new Date(eventDetails.eventDate);
    if (!isNaN(dateObj.getTime())) {
      month = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
      day = dateObj.getDate().toString();
      year = dateObj.getFullYear().toString();

    

      // Create event datetime by combining date and time
      const eventDateTime = new Date(eventDetails.eventDate);
      if (eventDetails.eventTime) {
        const timeObj = new Date(eventDetails.eventTime);
        eventDateTime.setUTCHours(timeObj.getUTCHours());
        eventDateTime.setUTCMinutes(timeObj.getUTCMinutes());
      }
      
      // Current time in IST
      const currentTime = new Date();
      
      // Compare event time with current time
      isEventPassed = eventDateTime < currentTime;
    }
  } catch (error) {
    console.error('Invalid date:', eventDetails.eventDate);
  }

  return (
    <div className="min-h-screen w-full bg-black">
      <div className="relative w-full max-w-5xl mx-auto px-4 md:px-6 pt-24 md:pt-36 pb-20">
        <div className="flex flex-col md:flex-row md:gap-8">
          {/* Left section - scrollable on mobile, fixed on desktop */}
          <div className="w-full md:w-[350px] md:fixed md:top-36">
            <div className="max-w-[330px] mx-auto md:max-w-none rounded-lg overflow-hidden w-full md:w-[350px] aspect-[4/5] md:h-[400px] relative bg-zinc-900">
              <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-zinc-800 to-zinc-900" />
              <Image
                src={eventDetails.eventImgUrl!}
                alt={eventDetails.eventName}
                fill
                sizes="(max-width: 768px) 330px, 350px"
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </div>

          {/* Placeholder for fixed section - only visible on desktop */}
          <div className="hidden md:block md:w-[350px] md:flex-shrink-0"></div>

          {/* Right section */}
          <div className="w-full md:w-[600px] z-10 md:ml-10 mt-8 md:mt-0">
            <div className="text-white space-y-8 pb-8 font-helvetica">
              {/* Event Header Info */}
              <div className="w-full">
                <h1 className=" text-3xl md:text-5xl font-bold">{eventDetails.eventName}</h1>
                <p className="text-lg md:text-2xl text-gray-400 my-4">{eventDetails.venue.venueName}</p>
                <div className="flex items-center gap-2 text-lg md:text-xl mt-4">
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
                <JoinGLBtn eventId={eventId} isEventPassed={isEventPassed} />
              </div>

              {/* About Section */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold font-poppins">About</h2>
                <div className="prose prose-lg prose-invert max-w-none text-gray-300 leading-relaxed">
                  {eventDetails.eventDescription ? parse(eventDetails.eventDescription) : "No description available"}
                </div>
              </div>
              {/* Divider */}
              <div className='h-[1px] w-full bg-white/20'/>
              
              {/* Lineup Section */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold font-poppins">Artist Lineup</h2>
                <div className="space-y-4">
                  {eventDetails.artists.length > 0 ? (
                    eventDetails.artists.map(({ artist }) => (
                      <div key={artist.id} className="flex items-center gap-3 group hover:bg-white/5 rounded-lg transition-colors p-2">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium group-hover:text-white transition-colors">{artist.name}</h3>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-400 py-4">
                      No artists announced yet
                    </div>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className='h-[1px] w-full bg-white/20'/>

              {/* Venue Details */}
              <div className="space-y-3">
                <h2 className="text-lg font-medium font-poppins">Venue Details :</h2>
                <h2 className='font-semibold font-futura'>{eventDetails.venue.venueName}</h2>
                <div className="flex max-w-[380px] items-start">
                  <p className='text-xs flex-grow'>{eventDetails.venue.address}</p>
                  <CopyAddressBtn address={eventDetails.venue.address} />
                </div>
                {eventDetails.venue.locationUrl && <div className="mt-3">
                  <OpenInMapsBtn mapUrl={eventDetails.venue.locationUrl} />
                </div>}
              </div>
              {/* Divider */}
              <div className='h-[1px] w-full bg-white/20'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}