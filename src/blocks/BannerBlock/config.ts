import type { Block } from 'payload'

export const BannerBlock: Block = {
  slug: 'bannerBlock',
  interfaceName: 'BannerBlock',
  labels: {
    singular: 'Banner Block',
    plural: 'Banner Blocks',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Imagem',
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt text centralizado',
    },
  ],
}
