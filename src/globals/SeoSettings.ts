import type { GlobalConfig } from 'payload'

export const SeoSettings: GlobalConfig = {
  slug: 'seo-settings',
  label: 'SEO Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      defaultValue: 'Drawvaltine',
      required: false,
      admin: {
        description: 'Shown in the browser tab and social share titles.',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      required: false,
      admin: {
        description: 'Shown in search engine results. Aim for 150–160 characters.',
      },
    },
    {
      name: 'favicon',
      label: 'Favicon',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Icon shown in the browser tab. PNG or ICO, ideally 32×32 or 64×64.',
      },
    },
    {
      name: 'ogImage',
      label: 'Social Share Image',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Image shown when sharing on social media. Recommended: 1200×630.',
      },
    },
    {
      name: 'ogDescription',
      label: 'Social Share Description',
      type: 'textarea',
      required: false,
      admin: {
        description: 'Overrides the meta description for social sharing. Leave blank to use the meta description.',
      },
    },
  ],
}
