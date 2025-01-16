export default function VenuesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Popular Venues</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Venue cards will go here */}
        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-2">Club XYZ</h2>
          <p className="text-gray-300 mb-4">The hottest club in downtown with world-class DJs</p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full">
            Join Guestlist
          </button>
        </div>
      </div>
    </div>
  )
}
