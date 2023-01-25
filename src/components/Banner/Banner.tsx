import img1 from 'assets/images/img1.png'
import img2 from 'assets/images/img2.png'
import React from 'react'
import styles from './Banner.module.css'

export default function Banner () {
  return (
		<div
			className={`container ${styles.main}`}
			style={{
			  margin: '50px inherit',
			  display: 'flex',
			  justifyContent: 'space-evenly'
			}}
		>
			<img src={img1} alt="Banner-1" style={{ maxHeight: '15em', display: 'block' }} />
			<img src={img2} alt="Banner-1" style={{ maxHeight: '15rem', display: 'block' }} />
		</div>
  )
}
