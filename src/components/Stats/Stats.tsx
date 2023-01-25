import React from 'react'
import styles from './Stats.module.css'

interface StatsProps {
  totalProducts: number
  favourites: number
}

const Stats = ({ totalProducts, favourites }: StatsProps) => {
  return (
		<div className={styles.statsContainer}>
			<span>Total products: {totalProducts}</span>
			<span>-</span>
			<span>Number of favorites: {favourites}</span>
		</div>
  )
}

export default Stats
