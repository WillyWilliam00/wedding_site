import {defineField, defineType} from 'sanity'

export const registry = defineType({
  name: 'listaNozze',
  title: 'Lista Nozze',
  type: 'document',
  preview: {
    select: {
      title: 'campiSezione.titleHeader',
    },
  },
  fields: [
    defineField({
      name: 'campiSezione',
      title: 'Campi Sezione',
      type: 'object',
      fields: [
        defineField({
          name: 'titleHeader',
          title: 'Titolo Header',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'descriptionHeader',
          title: 'Descrizione Header',
          type: 'text',
        }),
      ],
    }),
    defineField({
      name: 'lunaDiMiele',
      title: 'Dettagli Luna di Miele',
      type: 'object',
      fields: [
        defineField({
          name: 'switchTitle',
          title: 'Switch Titolo',
          type: 'string',
          validation: (Rule) => Rule.required(),
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
    }),
    // Raggruppiamo i campi della lista Amazon
    defineField({
      name: 'listaAmazon',
      title: 'Dettagli Lista Amazon',
      type: 'object',
      fields: [
        defineField({
          name: 'switchTitle',
          title: 'Switch Titolo',
          type: 'string',
        }),
        defineField({
          name: 'link',
          title: 'Link',
          type: 'url',
        }),
        defineField({
          name: 'miniTitle',
          title: 'Mini Titolo',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Messaggio',
          type: 'text',
        }),
      ],
    }),
  ],
})
