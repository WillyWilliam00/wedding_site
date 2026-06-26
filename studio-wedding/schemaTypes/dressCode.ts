import {defineField, defineType} from 'sanity'

export const dressCode = defineType({
  name: 'dressCode',
  title: 'Dress Code',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Dress Code',
    }),
    defineField({
      name: 'code',
      title: 'Code Type',
      type: 'string',
      description: 'e.g. Black Tie Optional, Casual, etc.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'suggestedColors',
      title: 'Suggested Colors',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', type: 'string', title: 'Color Name'},
            {name: 'hex', type: 'string', title: 'Hex Code'},
          ],
        },
      ],
    }),
    defineField({
      name: 'paletteLabel',
      title: 'Palette Label',
      type: 'string',
      initialValue: 'Palette Colori Suggerita',
    }),
    defineField({
      name: 'avoidLabel',
      title: 'Avoid Colors Label',
      type: 'string',
      initialValue: 'Si prega di evitare:',
    }),
    defineField({
      name: 'avoidColors',
      title: 'Colors to Avoid',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
})
