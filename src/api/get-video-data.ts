import { api } from "../services/http-client"

interface GetVideoDataResponse {
  HTTPStatus: number
  executed: boolean
  userIdentified: boolean
  message: string
  userToken: string
  object: {
    checkout_id: number
    identifier: string
    video_headline: string
    video_sub_headline: string
    video_url: string
    products: {
      product_id: number
      name: string
      price: number
      discount: number
      freight: string
      image_url: string
      best_choice: boolean
  } []
  created_at: string
  updated_at: string
  } []
}

export async function getVideoData() {
  const { data } = await api.get<GetVideoDataResponse>('/checkout/95BD9233-8FDC-48AD-B4C5-E5BAF7578C15')

  return data
}