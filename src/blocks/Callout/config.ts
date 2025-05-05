import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Callout: Block = {
  slug: 'callout',
  labels: {
    singular: 'Callout',
    plural: 'Callouts',
  },
  fields: [
    {
      name: 'title',
      type: 'richText',
      label: 'Optional Title',
      required: false,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [...rootFeatures],
      }),
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [...rootFeatures],
      }),
    },
    {
      name: 'icon',
      type: 'text',
      label: 'Icon (optional)',
      required: false,
      defaultValue: '',
    },
  ],
}
