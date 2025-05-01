import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const QuoteBlock: Block = {
  slug: 'quote',
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
      label: 'Author',
    },
  ],
}
