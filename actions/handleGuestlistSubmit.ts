'use server'

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

// Simulate database operation
const simulateDbOperation = async <T>(data: T): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate 90% success rate
      const success = Math.random() < 0.9;
      console.log(`DB Operation ${success ? 'successful' : 'failed'}:`, data);
      resolve(success);
    }, 2000); // Simulate 2 second delay
  });
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
      
      // database operation
      const success = await simulateDbOperation({ eventId, guests });
      
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
      
      // Simulate database operation
      const success = await simulateDbOperation({ eventId, couples });
      
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