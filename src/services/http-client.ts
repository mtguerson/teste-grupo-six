import { env } from '@/env'
import axios from 'axios'

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'user-token': env.NEXT_PUBLIC_USER_TOKEN,
  },
})
