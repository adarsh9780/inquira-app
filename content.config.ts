import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const linkSchema = z.object({
  label: z.string(),
  href: z.string()
})

const videoSchema = z.object({
  src: z.string(),
  poster: z.string(),
  alt: z.string()
})

const imageSchema = z.object({
  src: z.string(),
  alt: z.string()
})

const mediaSchema = z.object({
  video: videoSchema,
  image: imageSchema
})

const iconSchema = z.enum([
  'idea',
  'code',
  'database',
  'editor',
  'chart',
  'clock',
  'terminal',
  'message',
  'workspace',
  'key'
])

const sectionIntroSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  description: z.string()
})

export default defineContentConfig({
  collections: {
    landing: defineCollection({
      source: 'landing/home.yml',
      type: 'data',
      schema: z.object({
        hero: z.object({
          badge: z.string(),
          title: z.string(),
          highlight: z.string(),
          description: z.string(),
          ctas: z.array(linkSchema),
          stats: z.array(z.object({
            value: z.string(),
            label: z.string()
          }))
        }),
        features: sectionIntroSchema.extend({
          productDemos: z.array(z.object({
            id: z.string(),
            eyebrow: z.string(),
            title: z.string(),
            summary: z.string(),
            icon: iconSchema,
            demoType: z.enum([
              'ask-answer',
              'create-workspace',
              'add-api-key'
            ]),
            media: mediaSchema
          })),
          secondaryFeatures: z.array(z.object({
            id: z.string(),
            title: z.string(),
            summary: z.string(),
            icon: iconSchema,
            media: mediaSchema
          }))
        }),
        howItWorks: sectionIntroSchema.extend({
          steps: z.array(z.object({
            number: z.number(),
            title: z.string(),
            description: z.string(),
            shadowColor: z.string()
          }))
        }),
        pricing: sectionIntroSchema.extend({
          popularLabel: z.string(),
          plans: z.array(z.object({
            name: z.string(),
            description: z.string(),
            features: z.array(z.string()),
            cta: linkSchema,
            popular: z.boolean()
          }))
        }),
        download: z.object({
          title: z.string(),
          description: z.string(),
          email: z.object({
            label: z.string(),
            optionalLabel: z.string(),
            placeholder: z.string(),
            helper: z.string()
          }),
          mac: z.object({
            title: z.string(),
            description: z.string()
          }),
          windows: z.object({
            title: z.string(),
            description: z.string()
          }),
          note: z.string(),
          sourceLink: linkSchema,
          distributionLink: linkSchema,
          dialog: z.object({
            eyebrow: z.string(),
            stepsTitle: z.string(),
            steps: z.array(z.string()),
            commandTitle: z.string(),
            futurePlanTitle: z.string(),
            futurePlanBody: z.string(),
            futurePlanLink: linkSchema,
            fullNoteLink: linkSchema,
            copyButtonLabel: z.string(),
            copiedButtonLabel: z.string()
          })
        })
      })
    }),
    docs: defineCollection({
      source: 'docs/**',
      type: 'page',
      schema: z.object({
        title: z.string(),
        description: z.string().optional()
      })
    })
  }
})
