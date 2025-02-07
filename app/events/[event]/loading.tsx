export default function Loading() {
    return (
        <div className="min-h-screen relative bg-black">
            {/* Blurred background skeleton */}
            <div className="fixed inset-0 -z-1">
                <div className="w-full h-full bg-gray-900/50 animate-pulse" />
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Main content */}
            <div className="w-full max-w-5xl mx-auto px-4 md:px-6 pt-24 md:pt-36 pb-20">
                <div className="flex flex-col md:flex-row md:gap-8">
                    {/* Left section - Event Poster */}
                    <div className="w-full md:w-[350px] md:fixed md:top-36">
                        <div className="max-w-[330px] mx-auto md:max-w-none rounded-lg overflow-hidden w-full md:w-[350px] aspect-[4/5] md:h-[400px] relative">
                            <div className="w-full h-full bg-gray-800 animate-pulse" />
                        </div>
                    </div>

                    {/* Placeholder for fixed section - only visible on desktop */}
                    <div className="hidden md:block md:w-[350px] md:flex-shrink-0"></div>

                    {/* Right section */}
                    <div className="w-full md:w-[600px] z-10 md:ml-10 mt-8 md:mt-0">
                        <div className="text-white space-y-8 pb-8 font-helvetica">
                            {/* Event Title and Venue */}
                            <div className="space-y-3">
                                <div className="h-12 w-3/4 bg-gray-800 rounded-xl animate-pulse" />
                                <div className="h-6 w-32 bg-gray-800/60 rounded-lg animate-pulse" />
                            </div>

                            {/* Date and Type */}
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="h-6 w-48 bg-gray-800/60 rounded-lg animate-pulse" />
                                <div className="h-6 w-28 bg-gray-800/40 rounded-lg animate-pulse" />
                            </div>

                            {/* Pricing Card */}
                            <div className="bg-gray-900/50 rounded-2xl p-6 space-y-4">
                                <div className="flex justify-between items-center">
                                    <div className="h-6 w-48 bg-gray-800/60 rounded-lg animate-pulse" />
                                    <div className="h-8 w-24 bg-gray-800 rounded-lg animate-pulse" />
                                </div>
                                <div className="h-5 w-64 bg-gray-800/40 rounded-lg animate-pulse" />
                                <div className="h-10 w-full bg-[#E5FF10]/40 rounded-full animate-pulse" />
                            </div>

                            {/* About Section */}
                            <div className="space-y-4">
                                <div className="h-8 w-24 bg-gray-800 rounded-lg animate-pulse" />
                                <div className="h-6 w-3/4 bg-gray-800/40 rounded-lg animate-pulse" />
                            </div>

                            {/* Artist Lineup Section */}
                            <div className="space-y-4">
                                <div className="h-8 w-32 bg-gray-800 rounded-lg animate-pulse" />
                                {/* Artist Items */}
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="h-8 w-8 bg-gray-800/60 rounded-full animate-pulse" />
                                        <div className="h-6 w-48 bg-gray-800/40 rounded-lg animate-pulse" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}