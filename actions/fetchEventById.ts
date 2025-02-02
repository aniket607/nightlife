"use server"

import prisma from "@/lib/prisma";

export default async function fetchEventById(eventId: number) {
    const eventDetails = await prisma.event.findUnique({
        where: {
            eventId
        },
        include: {
            venue: true
        }
    })
    return eventDetails    
}