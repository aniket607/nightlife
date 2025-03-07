# Nightlife Event Platform

A modern web application where users can explore nightclubs in the city and register for guestlists across various genres like techno. This platform connects nightlife enthusiasts with venues and events, making it easy to discover and join nightlife experiences.

## Project Overview

This platform allows users to:
- Browse nightclubs and venues in the city
- View upcoming events filtered by genre (techno, etc.)
- Register for guestlists (both stag and couple entries)
- Discover featured venues and events
- Find information about performing artists

## Technology Stack

### Frontend
- **Next.js 15** - React framework with server-side rendering
- **React 19** - UI component library
- **TypeScript** - Type-safe JavaScript
- **TailwindCSS** - Utility-first CSS framework for styling
- **Framer Motion** - Animation library for smooth UI transitions

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma ORM** - Database toolkit for PostgreSQL
- **PostgreSQL** - Relational database for data storage
- **Resend** - Email service integration

### Project Structure
```
├── actions/       # Server actions for data mutations
├── app/           # Next.js app directory (pages and layouts)
├── components/    # Reusable UI components
├── constants/     # Application constants
├── hooks/         # Custom React hooks
├── lib/           # Utility libraries and configurations
├── prisma/        # Database schema and migrations
├── public/        # Static assets
├── schemas/       # Data validation schemas
├── types/         # TypeScript type definitions
└── utils/         # Helper functions
```

## Database Schema

The application uses a PostgreSQL database with the following main models:
- **User** - User accounts and authentication
- **Venue** - Nightclub venues with details and ratings
- **Event** - Events at venues with dates, times, and capacity
- **Artist** - Performing artists at events
- **Guestlist** - Both stag and couple registrations for events

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL="postgresql://username:password@localhost:5432/nightlife"
# Add other environment variables as needed
```

## Deployment

The application is optimized for deployment on Vercel:

```bash
npm run build
# then
npm run start
```

You can also deploy directly to Vercel using their platform.
