import Image from "next/image"

interface VenueCardProps {
  name: string
  description: string
  rating: number
  imageUrl: string,
  venueArea: string
}

export function VenueCard({ name, description, rating, imageUrl, venueArea }: VenueCardProps) {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-white/[0.15] to-black/30 backdrop-blur-xl border border-white/[0.15] group transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
      {/* Image container */}
      <div className="relative h-[350px] w-full overflow-hidden">
        <Image 
          src={imageUrl} 
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
          priority
        />
        {/*gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/90" />
      </div>

      {/* Content with background */}
      <div className="relative bg-gradient-to-b from-black/60 to-white/[0.05] backdrop-blur-md px-6 pb-6 -mt-20">
        <h3 className="text-2xl font-bold mb-3 pt-3 text-white group-hover:text-purple-400 transition-colors">
          {name}
        </h3>
        <p className="text-[#9ca3af] text-base mb-6">{description}</p>
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-1.5">
            <span className="text-yellow-500 text-xl">★</span>
            <span className="text-white text-lg">{rating}/5</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-white text-sm">{venueArea}</span>
          </div>
        </div>

        <button className="w-full bg-black/40 hover:bg-black/60 border border-white/10 backdrop-blur-md text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95">
          Join Guestlist
        </button>
      </div>
    </div>
  )
}
