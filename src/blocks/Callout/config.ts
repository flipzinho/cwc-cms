import type { Block } from 'payload'

export const Callout: Block = {
  slug: 'callout',
  labels: {
    singular: 'Callout',
    plural: 'Callouts',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Optional Title',
      required: false,
    },
    {
      name: 'content',
      type: 'text',
      label: 'Content',
      required: true,
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
