"use server"

import prisma from "@/lib/prisma";

export default async function fetchEventById(eventId: number) {
    const event = await prisma.event.findUnique({
        where: {
            eventId: eventId
        },
        include: {
            venue: true,
            artists: {
                include: {
                    artist: true
                }
            },
            stagGuestlist: true,
            coupleGuestlist: true
        }
    });
    return event;
}