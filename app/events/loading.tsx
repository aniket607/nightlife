export default function Loading() {
    return (
        <div className="min-h-screen bg-black text-white p-8">
            {/* Header Section */}
            <div className="flex flex-col items-center justify-center space-y-4 my-20">
                <div className="h-10 w-64 bg-gray-800 rounded-lg animate-pulse" />
                <div className="h-6 w-96 bg-gray-800/50 rounded-lg animate-pulse" />
            </div>

            {/* Events Sections */}
            <div className="max-w-4xl mx-auto space-y-4">
                
                {/* Events Section */}
                <div className="bg-gray-900/30 rounded-xl p-4 space-y-4">
                    <div className="h-8 w-44 bg-gray-800 rounded animate-pulse" />
                    
                    {/* Event Cards */}
                    {[1, 2].map((i) => (
                        <div key={i} className="flex gap-6 bg-gray-900/50 rounded-xl p-4">
                            {/* Date Box */}
                            <div className="flex flex-col items-center justify-center w-24 h-24 bg-gray-800/80 rounded-lg animate-pulse">
                                <div className="h-4 w-12 bg-gray-700 rounded mb-2" />
                                <div className="h-8 w-16 bg-gray-700 rounded" />
                                <div className="h-4 w-14 bg-gray-700 rounded mt-2" />
                            </div>

                            {/* Event Image */}
                            <div className="w-48 h-48 bg-gray-800 rounded-lg animate-pulse" />

                            {/* Event Details */}
                            <div className="flex-1 space-y-4">
                                {/* Event Type */}
                                <div className="h-5 w-24 bg-gray-800/80 rounded animate-pulse" />
                                
                                {/* Event Title */}
                                <div className="h-7 w-48 bg-gray-800 rounded animate-pulse" />
                                
                                {/* Host */}
                                <div className="h-5 w-32 bg-gray-800/50 rounded animate-pulse" />
                                
                                {/* Venue */}
                                <div className="h-5 w-24 bg-gray-800/50 rounded animate-pulse" />

                                {/* Slots Info */}
                                <div className="flex gap-4">
                                    <div className="h-6 w-28 bg-gray-800/30 rounded animate-pulse" />
                                    <div className="h-6 w-28 bg-gray-800/30 rounded animate-pulse" />
                                </div>

                                {/* View Details Button */}
                                <div className="h-9 w-36 bg-gray-800 rounded-lg animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}