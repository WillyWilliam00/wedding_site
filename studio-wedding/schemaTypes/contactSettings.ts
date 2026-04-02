import { defineField, defineType } from 'sanity'

export const contactSettings = defineType({
  name: 'contactSettings',
  title: 'Contact & RSVP Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'info@wedding.it',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Contact Phone',
      type: 'string',
      initialValue: '+39 000 0000000',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rsvpDeadline',
      title: 'RSVP Deadline Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'successMessage',
      title: 'RSVP Success Message',
      type: 'text',
      initialValue: 'Grazie per la conferma!',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thanksText',
      title: 'Post-RSVP Thanks Text',
      type: 'text',
      initialValue: 'Grazie di cuore per essere parte del nostro giorno.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thanksImage',
      title: 'Post-RSVP Image',
      type: 'image',
    }),
    defineField({
      name: 'rsvpLabels',
      title: 'RSVP Labels & Titles',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string', title: 'RSVP Title', initialValue: 'Conferma la tua Presenza' }),
        defineField({ name: 'nameLabel', type: 'string', title: 'Name Input Label', initialValue: 'Nome' }),
        defineField({ name: 'surnameLabel', type: 'string', title: 'Surname Input Label', initialValue: 'Cognome' }),
        defineField({ name: 'attendanceLabel', type: 'string', title: 'Attendance Question', initialValue: 'Parteciperai?' }),
        defineField({ name: 'allergensTitle', type: 'string', title: 'Allergens Title', initialValue: 'Allergie e Intolleranze' }),
        defineField({ name: 'foodPreferencesTitle', type: 'string', title: 'Food Preferences Title', initialValue: 'Preferenze Alimentari' }),
        defineField({ name: 'submitButton', type: 'string', title: 'Submit Button Label', initialValue: 'Invia Conferma' }),
      ],
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Custom Credits',
      type: 'string',
    }),
  ],
})
