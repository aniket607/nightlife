'use server'

// import { redirect } from 'next/navigation'

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

export default async function handleGuestlistSubmit(formData: FormData) {
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
    
    console.log('Stag submission:', { eventId, guests })
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
    
    console.log('Couple submission:', { eventId, couples }, couples[0])
  }

  // redirect(`/events/${eventId}`)
}