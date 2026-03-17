import { defineField, defineType } from 'sanity'

export const chiesa = defineType({
  name: 'chiesa',
  title: 'Chiesa (Cerimonia)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome della Chiesa',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Indirizzo',
      type: 'string',
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'Google Maps URL',
      type: 'url',
    }),
    defineField({
      name: 'description',
      title: 'Descrizione',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Immagine di sfondo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'coordinates',
      title: 'Coordinate',
      type: 'geopoint',
      description: 'Coordinate geografiche della chiesa',
    }),
    defineField({
      name: 'gallery',
      title: 'Galleria Fotografica',
      type: 'array',
      of: [
        {
          type: 'image',
          name: 'image',
          title: 'Immagine',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Testo Alternativo',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
  ],
})
