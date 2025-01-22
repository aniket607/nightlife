"use server"

import prisma from "@/lib/prisma"

export default async function fetchVenues() {
    const venues = await prisma.venue.findMany()
    return venues
}