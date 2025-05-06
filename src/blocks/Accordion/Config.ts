import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const AccordionBlock: Block = {
  slug: 'accordion',
  labels: {
    singular: 'Accordion',
    plural: 'Accordions',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Accordion Items',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Subtitle',
          required: false,
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
      ],
    },
  ],
}
