import type { CollectionConfig } from 'payload'

export const Artwork: CollectionConfig = {
  slug: 'artwork',
  access: {
    read: () => true,
    // read: ({ req: {user} }) => {
    //     return {
    //         _status: {
    //             equals: 'published'
    //         }
    //     }
    // },
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
        name: 'description',
        type: 'textarea',
        required: false,
    },
    {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        required: true,
    },
  ],
}
