import {defineArrayMember, defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons/Image'

import {richTextBlock} from './richTextBlock'

export const mediaBlock = defineType({
  name: 'mediaBlock',
  title: 'Media',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'items',
      title: 'Media',
      description: 'One photo/video, or a small group to render together.',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'mediaAsset'}]})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'caption',
      type: 'array',
      of: [richTextBlock()],
    }),
  ],
  preview: {
    select: {media: 'items.0.photo', count: 'items.length'},
    prepare({media, count}) {
      return {
        title: count > 1 ? `Media group (${count})` : 'Media',
        media,
      }
    },
  },
})
