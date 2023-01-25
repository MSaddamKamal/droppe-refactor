import logo from 'assets/images/droppe-logo.png'
import React from 'react'
import styles from './Header.module.css'

export default function Header () {
  return (
		<header className={styles.header}>
			<div className={styles.logo_wrapper}>
				<img src={logo} className={styles.logo} alt='Droppe' />
			</div>
		</header>
  )
}
