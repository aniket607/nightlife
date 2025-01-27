import Image from "next/image";

interface Event {
  createdAt: Date;
  userId: string;
  eventId: number;
  eventName: string;
  eventDescription: string | null;
  eventDate: Date;
  eventTime: Date;
  stagGlCount: number;
  featuredEvent: boolean | null;
}

interface VenueData {
  events: Event[];
  venueImgUrl: string | null;
  venueName: string | null;
  address: string | null;
  rating: number | null;
  venueArea: string | null;
  locationUrl: string | null;
}

interface VenueLeftSectionProps {
  venueData: VenueData;
}

export function VenueLeftSection({ venueData }: VenueLeftSectionProps) {
  return (
    <div className="w-full md:max-w-[400px] px-4 md:px-0 my-10 md:my-0">
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-white/[0.15] to-black/30 backdrop-blur-xl border border-white/[0.15] group transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
        {/* Image container */}
        <div className="relative h-[240px] md:h-[280px] w-full overflow-hidden">
          <Image 
            src={venueData.venueImgUrl || '/default-venue-image.jpg'}
            alt={venueData.venueName || 'Venue'}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
            priority
          />
          {/*gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/90" />
        </div>

        {/* Content container */}
        <div className="relative bg-gradient-to-b from-black/60 to-white/[0.05] backdrop-blur-md px-4 md:px-6 pb-4 -mt-16 h-[180px] md:h-[220px] flex flex-col justify-between">
          <div>
            {/* Venue Name  */}
            <h3 className="text-base md:text-xl font-bold mb-2 md:mb-1.5 pt-3 md:pt-2 text-white group-hover:text-white/80 transition-colors">
              {venueData.venueName || 'Venue Name'}
            </h3>
            
            {/* Address  */}
            <p className="text-[#9ca3af] text-xs md:text-sm mb-2 md:mb-3 line-clamp-2">
              {venueData.address || 'Address not available'}
            </p>
            
            {/* Rating and Area  */}
            <div className="flex justify-between items-center mb-2 md:mb-3">
              <div className="flex items-center gap-1 md:gap-1.5">
                <span className="text-yellow-500 text-base md:text-xl">★</span>
                <span className="text-white text-xs md:text-base">
                  {venueData.rating ? `${venueData.rating}/5` : 'N/A'}
                </span>
              </div>
              <div className="flex items-center gap-1 md:gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-xs md:text-sm text-white">
                  {venueData.venueArea || 'Area not available'}
                </span>
              </div>    
            </div>
            {venueData.locationUrl && (
              <a 
                href={venueData.locationUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xs md:text-sm text-white hover:text-white/80 transition-colors"
              >
                View on Map
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}