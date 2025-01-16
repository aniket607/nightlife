export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <div className="max-w-lg mx-auto bg-black/20 backdrop-blur-sm rounded-lg p-6">
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 bg-black/40 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 bg-black/40 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
            <textarea
              id="message"
              rows={4}
              className="w-full px-4 py-2 bg-black/40 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="Your message"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-full transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}
