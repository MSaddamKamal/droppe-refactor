export interface ProductBasicInfo {
  title: string
  description: string
  price: number
}

export interface Product extends ProductBasicInfo {
  id: string | number
  isFavourite: boolean
  rating: {
    rate: number
    count?: number
  }
}

export type ToggleFavroute = (id: string | number) => void
