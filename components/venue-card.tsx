import Image from "next/image"

interface VenueCardProps {
  venueName: string
  address: string
  rating: number
  venueImgUrl: string,
  venueArea: string
}

export function VenueCard({ venueName, address, rating, venueImgUrl, venueArea }: VenueCardProps) {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-white/[0.15] to-black/30 backdrop-blur-xl border border-white/[0.15] group transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
      {/* Image container */}
      <div className="relative h-[240px] md:h-[280px] w-full overflow-hidden">
        <Image 
          src={venueImgUrl} 
          alt={venueName}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
          priority
        />
        {/*gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/90" />
      </div>

      {/* Content container */}
      <div className="relative bg-gradient-to-b from-black/60 to-white/[0.05] backdrop-blur-md px-4 md:px-6 pb-4 md:pb-4 -mt-16 h-[220px] md:h-[220px] flex flex-col justify-between">
        <div>
          {/* Venue Name  */}
          <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-1.5 pt-3 md:pt-2 text-white group-hover:text-white/80 transition-colors">
            {venueName}
          </h3>
          
          {/* Address  */}
          <p className="text-[#9ca3af] text-sm md:text-sm mb-3 md:mb-2 line-clamp-2 h-[40px] md:h-[40px]">{address}</p>
          
          {/* Rating and Area  */}
          <div className="flex justify-between items-center mb-3 md:mb-2">
            <div className="flex items-center gap-1.5">
              <span className="text-yellow-500 text-lg md:text-xl">★</span>
              <span className="text-white text-sm md:text-base">{rating}/5</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-4 md:w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm md:text-sm text-white">{venueArea}</span>
            </div>
          </div>
        </div>

        {/* Button */}
        <button className="w-full bg-black/40 hover:bg-black/60 border border-white/10 backdrop-blur-md text-white font-semibold py-2.5 md:py-2.5 px-4 md:px-6 rounded-lg md:rounded-xl text-sm md:text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95">
          View Events
        </button>
      </div>
    </div>
  )
}
