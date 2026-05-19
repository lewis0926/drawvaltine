import type { CollectionConfig } from 'payload'

const MAX_BYTES = 4.5 * 1024 * 1024

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  hooks: {
    beforeOperation: [
      ({ args, operation }) => {
        if (operation === 'create' || operation === 'update') {
          const file = args.req?.file
          if (file && file.size > MAX_BYTES) {
            throw new Error(
              `File too large: ${(file.size / 1024 / 1024).toFixed(1)}MB. Maximum upload size is 4.5MB.`,
            )
          }
        }
      },
    ],
  },
  fields: [
    {
      name: 'uploadDescription',
      type: 'ui',
      admin: {
        components: {
          Field: '/src/collections/components/MediaUploadDescription#MediaUploadDescription',
        },
      },
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
