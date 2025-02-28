"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { 
  Music, 
  Disc, 
  Globe, 
  Radio,
  Clock,
  Headphones,
  LayoutGrid,
  ChevronDown,
  ChevronUp
} from "lucide-react";

interface EventFiltersProps {
  eventTypes: string[];
  selectedType: string | null;
}

// Map event types to their corresponding icons
const eventTypeIcons: Record<string, React.ReactNode> = {
  "All": <LayoutGrid className="h-5 w-5" />,
  "EDM": <Headphones className="h-5 w-5" />,
  "Bollywood": <Music className="h-5 w-5" />,
  "Techno": <Disc className="h-5 w-5" />,
  "Commercial": <Globe className="h-5 w-5" />,
  "Old School": <Clock className="h-5 w-5" />,
  "Afrobeats": <Radio className="h-5 w-5" />,
};

export default function EventFilters({ eventTypes, selectedType }: EventFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile on component mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Handle filter selection
  const handleFilterChange = useCallback((type: string) => {
    // Create new URLSearchParams
    const params = new URLSearchParams();
    
    // Only add the parameter if it's not "All"
    if (type !== "All") {
      params.set("eventType", type);
    }
    
    // Navigate to the new URL
    router.push(`${pathname}?${params.toString()}`);
  }, [router, pathname]);

  // Create a complete list of event types with "All" at the beginning
  const allEventTypes = ["All", ...eventTypes.filter(type => type !== "All")];
  
  // For mobile view, split filters into first row and remaining rows
  const firstRowItems = allEventTypes.slice(0, 4); // First 4 filter buttons in mobile
  const remainingItems = allEventTypes.slice(4);   // Rest of the filters in mobile
  
  // Determine if we need to show the expand button (only if there are remaining items and on mobile)
  const showExpandButton = isMobile && remainingItems.length > 0;

  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex flex-col gap-3">
        {/* First row of filters - always visible */}
        <div className="flex flex-wrap gap-3 justify-start items-center">
          {/* On desktop, show all items. On mobile, show only first row */}
          {(isMobile ? firstRowItems : allEventTypes).map((type) => (
            <button
              key={type}
              onClick={() => handleFilterChange(type)}
              className={`flex flex-col items-center justify-center h-16 min-w-16 px-3 rounded-xl transition-all ${
                (selectedType === type) || 
                (type === "All" && !selectedType) 
                  ? "bg-white text-black shadow-lg" 
                  : "bg-gray-800/80 text-white hover:bg-gray-700"
              }`}
            >
              <div className="mb-1">
                {eventTypeIcons[type] || <Music className="h-5 w-5" />}
              </div>
              <span className="text-xs font-medium whitespace-nowrap">{type}</span>
            </button>
          ))}
          
          {/* Expand/Collapse button for mobile */}
          {showExpandButton && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-800/80 text-white hover:bg-gray-700"
              aria-label={expanded ? "Show less filters" : "Show more filters"}
            >
              {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          )}
        </div>
        
        {/* Remaining rows - only visible when expanded on mobile */}
        {isMobile && expanded && remainingItems.length > 0 && (
          <div className="flex flex-wrap gap-3 justify-start">
            {remainingItems.map((type) => (
              <button
                key={type}
                onClick={() => handleFilterChange(type)}
                className={`flex flex-col items-center justify-center h-16 min-w-16 px-3 rounded-xl transition-all ${
                  (selectedType === type) || 
                  (type === "All" && !selectedType) 
                    ? "bg-white text-black shadow-lg" 
                    : "bg-gray-800/80 text-white hover:bg-gray-700"
                }`}
              >
                <div className="mb-1">
                  {eventTypeIcons[type] || <Music className="h-5 w-5" />}
                </div>
                <span className="text-xs font-medium whitespace-nowrap">{type}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
