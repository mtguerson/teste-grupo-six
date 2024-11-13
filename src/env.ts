import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_USER_TOKEN: z.coerce.string(),
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error('Invalid environment variables:', parsedEnv.error.format())
  throw new Error('Failed to load environment variables')
}

export const env = parsedEnv.data
