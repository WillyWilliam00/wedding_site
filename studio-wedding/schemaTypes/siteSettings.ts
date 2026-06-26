import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'coupleNames',
      title: 'Couple Names',
      type: 'object',
      fields: [
        defineField({
          name: 'groom',
          type: 'string',
          title: 'Groom Name',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'bride',
          type: 'string',
          title: 'Bride Name',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'weddingDate',
      title: 'Wedding Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroTagline',
      title: 'Hero Tagline',
      type: 'string',
      initialValue: 'La nostra avventura continua...',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'colors',
      title: 'Site Colors (Semantic)',
      type: 'object',
      fields: [
        defineField({
          name: 'primary',
          title: 'Primary / Accent',
          type: 'string',
          initialValue: '#D4AF37',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'background',
          title: 'Background',
          type: 'string',
          initialValue: '#FFFFFF',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'surface',
          title: 'Surface',
          type: 'string',
          initialValue: '#FFFFFF',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'textPrimary',
          title: 'Text Primary',
          type: 'string',
          initialValue: '#1F2937',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'textSecondary',
          title: 'Text Secondary',
          type: 'string',
          initialValue: '#4B5563',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'navbar',
      title: 'Navigation Bar',
      type: 'object',
      fields: [
        defineField({
          name: 'links',
          title: 'Navigation Links',
          type: 'array',
          initialValue: [
            {_key: '1', label: 'Home', href: '#hero'},
            {_key: '2', label: 'Chi Siamo', href: '#chi-siamo'},
            {_key: '3', label: 'Timeline', href: '#timeline'},
            {_key: '4', label: 'Location', href: '#location'},
            {_key: '5', label: 'Lista Nozze', href: '#lista-nozze'},
            {_key: '6', label: 'RSVP', href: '#rsvp'},
            {_key: '7', label: 'FAQ', href: '#faq'},
          ],
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'label',
                  type: 'string',
                  title: 'Label',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'href',
                  type: 'string',
                  title: 'Link (e.g. #hero)',
                  validation: (Rule) => Rule.required(),
                },
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'countdownLabels',
      title: 'Countdown Labels',
      type: 'object',
      fields: [
        defineField({name: 'days', type: 'string', title: 'Days Label', initialValue: 'Giorni'}),
        defineField({name: 'hours', type: 'string', title: 'Hours Label', initialValue: 'Ore'}),
        defineField({
          name: 'minutes',
          type: 'string',
          title: 'Minutes Label',
          initialValue: 'Minuti',
        }),
        defineField({
          name: 'seconds',
          type: 'string',
          title: 'Seconds Label',
          initialValue: 'Secondi',
        }),
      ],
    }),
    defineField({
      name: 'sectionTitles',
      title: 'Section Titles',
      type: 'object',
      fields: [
        defineField({
          name: 'timeline',
          type: 'string',
          title: 'Timeline Title',
          initialValue: 'Timeline del Giorno',
        }),
        defineField({
          name: 'faq',
          type: 'string',
          title: 'FAQ Title',
          initialValue: 'Domande Frequenti',
        }),
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'credits',
          type: 'string',
          title: 'Custom Credits',
          initialValue: 'Creato con amore per',
        }),
      ],
    }),
  ],
})
