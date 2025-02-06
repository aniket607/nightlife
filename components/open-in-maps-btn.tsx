'use client'

interface OpenInMapsBtnProps {
  mapUrl: string;
}

export default function OpenInMapsBtn({ mapUrl }: OpenInMapsBtnProps) {
  const handleOpenMaps = () => {
    // Create a Google Maps URL with the address
    window.open(mapUrl);
  };

  return (
    <button
      onClick={handleOpenMaps}
      className="flex items-center gap-2 bg-white/10 hover:bg-white/15 transition-colors px-4 py-2 rounded-full text-sm"
    >
      <svg 
        className="w-4 h-4" 
        fill="currentColor" 
        viewBox="0 0 24 24"
      >
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"/>
        <circle cx="12" cy="9" r="2.5"/>
      </svg>
      OPEN IN MAPS
    </button>
  );
}
