export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Event cards will go here */}
        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6">
          <div className="text-purple-500 mb-2">SAT, JAN 20</div>
          <h2 className="text-2xl font-semibold mb-2">Saturday Night Fever</h2>
          <p className="text-gray-300 mb-4">Join us for an unforgettable night of music and dancing</p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full">
            Get Tickets
          </button>
        </div>
      </div>
    </div>
  )
}
