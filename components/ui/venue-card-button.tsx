"use client"
import { useRouter } from 'next/navigation'

export function VenueCardButton({venueName}: {venueName: string}) {
  const router = useRouter()
  return(
     <button className="w-full bg-black/40 hover:bg-black/60 border border-white/10 backdrop-blur-md text-white font-semibold py-2.5 md:py-2.5 px-4 md:px-6 rounded-lg md:rounded-xl text-sm md:text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
     onClick={() => {
      router.push(`/venues/${venueName}`)
     }}
     >
        View Events
     </button>

)}