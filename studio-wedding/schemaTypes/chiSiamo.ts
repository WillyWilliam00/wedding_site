import { defineField, defineType } from 'sanity'

export const chiSiamo = defineType({
  name: 'chiSiamo',
  title: 'Chi Siamo',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Main Heading (e.g. La nostra storia d\'amore)',
      type: 'string',
      initialValue: "La nostra storia d'amore",
    }),
    defineField({
      name: 'text',
      title: 'Text Content',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Small Badge Text (e.g. Per sempre insieme)',
      type: 'string',
      initialValue: "Per sempre insieme",
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
