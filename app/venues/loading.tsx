export default function Loading() {
    return (
        <div className="min-h-screen bg-black text-white p-8">
            {/* Header Section */}
            <div className="flex flex-col items-center justify-center space-y-4 mb-12">
                <div className="h-10 w-64 bg-gray-800 rounded-lg animate-pulse" />
                <div className="h-6 w-96 bg-gray-800/50 rounded-lg animate-pulse" />
            </div>

            {/* Venues Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Repeat skeleton cards 3 times */}
                {[1, 2, 3].map((i) => (
                    <div key={i} className="rounded-2xl overflow-hidden bg-gray-900/50 shadow-lg">
                        {/* Image skeleton */}
                        <div className="h-48 bg-gray-800 animate-pulse" />
                        
                        {/* Content */}
                        <div className="p-4 space-y-4">
                            {/* Title */}
                            <div className="h-6 w-3/4 bg-gray-800 rounded animate-pulse" />
                            
                            {/* Address */}
                            <div className="space-y-2">
                                <div className="h-4 w-full bg-gray-800/50 rounded animate-pulse" />
                                <div className="h-4 w-2/3 bg-gray-800/50 rounded animate-pulse" />
                            </div>
                            
                            {/* Rating and Location */}
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <div className="h-5 w-12 bg-gray-800 rounded animate-pulse" />
                                </div>
                                <div className="h-5 w-24 bg-gray-800 rounded animate-pulse" />
                            </div>
                            
                            {/* View Events Button */}
                            <div className="h-10 w-full bg-gray-800 rounded-full animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}