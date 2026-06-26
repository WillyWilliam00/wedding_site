import {defineField, defineType} from 'sanity'

export const registry = defineType({
  name: 'listaNozze',
  title: 'Lista Nozze',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
    }),
    defineField({
      name: 'iban',
      title: 'IBAN',
      type: 'string',
    }),
    defineField({
      name: 'beneficiary',
      title: 'Beneficiary',
      type: 'string',
    }),
  ],
})
