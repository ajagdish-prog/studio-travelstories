import {defineField, defineType} from 'sanity'
import {PinIcon} from '@sanity/icons/Pin'

export const location = defineType({
  name: 'location',
  title: 'Location',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'country',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'region',
      type: 'string',
    }),
    defineField({
      name: 'coordinates',
      type: 'object',
      fields: [
        defineField({
          name: 'latitude',
          type: 'number',
          validation: (rule) => rule.required().min(-90).max(90),
        }),
        defineField({
          name: 'longitude',
          type: 'number',
          validation: (rule) => rule.required().min(-180).max(180),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'timezone',
      type: 'string',
      description: 'IANA timezone identifier, e.g. "Europe/Lisbon"',
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'country'},
  },
})
