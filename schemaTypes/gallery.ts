import {defineArrayMember, defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons/Images'

export const gallery = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  icon: ImagesIcon,
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
      name: 'description',
      type: 'text',
    }),
    defineField({
      name: 'items',
      title: 'Items',
      description: 'Ordered curation of media pulled from one or more trips.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'galleryItem',
          fields: [
            defineField({
              name: 'mediaAsset',
              type: 'reference',
              to: [{type: 'mediaAsset'}],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'trip',
              type: 'reference',
              to: [{type: 'trip'}],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'caption',
              type: 'string',
            }),
          ],
          preview: {
            select: {title: 'caption', media: 'mediaAsset.photo'},
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'title'},
  },
})
