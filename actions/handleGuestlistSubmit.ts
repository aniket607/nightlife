'use server'
import prisma from '@/lib/prisma'

interface GuestData {
  name: string
  age: number
  mobile: string
  email: string
}

interface CoupleData {
  male: GuestData
  female: GuestData
}

interface SubmissionResponse {
  success: boolean
  message: string
}

// Database operations for stag guestlist
const createStagGuestlist = async (eventId: number, guests: GuestData[]): Promise<boolean> => {
  try {
    await prisma.stagGuestlist.createMany({
      data: guests.map(guest => ({
        eventId,
        guestName: guest.name,
        guestAge: guest.age,
        guestMobile: guest.mobile,
        guestEmail: guest.email
      }))
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
    await prisma.coupleGuestlist.createMany({
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
    return true;
  } catch (error) {
    console.error('Error creating couple guestlist:', error);
    return false;
  }
};

export default async function handleGuestlistSubmit(formData: FormData): Promise<SubmissionResponse> {
  try {
    const formType = formData.get('formType') as 'stag' | 'couple'
    const eventId = formData.get('eventId') as string
    const guestCount = parseInt(formData.get('guestCount') as string)

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