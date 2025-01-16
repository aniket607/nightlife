import Image from "next/image"

interface VenueCardProps {
  name: string
  description: string
  rating: number
  imageUrl: string
}

export function VenueCard({ name, description, rating, imageUrl }: VenueCardProps) {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-[#1a1a1a] group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
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
        {/* Complex gradient overlay for smooth fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1a1a]/60 to-[#1a1a1a]" />
      </div>

      {/* Content with background */}
      <div className="relative bg-[#141414] px-6 pb-6 -mt-20">
        <h3 className="text-2xl font-bold mb-3 pt-3 text-white group-hover:text-purple-400 transition-colors">
          {name}
        </h3>
        <p className="text-[#9ca3af] text-base mb-6">{description}</p>
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-1.5">
            <span className="text-yellow-500 text-xl">★</span>
            <span className="text-white text-lg">{rating}/5</span>
          </div>
        </div>

        <button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300">
          Join Guestlist
        </button>
      </div>
    </div>
  )
}