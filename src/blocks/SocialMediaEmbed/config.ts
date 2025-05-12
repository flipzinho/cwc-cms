import { Block } from 'payload';

const SocialMediaEmbed: Block = {
  slug: 'socialMediaEmbed',
  labels: {
    singular: 'Social Media Embed',
    plural: 'Social Media Embeds',
  },
  fields: [
    {
      name: 'url',
      type: 'text',
      label: 'Social Media URL',
      required: true,
    },
  ],
};

export default SocialMediaEmbed;
