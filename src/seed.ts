import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

async function fetchImageBuffer(url: string): Promise<Buffer> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch image: ${url}`)
  return Buffer.from(await res.arrayBuffer())
}

async function uploadMedia(
  payload: Awaited<ReturnType<typeof getPayload>>,
  url: string,
  filename: string,
  alt: string,
) {
  const data = await fetchImageBuffer(url)
  return payload.create({
    collection: 'media',
    data: { alt },
    file: {
      data,
      mimetype: 'image/jpeg',
      name: filename,
      size: data.length,
    },
  })
}

function paragraph(...text: string[]) {
  return {
    type: 'paragraph',
    format: '' as const,
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: text.map((t) => ({
      type: 'text',
      format: 0,
      style: '',
      mode: 'normal',
      detail: 0,
      text: t,
      version: 1,
    })),
    textFormat: 0,
    textStyle: '',
  }
}

function heading(tag: 'h1' | 'h2' | 'h3', text: string) {
  return {
    type: 'heading',
    tag,
    format: '' as const,
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: [
      {
        type: 'text',
        format: 0,
        style: '',
        mode: 'normal',
        detail: 0,
        text,
        version: 1,
      },
    ],
    textFormat: 0,
    textStyle: '',
  }
}

function richText(...nodes: object[]) {
  return {
    root: {
      type: 'root',
      format: '' as const,
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: nodes,
    },
  }
}

async function seed() {
  const payload = await getPayload({ config: await config })

  console.log('Seeding database...')

  // ── Media ──────────────────────────────────────────────────────────────────

  console.log('Uploading media...')

  const profileImage = await uploadMedia(
    payload,
    'https://picsum.photos/seed/portrait/800/1000',
    'profile.jpg',
    'Artist profile photo',
  )

  const artwork1Image = await uploadMedia(
    payload,
    'https://picsum.photos/seed/artwork1/1200/900',
    'artwork-still-life.jpg',
    'Still Life in Blue — artwork photograph',
  )

  const artwork2Image = await uploadMedia(
    payload,
    'https://picsum.photos/seed/artwork2/1200/900',
    'artwork-landscape.jpg',
    'The Quiet Shore — artwork photograph',
  )

  // ── About Page ────────────────────────────────────────────────────────────

  console.log('Seeding About page...')

  await payload.updateGlobal({
    slug: 'about-page',
    data: {
      title: 'Valentina Draws',
      subtitle: 'Painter & illustrator based in Melbourne',
      profileImage: profileImage.id,
      body: richText(
        paragraph(
          'I work in oil, gouache, and ink — drawn to the tension between stillness and motion, ' +
            'between the domestic and the vast. My paintings often begin with a small observation: ' +
            'light on a kitchen table, a shadow stretched long across a wall, the way water holds colour ' +
            'differently than we expect.',
        ),
        paragraph(
          'After studying fine arts at RMIT and a residency in Oaxaca, I returned to Melbourne where I ' +
            'maintain a studio in Collingwood. My work has been shown across Australia and in group ' +
            'exhibitions in Mexico City and Berlin.',
        ),
        heading('h2', 'Process'),
        paragraph(
          'Every piece starts in a sketchbook. I fill pages before committing to canvas — not as ' +
            'planning exactly, but as listening. I want to understand what a subject is asking for ' +
            'before I decide how to answer.',
        ),
        paragraph(
          'I am currently working on a series exploring the coastline south of Melbourne at different ' +
            'times of day. The same rocks, the same water — and yet entirely new each time.',
        ),
      ),
    },
  })

  // ── Portfolio Page ─────────────────────────────────────────────────────────

  console.log('Seeding Portfolio page...')

  await payload.updateGlobal({
    slug: 'portfolio-page',
    data: {
      title: 'Portfolio',
      subtitle: 'A selection of recent work',
      content: richText(
        paragraph(
          'These works span the last three years and range from intimate still lifes to larger ' +
            'landscape studies. Each piece is available as an original or as a limited archival print.',
        ),
        paragraph(
          'For commissions, pricing, or studio visits — feel free to get in touch.',
        ),
      ),
    },
  })

  // ── Artworks ───────────────────────────────────────────────────────────────

  console.log('Seeding artworks...')

  await payload.create({
    collection: 'artwork',
    data: {
      title: 'Still Life in Blue',
      description:
        'Oil on linen, 60 × 80 cm. A study of reflected light through coloured glass — painted over three sessions in late afternoon.',
      image: artwork1Image.id,
    },
  })

  await payload.create({
    collection: 'artwork',
    data: {
      title: 'The Quiet Shore',
      description:
        'Gouache on paper, 40 × 55 cm. Part of the ongoing coastline series. Painted on location at low tide, finished in the studio.',
      image: artwork2Image.id,
    },
  })

  console.log('Done.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
