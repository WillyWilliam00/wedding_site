import {defineField, defineType} from 'sanity'

export const accommodation = defineType({
  name: 'accommodation',
  title: 'Hospitality',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Dove Dormire',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'options',
      title: 'Accommodation Options',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', type: 'string', title: 'Name'},
            {name: 'type', type: 'string', title: 'Type (e.g. Boutique, Rustico)'},
            {name: 'address', type: 'string', title: 'Address'},
            {name: 'distance', type: 'string', title: 'Distance Label (e.g. 1.2 km)'},
            {name: 'distance_km', type: 'number', title: 'Distance for Sorting (Number, e.g. 1.2)'},
            {name: 'price', type: 'string', title: 'Price Label (e.g. Da 66€)'},
            {name: 'price_val', type: 'number', title: 'Price for Sorting (Number, e.g. 66)'},
            {name: 'price_range', type: 'string', title: 'Price Range Symbol (e.g. €, €€)'},
            {name: 'phone', type: 'string', title: 'Phone'},
            {name: 'website', type: 'url', title: 'Website'},
            {name: 'image', type: 'image', title: 'Photo', options: {hotspot: true}},
            {name: 'image_url', type: 'url', title: 'Fallback Image URL (used if Photo is empty)'},
          ],
        },
      ],
    }),
  ],
})
