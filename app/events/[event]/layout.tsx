'use server'

import { ReactNode } from 'react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import fetchEventById from '@/actions/fetchEventById'

interface LayoutProps {
  children: ReactNode
  params: Promise<{
    event: string
  }>
}

export default async function EventLayout({ children, params }: LayoutProps) {
  const parseEventSlug = (slug: string) => {
    const [eventId] = slug.split('-');
    return { eventId };
  };

  // Parse the incoming slug
  const { event } = await params;
  const { eventId } = parseEventSlug(event);

  // Fetch event details
  const eventDetails = await fetchEventById(parseInt(eventId))

  if (!eventDetails) {
    redirect('/events')
  }

  return (
    <div className="min-h-screen relative bg-black">
      {/* Blurred background wrapper */}
      <div className="fixed inset-0 -z-1">
        <Image
          src={eventDetails.eventImgUrl!}
          alt=""
          fill
          className="object-cover opacity-50"
          style={{ filter: 'blur(35px)' }}
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      {/* Main content */}
      {children}
    </div>
  )
}
