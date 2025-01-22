"use server"

import prisma from "@/lib/prisma"

export default async function fetchFeatured() {
    const featuredVenues = await prisma.venue.findMany({
        where: {
          featuredVenue: true
        },
        take: 3
      })
      const featuredEvents = await prisma.event.findMany({
        where: {
          featuredEvent: true
        },
        orderBy: {
          eventDate: "asc", // Sort by eventDate in ascending order
        },
        include: {
          venue: true
        },
        take: 3
      })
      return { featuredVenues, featuredEvents }
}