import type { Block } from 'payload'

export const ParallaxTitleBlock: Block = {
  slug: 'parallaxTitleBlock',
  interfaceName: 'ParallaxTitleBlock',
  labels: {
    singular: 'Parallax Title',
    plural: 'Parallax Titles',
  },
  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Background Image',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
  ],
}
