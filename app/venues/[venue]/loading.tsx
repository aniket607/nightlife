export default function Loading() {
    return (
        <div className="min-h-screen bg-black text-white p-8 mt-20">
            <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
                {/* Venue Info Card - Left Side */}
                <div className="lg:w-1/3">
                    {/* Venue Image */}
                    <div className="w-full h-64 bg-gray-800 rounded-2xl animate-pulse mb-4" />
                    
                    {/* Venue Name */}
                    <div className="h-8 w-3/4 bg-gray-800 rounded-lg animate-pulse mb-4" />
                    
                    {/* Address */}
                    <div className="space-y-2 mb-4">
                        <div className="h-4 w-full bg-gray-800/50 rounded animate-pulse" />
                        <div className="h-4 w-2/3 bg-gray-800/50 rounded animate-pulse" />
                    </div>
                    
                    {/* Rating and Location */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="h-6 w-20 bg-gray-800 rounded animate-pulse" />
                        <div className="h-6 w-28 bg-gray-800 rounded animate-pulse" />
                    </div>
                    
                    {/* Open in Maps Button */}
                    <div className="h-10 w-full bg-gray-800/50 rounded-full animate-pulse" />
                </div>

                {/* Events Section - Right Side */}
                <div className="lg:w-2/3 space-y-4">
                    {/* Past Events Section */}
                    <div className="bg-gray-900/30 rounded-xl p-4">
                        <div className="h-8 w-32 bg-gray-800 rounded animate-pulse" />
                    </div>

                    {/* Upcoming Events Section */}
                    <div className="bg-gray-900/30 rounded-xl p-4 space-y-4">
                        <div className="h-8 w-44 bg-gray-800 rounded animate-pulse" />
                        
                        {/* Event Cards */}
                        {[1, 2].map((i) => (
                            <div key={i} className="flex gap-6 bg-gray-900/50 rounded-xl p-4">
                                {/* Date Box */}
                                <div className="flex flex-col items-center justify-center w-20 text-center bg-gray-800/80 rounded-lg p-2 animate-pulse">
                                    <div className="h-4 w-8 bg-gray-700 rounded mb-1" />
                                    <div className="h-8 w-12 bg-gray-700 rounded mb-1" />
                                    <div className="h-4 w-16 bg-gray-700 rounded" />
                                </div>

                                {/* Event Poster */}
                                <div className="w-40 h-40 bg-gray-800 rounded-lg animate-pulse" />

                                {/* Event Details */}
                                <div className="flex-1 space-y-3">
                                    {/* Event Type */}
                                    <div className="h-5 w-24 bg-gray-800/80 rounded animate-pulse" />
                                    
                                    {/* Event Title */}
                                    <div className="h-7 w-48 bg-gray-800 rounded animate-pulse" />
                                    
                                    {/* DJ/Host */}
                                    <div className="h-5 w-32 bg-gray-800/50 rounded animate-pulse" />
                                    
                                    {/* Venue */}
                                    <div className="h-5 w-48 bg-gray-800/50 rounded animate-pulse" />

                                    {/* Slots Counter */}
                                    <div className="h-6 w-32 bg-gray-800/30 rounded animate-pulse" />

                                    {/* View Details Button */}
                                    <div className="h-9 w-36 bg-gray-800 rounded-lg animate-pulse" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}