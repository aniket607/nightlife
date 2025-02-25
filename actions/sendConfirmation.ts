"use server"
import { EmailTemplate } from "@/components/confirmation-email";
import { Resend } from 'resend';
import { Event } from '@prisma/client';

interface EventWithVenue extends Event {
  venue: {
    venueName: string;
    address: string;
    locationUrl: string | null;
  };
}

interface SimpleGuestData {
  name: string;
  age: number;
  mobile: string;
  email: string;
}

interface SimpleCoupleData {
  male: SimpleGuestData;
  female: SimpleGuestData;
}

export default async function sendConfirmation(
  guestType: 'stag' | 'couple',
  guestData: SimpleGuestData[] | SimpleCoupleData[],
  event: EventWithVenue,
  recipientEmail: string
) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const guestDetails = guestType === 'stag' 
      ? guestData.map((guest) => ({
          name: (guest as SimpleGuestData).name,
          age: (guest as SimpleGuestData).age,
          mobile: (guest as SimpleGuestData).mobile,
          email: (guest as SimpleGuestData).email,
        }))
      : guestData.map((couple) => ({
          male: {
            name: (couple as SimpleCoupleData).male.name,
            age: (couple as SimpleCoupleData).male.age,
            mobile: (couple as SimpleCoupleData).male.mobile,
            email: (couple as SimpleCoupleData).male.email,
          },
          female: {
            name: (couple as SimpleCoupleData).female.name,
            age: (couple as SimpleCoupleData).female.age,
            mobile: (couple as SimpleCoupleData).female.mobile,
            email: (couple as SimpleCoupleData).female.email,
          }
        }));

    const { data, error } = await resend.emails.send({
      from: 'Nightlife <nightlife@aniketgoyal.tech>',
      to: [recipientEmail],
      subject: `Guestlist Confirmation - ${event.eventName}`,
      react: EmailTemplate({ 
        guestType,
        guestDetails,
        event: {
          eventName: event.eventName,
          eventDate: event.eventDate,
          eventTime: event.eventTime,
          eventType: event.eventType,
          venue: event.venue
        }
      }),
    });

    if (error) {
      console.error(`Email send error for ${recipientEmail}:`, error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error(`Email send exception for ${recipientEmail}:`, error);
    return { success: false, error };
  }
}
