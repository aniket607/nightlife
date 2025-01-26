import prisma from "@/lib/prisma";

export default async function fetchEventsOfVenue(venueName: string) {
    const events = await prisma.venue.findFirst({
        where: {
            venueName: venueName
        },
        include: {
            events: {
                orderBy: {
                    eventDate: "asc"
                }
            }
        }
    })
    return events
}