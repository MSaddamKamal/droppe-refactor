import React from 'react'
import { FaStar } from 'react-icons/fa'
import styles from './ProductList.module.css'
import { type Product, type ToggleFavroute } from './types'

interface ProductItemProps extends Product {
  index: number
  toggleFav: ToggleFavroute
}

const ProductItem = ({
  id,
  index,
  title,
  description,
  price,
  isFavourite,
  rating,
  toggleFav
}: ProductItemProps) => {
  const {
    product: productClass,
    productBody,
    actionBarItem,
    actionBarItemLabel
  } = styles
  return (
		<div className={productClass}>
			<span className={styles['product-title']} style={{ overflowX: 'hidden' }}>
				{title}
			</span>
			{rating.rate > 0 && (
				<p>
					<strong>Rating: {rating.rate}/5</strong>
				</p>
			)}
			<p>
				<strong>Price: ${price}</strong>
			</p>

			<p className={productBody}>
				<strong>Description:</strong>
				<br />
				{description}
			</p>

			<span
				className={styles.action_bar}
				style={{ display: 'table', width: '100%' }}
			>
				<span
					className={`${actionBarItem} ${isFavourite ? 'active' : ''}`}
					role='button'
					onClick={() => {
					  toggleFav(id)
					}}
				>
					<FaStar />{' '}
					<span className={actionBarItemLabel}>
						{isFavourite ? 'Remove from favorites' : 'Add to favorites'}
					</span>
				</span>
			</span>
			<p>{isFavourite}</p>
		</div>
  )
}

export default ProductItem
