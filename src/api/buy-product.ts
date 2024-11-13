import { api } from "@/services/http-client";

export interface BuyProductRequest {
  name: string
  email: string
  phone_number: string
  street_number: number
  street: string
  district: string
  city: string
  state: string
  product_id: number
}

export interface BuyProductResponse {
  HTTPStatus: number
  executed: boolean
  userIdentified: boolean
  message: string
  object: null
}


export async function buyProductFn({ product_id, ...params }: BuyProductRequest) {
  await api.post<BuyProductResponse>(`/buy/${product_id}`, params)
}