import type { GlobalConfig } from 'payload'

export const PortfolioPage: GlobalConfig = {
  slug: 'portfolio-page',
  access: {
    read: () => true,
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
      type: 'richText',
      required: false,
    },
  ],
}
