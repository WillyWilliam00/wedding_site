import {defineField, defineType} from 'sanity'

export const menu = defineType({
  name: 'menu',
  title: 'Wedding Menu',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Menu Title',
      type: 'string',
      initialValue: 'Il Nostro Menu',
    }),
    defineField({
      name: 'sections',
      title: 'Menu Sections',
      type: 'array',
      initialValue: [
        {_key: '1', name: 'Antipasti', items: ['Carpaccio di manzo', 'Tartare di salmone']},
        {_key: '2', name: 'Primi', items: ['Risotto allo zafferano', 'Ravioli burro e salvia']},
      ],
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Section Name',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'items',
              type: 'array',
              title: 'Items',
              of: [{type: 'string'}],
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
  ],
})
