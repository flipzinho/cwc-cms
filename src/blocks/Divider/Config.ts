import type { Block } from 'payload'

export const DividerBlock: Block = {
  slug: 'divider-block',
  labels: {
    singular: 'Divider',
    plural: 'Dividers',
  },
  fields: [
    {
      name: 'style',
      type: 'select',
      label: 'Style',
      options: [
        { label: 'Solid', value: 'solid' },
        { label: 'Dashed', value: 'dashed' },
        { label: 'Dotted', value: 'dotted' },
      ],
      required: true,
      defaultValue: 'solid',
    },
    {
      name: 'color',
      type: 'text',
      label: 'Color',
      required: false,
      defaultValue: '#cccccc', // Default color
    },
    {
      name: 'thickness',
      type: 'number',
      label: 'Thickness (px)',
      required: false,
      defaultValue: 1,
    },
    {
      name: 'margin',
      type: 'number',
      label: 'Margin (px)',
      required: false,
      defaultValue: 16,
    },
  ],
}
