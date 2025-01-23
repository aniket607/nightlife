"use server"

import prisma from "@/lib/prisma"

export default async function fetchEvents() {
    const events = await prisma.event.findMany({
        include: {
            venue: true
        },
        orderBy: {
            eventDate: "asc",
        },
    })
    return events
}