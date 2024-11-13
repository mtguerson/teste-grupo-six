import { env } from '@/env'
import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api-candidate.ogruposix.com',
  headers: {
    'Content-Type': 'application/json',
    'user-token': env.NEXT_PUBLIC_USER_TOKEN,
  },
})
