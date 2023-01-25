import * as React from 'react'
import ProductItem from './ProductItem'
import { type Product, type ToggleFavroute } from './types'

interface ProductListProps {
  products: Product[]
  toggleFav: ToggleFavroute
}

export const ProductList = ({ products, toggleFav }: ProductListProps) => {
  return (
		<>
			{products.length > 0
			  ? (
			  products.map((item, index) => (
						<ProductItem key={item.id} index={index} {...item} toggleFav={toggleFav} />
			  ))
			    )
			  : (
					<p>No Data Avaliable</p>
			    )}
		</>
  )
}

export default ProductList
