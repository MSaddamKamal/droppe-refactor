import * as React from 'react'
import styles from './Button.module.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  ...props
}) => (
	<button className={styles.button} {...props} onClick={onClick}>
		{children}
	</button>
)

export default Button
