'use server'
import prisma from '@/lib/prisma'
import sendConfirmation from './sendConfirmation'
import { GuestData, CoupleData } from '@/types/guestlist'

interface SubmissionResponse {
  success: boolean
  message: string
}

// Database operations for stag guestlist
const createStagGuestlist = async (eventId: number, guests: GuestData[]): Promise<boolean> => {
  try {
    // Use transaction to ensure both operations complete or none do
    await prisma.$transaction(async (tx) => {
      // Create the guestlist entries
      await tx.stagGuestlist.createMany({
        data: guests.map(guest => ({
          eventId,
          guestName: guest.name,
          guestAge: guest.age,
          guestMobile: guest.mobile,
          guestEmail: guest.email
        }))
      });

      // Update the event's stagGlCount
      await tx.event.update({
        where: { eventId },
        data: {
          stagGlCount: {
            decrement: guests.length
          }
        }
      });
    });
    return true;
  } catch (error) {
    console.error('Error creating stag guestlist:', error);
    return false;
  }
};

// Database operations for couple guestlist
const createCoupleGuestlist = async (eventId: number, couples: CoupleData[]): Promise<boolean> => {
  try {
    // Use transaction to ensure both operations complete or none do
    await prisma.$transaction(async (tx) => {
      // Create the guestlist entries
      await tx.coupleGuestlist.createMany({
        data: couples.map(couple => ({
          eventId,
          maleName: couple.male.name,
          maleAge: couple.male.age,
          maleMobile: couple.male.mobile,
          maleEmail: couple.male.email,
          femaleName: couple.female.name,
          femaleAge: couple.female.age,
          femaleMobile: couple.female.mobile,
          femaleEmail: couple.female.email
        }))
      });

      // Update the event's coupleGlCount
      await tx.event.update({
        where: { eventId },
        data: {
          coupleGlCount: {
            decrement: couples.length
          }
        }
      });
    });
    return true;
  } catch (error) {
    console.error('Error creating couple guestlist:', error);
    return false;
  }
};

/**
 * Verify that enough slots are available for the requested submission
 */
async function verifySlotAvailability(eventId: number, formType: 'stag' | 'couple', requestedCount: number): Promise<boolean> {
  try {
    // Get current event details with fresh slot counts
    const event = await prisma.event.findUnique({
      where: { eventId }
    });
    
    if (!event) {
      console.error('Event not found during slot verification');
      return false;
    }
    
    if (formType === 'stag') {
      // Check if enough stag slots are available
      return event.stagGlCount >= requestedCount;
    } else {
      // Check if couple guestlist is enabled and has enough slots
      return event.coupleGl && (event.coupleGlCount ?? 0) >= requestedCount;
    }
  } catch (error) {
    console.error('Error verifying slot availability:', error);
    return false;
  }
}

export default async function handleGuestlistSubmit(formData: FormData): Promise<SubmissionResponse> {
  try {
    const formType = formData.get('formType') as 'stag' | 'couple'
    const eventId = formData.get('eventId') as string
    const guestCount = parseInt(formData.get('guestCount') as string)
    
    // Verify slot availability before proceeding
    const slotsAvailable = await verifySlotAvailability(parseInt(eventId), formType, guestCount);
    
    if (!slotsAvailable) {
      return {
        success: false,
        message: `Sorry, there are not enough ${formType} slots available. Someone may have just taken the last spot.`
      };
    }

    if (formType === 'stag') {
      const guests: GuestData[] = []
      
      for (let i = 0; i < guestCount; i++) {
        const guest: GuestData = {
          name: formData.get(`guests[${i}].name`) as string,
          age: parseInt(formData.get(`guests[${i}].age`) as string),
          mobile: formData.get(`guests[${i}].mobile`) as string,
          email: formData.get(`guests[${i}].email`) as string,
        }
        guests.push(guest)
      }
      
      //await db entry for stags
      const success = await createStagGuestlist(parseInt(eventId), guests);
      if(success) {
        // Get the event details first
        const event = await prisma.event.findUnique({
          where: { eventId: parseInt(eventId) },
          include: { venue: true }
        });

        if (!event) {
          throw new Error('Event not found');
        }

        console.log('Sending emails to stag guests:', guests.length);

        // Send confirmation emails using the form data guests array
        const emailPromises = guests.map((guest, index) => {
          // Add delay of 600ms between each send to respect rate limit
          return new Promise(resolve => setTimeout(resolve, index * 600))
            .then(() => {
              console.log('Attempting to send email to stag:', guest.email);
              return sendConfirmation(
                'stag',
                guests,
                event,
                guest.email
              ).then(result => {
                if (result.success) {
                  console.log(`✅ Email sent successfully to ${guest.email}`);
                  return true;
                } else {
                  console.error(`❌ Failed to send email to ${guest.email}:`, result.error);
                  return false;
                }
              }).catch(error => {
                console.error(`❌ Exception sending email to ${guest.email}:`, error);
                return false;
              });
            });
        });

        const results = await Promise.all(emailPromises);
        const successCount = results.filter(Boolean).length;
        console.log(`Email sending complete: ${successCount} successful out of ${emailPromises.length}`);
      }
      if (!success) {
        return {
          success: false,
          message: 'Failed to add guests to the guestlist. Please try again.'
        };
      }

      return { 
        success: true, 
        message: `Successfully added ${guestCount} guest${guestCount > 1 ? 's' : ''} to the guestlist! Please check your e-mail for confirmation!` 
      }
    } else {
      const couples: CoupleData[] = []
      
      for (let i = 0; i < guestCount; i++) {
        const couple: CoupleData = {
          male: {
            name: formData.get(`couples[${i}].male.name`) as string,
            age: parseInt(formData.get(`couples[${i}].male.age`) as string),
            mobile: formData.get(`couples[${i}].male.mobile`) as string,
            email: formData.get(`couples[${i}].male.email`) as string,
          },
          female: {
            name: formData.get(`couples[${i}].female.name`) as string,
            age: parseInt(formData.get(`couples[${i}].female.age`) as string),
            mobile: formData.get(`couples[${i}].female.mobile`) as string,
            email: formData.get(`couples[${i}].female.email`) as string,
          }
        }
        couples.push(couple)
      }
      
      //await db entry for couples
      const success = await createCoupleGuestlist(parseInt(eventId), couples);
      
      if (!success) {
        return {
          success: false,
          message: 'Failed to add couples to the guestlist. Please try again.'
        };
      }

      // Get the event details
      const event = await prisma.event.findUnique({
        where: { eventId: parseInt(eventId) },
        include: { venue: true }
      });

      if (!event) {
        throw new Error('Event not found');
      }

      console.log('Sending emails to couples:', couples.length);

      // Filter out empty emails and create a valid email list
      const validEmails = couples.flatMap(couple => [
        couple.male.email,
        couple.female.email
      ]).filter(email => email && email.trim() !== '');
      
      console.log('Sending emails to:', validEmails);
      
      const emailPromises = validEmails.map((email, index) => {
        // Add delay of 600ms between each send to respect rate limit
        return new Promise(resolve => setTimeout(resolve, index * 600))
          .then(() => {
            console.log('Attempting to send email to couple guest:', email);
            return sendConfirmation(
              'couple',
              couples,
              event,
              email
            ).then(result => {
              if (result.success) {
                console.log(`✅ Email sent successfully to ${email}`);
                return true;
              } else {
                console.error(`❌ Failed to send email to ${email}:`, result.error);
                return false;
              }
            }).catch(error => {
              console.error(`❌ Exception sending email to ${email}:`, error);
              return false;
            });
          });
      });

      const results = await Promise.all(emailPromises);
      const successCount = results.filter(Boolean).length;
      console.log(`Email sending complete: ${successCount} successful out of ${validEmails.length}`);

      return { 
        success: true, 
        message: `Successfully added ${guestCount} couple${guestCount > 1 ? 's' : ''} to the guestlist! Please check your e-mail for confirmation!` 
      }
    }
  } catch (error) {
    console.error('Submission error:', error)
    return {
      success: false,
      message: 'Failed to submit to guestlist. Please try again.'
    }
  }
}