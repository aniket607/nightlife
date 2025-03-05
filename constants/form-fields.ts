/*
  Form field definitions for the guestlist forms
 */

import { FormField } from '@/types/form';

/*
  Field definitions for the stag (single guest) form
 */
export const stagFields: FormField[] = [
  {
    id: 'guestName',
    label: 'Guest Name',
    name: (index: number) => `guests[${index}].name`,
    type: 'text',
    placeholder: 'Enter full name',
    required: true
  },
  {
    id: 'guestAge',
    label: 'Age',
    name: (index: number) => `guests[${index}].age`,
    type: 'number',
    placeholder: 'Must be 18 or older',
    required: true,
    min: '18',
    max: '80'
  },
  {
    id: 'guestMobile',
    label: 'Mobile Number',
    name: (index: number) => `guests[${index}].mobile`,
    type: 'tel',
    placeholder: '10 Digit Mobile number',
    required: true
  },
  {
    id: 'guestEmail',
    label: 'Email',
    name: (index: number) => `guests[${index}].email`,
    type: 'email',
    placeholder: 'Enter email address',
    required: true
  }
];

/**
 * Field definitions for the couple form
 */
export const coupleFields: FormField[] = [
  {
    id: 'maleName',
    label: 'Male Name',
    name: (index: number) => `couples[${index}].male.name`,
    type: 'text',
    placeholder: 'Enter full name',
    required: true
  },
  {
    id: 'femaleName',
    label: 'Female Name',
    name: (index: number) => `couples[${index}].female.name`,
    type: 'text',
    placeholder: 'Enter full name',
    required: true
  },
  {
    id: 'maleAge',
    label: 'Male Age',
    name: (index: number) => `couples[${index}].male.age`,
    type: 'number',
    placeholder: 'Must be 18 or older',
    required: true,
    min: '18',
    max: '80'
  },
  {
    id: 'femaleAge',
    label: 'Female Age',
    name: (index: number) => `couples[${index}].female.age`,
    type: 'number',
    placeholder: 'Must be 18 or older',
    required: true,
    min: '18',
    max: '80'
  },
  {
    id: 'maleMobile',
    label: 'Male Mobile Number',
    name: (index: number) => `couples[${index}].male.mobile`,
    type: 'tel',
    placeholder: 'Enter mobile number',
    required: true
  },
  {
    id: 'femaleMobile',
    label: 'Female Mobile Number',
    name: (index: number) => `couples[${index}].female.mobile`,
    type: 'tel',
    placeholder: 'Enter mobile number',
    required: true
  },
  {
    id: 'maleEmail',
    label: 'Male Email',
    name: (index: number) => `couples[${index}].male.email`,
    type: 'email',
    placeholder: 'Enter email address',
    required: true
  },
  {
    id: 'femaleEmail',
    label: 'Female Email',
    name: (index: number) => `couples[${index}].female.email`,
    type: 'email',
    placeholder: 'Enter email address (optional)',
    required: false
  }
];
