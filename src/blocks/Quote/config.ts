import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const QuoteBlock: Block = {
  slug: 'quote',
  labels: {
    singular: 'Quote Block',
    plural: 'Quote Blocks',
  },
  fields: [
    {
      name: 'quoteText',
      type: 'richText',
      required: true,
      label: 'Quote Text',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [...rootFeatures],
      }),
    },
    {
      name: 'author',
      type: 'text',
      label: 'Author Name',
    },
    {
      name: 'role',
      type: 'text',
      label: 'Author Role',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Author Avatar',
    },
  ],
}
