import {defineArrayMember, defineField} from 'sanity'

export function richTextBlock() {
  return defineArrayMember({
    type: 'block',
    styles: [{title: 'Normal', value: 'normal'}],
    lists: [],
    marks: {
      decorators: [
        {title: 'Bold', value: 'strong'},
        {title: 'Italic', value: 'em'},
      ],
      annotations: [
        defineArrayMember({
          name: 'link',
          type: 'object',
          title: 'Link',
          fields: [
            defineField({
              name: 'href',
              type: 'url',
              title: 'URL',
              validation: (rule) =>
                rule.uri({scheme: ['http', 'https', 'mailto']}).required(),
            }),
          ],
        }),
      ],
    },
  })
}
