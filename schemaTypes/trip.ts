import {defineArrayMember, defineField, defineType} from 'sanity'
import {EarthAmericasIcon} from '@sanity/icons/EarthAmericas'

export const trip = defineType({
  name: 'trip',
  title: 'Trip',
  type: 'document',
  icon: EarthAmericasIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      type: 'text',
    }),
    defineField({
      name: 'startDate',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      type: 'date',
      validation: (rule) =>
        rule.custom((endDate, context) => {
          const startDate = (context.document as {startDate?: string} | undefined)?.startDate
          if (startDate && endDate && endDate < startDate) {
            return 'End date must be on or after the start date'
          }
          return true
        }),
    }),
    defineField({
      name: 'location',
      type: 'reference',
      to: [{type: 'location'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'posts',
      title: 'Posts',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'post'}]})],
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'startDate'},
  },
})
