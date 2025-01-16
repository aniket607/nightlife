import Image from 'next/image'
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

interface EventCardProps {
  title: string
  description: string
  date: string
  time: string
  venue: string
  category: string
  imageUrl: string
  isFeatured?: boolean
  availableSlots?: number
}

export function EventCard({ 
  title, 
  description, 
  date, 
  time, 
  venue, 
  category,
  imageUrl,
  isFeatured,
  availableSlots = 101
}: EventCardProps) {
  // Parse the date string to get month and day
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const day = dateObj.getDate();

  return (
    <div className="relative flex bg-gradient-to-r from-black/40 to-black/20 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden group transform transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
      {/* Slots Available Counter */}
      <div className="absolute top-4 right-4 z-50 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
        <div className="flex items-center gap-2 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="text-sm font-medium">{availableSlots} slots available</span>
        </div>
      </div>

      {/* Date Display */}
      <div className="flex items-center justify-center w-32 bg-black/60 text-center">
        <div className="text-white">
          <div className="text-2xl font-light tracking-wider mb-2">{month}</div>
          <div className="text-6xl font-bold mb-3 leading-none">{day}</div>
          <div className="text-xl text-white/80 font-light">{time.split(' - ')[0]}</div>
        </div>
      </div>

      {/* Image container - tall poster style */}
      <div className="relative w-[280px] h-[400px]">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        
        {isFeatured && (
          <div className="absolute top-4 right-4 bg-purple-500/80 backdrop-blur-md px-4 py-1 rounded-full">
            <span className="text-white text-sm font-medium">Featured</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between p-8 flex-1">
        <div>
          {/* Category */}
          <div className="mb-4">
            <span className="text-purple-400 text-sm font-medium">{category}</span>
          </div>

          {/* Title & Description */}
          <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
          <p className="text-[#9ca3af] mb-6 line-clamp-3">{description}</p>

          {/* Venue */}
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-white/80">{venue}</span>
          </div>
        </div>

        {/* Join Guest List Button */}
        <div className="mt-8 flex justify-center">
          <InteractiveHoverButton 
            text="Join Guest List" 
            className="w-auto min-w-[140px] bg-transparent px-10 border-white/10 text-white hover:text-black hover:bg-white"
          />
        </div>
      </div>
    </div>
  )
}
