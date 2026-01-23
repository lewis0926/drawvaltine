import type { CollectionConfig } from 'payload'

export const AboutPage: CollectionConfig = {
  slug: 'about-page',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
        name: 'title',
        type: 'text',
        required: true,
    },
    {
        name: 'subtitle',
        type: 'text',
        required: false,
    },
    {
        name: 'content',
        type: 'textarea',
        required: false,
    },
    {
        name: 'profileImage',
        type: 'upload',
        relationTo: 'media',
        required: true,
    }
  ],
}
