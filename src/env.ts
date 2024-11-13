import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_USER_TOKEN: z.coerce.string(),
  NEXT_PUBLIC_API_URL: z.coerce.string(),
})

const parsedEnv = envSchema.safeParse({
  NEXT_PUBLIC_USER_TOKEN: process.env.NEXT_PUBLIC_USER_TOKEN,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
})

if (!parsedEnv.success) {
  console.error('Invalid environment variables:', parsedEnv.error.format())
  throw new Error('Failed to load environment variables')
}

export const env = parsedEnv.data
