import {defineArrayMember, defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
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
      name: 'trip',
      type: 'reference',
      to: [{type: 'trip'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverPhoto',
      title: 'Cover Photo',
      description:
        'Hero image for this post. Falls back to its first photo media asset when empty.',
      type: 'reference',
      to: [{type: 'mediaAsset'}],
      options: {filter: 'kind == "photo"'},
    }),
    defineField({
      name: 'body',
      type: 'text',
      rows: 10,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
    defineField({
      name: 'location',
      type: 'reference',
      to: [{type: 'location'}],
    }),
    defineField({
      name: 'mediaAssets',
      title: 'Media Assets',
      description: 'Ordered list of media as they should appear in the post.',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'mediaAsset'}]})],
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'publishedAt'},
  },
})
