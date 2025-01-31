'use client'

import { use } from 'react'
import { redirect } from 'next/navigation'

interface PageProps {
  params: Promise<{
    event: string
  }>,
  searchParams: Promise<{
    eventId?: string
  }>
}

interface ParsedEventSlug {
  eventId: string;
  venueName: string;
}

export default function EventPage({ params }: PageProps) {
  const { event } = use(params);

  const parseEventSlug = (slug: string): ParsedEventSlug => {
    // Split by last occurrence of hyphen to separate eventId and venueName
    const [eventId, ...venueNameParts] = slug.split('-');
    const venueName = venueNameParts.join('-'); // Rejoin in case venue name has hyphens
    
    if (!eventId || !venueName) {
      redirect('/'); // Redirect to home if slug is malformed
    }
    
    return {
      eventId,
      venueName: decodeURIComponent(venueName)
    };
  };

  // Parse the incoming slug
  const { eventId, venueName } = parseEventSlug(event);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Event Details</h1>
        <div className="space-y-4">
          <p className="font-bold text-white">Event ID: {eventId}</p>
          <p className="font-bold text-white"><strong>Venue:</strong> {venueName}</p>
        </div>
      </div>
    </div>
  );
}