import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons/Image'

type MediaAssetParent = {kind?: 'photo' | 'video'}

export const mediaAsset = defineType({
  name: 'mediaAsset',
  title: 'Media Asset',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'kind',
      type: 'string',
      options: {
        list: [
          {title: 'Photo', value: 'photo'},
          {title: 'Video', value: 'video'},
        ],
        layout: 'radio',
      },
      initialValue: 'photo',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
      hidden: ({parent}) => (parent as MediaAssetParent)?.kind !== 'photo',
      validation: (rule) =>
        rule.custom((value, context) => {
          const kind = (context.parent as MediaAssetParent)?.kind
          if (kind === 'photo' && !value) return 'Required for photo assets'
          return true
        }),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      description:
        'Link to the hosted video (e.g. YouTube, Vimeo). Video is not stored as a Sanity file asset.',
      type: 'url',
      hidden: ({parent}) => (parent as MediaAssetParent)?.kind !== 'video',
      validation: (rule) =>
        rule
          .uri({scheme: ['http', 'https']})
          .custom((value, context) => {
            const kind = (context.parent as MediaAssetParent)?.kind
            if (kind === 'video' && !value) return 'Required for video assets'
            return true
          }),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      description: 'Poster image shown before the video plays.',
      type: 'image',
      options: {hotspot: true},
      hidden: ({parent}) => (parent as MediaAssetParent)?.kind !== 'video',
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      description: 'Video dimensions, used to reserve layout space before it loads.',
      type: 'object',
      hidden: ({parent}) => (parent as MediaAssetParent)?.kind !== 'video',
      fields: [
        defineField({
          name: 'width',
          type: 'number',
          validation: (rule) => rule.required().positive(),
        }),
        defineField({
          name: 'height',
          type: 'number',
          validation: (rule) => rule.required().positive(),
        }),
      ],
    }),
    defineField({
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
    }),
    defineField({
      name: 'capturedAt',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'camera',
      type: 'object',
      fields: [
        defineField({name: 'make', type: 'string'}),
        defineField({name: 'model', type: 'string'}),
        defineField({name: 'lens', type: 'string'}),
        defineField({name: 'focalLengthMm', type: 'number'}),
        defineField({name: 'aperture', type: 'number'}),
        defineField({name: 'iso', type: 'number'}),
        defineField({name: 'shutterSpeed', type: 'string'}),
      ],
    }),
    defineField({
      name: 'location',
      type: 'reference',
      to: [{type: 'location'}],
    }),
  ],
  preview: {
    select: {title: 'altText', media: 'photo', kind: 'kind'},
    prepare({title, media, kind}) {
      return {
        title: title || (kind === 'video' ? 'Video' : 'Photo'),
        media,
      }
    },
  },
})
