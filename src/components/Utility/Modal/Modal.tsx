import React, { useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import Modal from 'react-modal'
import styles from './Modal.module.css'

interface Props {
  openModal: boolean
  closeModal: () => void
  children: React.ReactNode
}

const ReactModal = ({ children, openModal, closeModal }: Props) => {
  useEffect(() => {
    const bodyStyle = document.body.style

    bodyStyle.overflowY = 'hidden'

    return () => {
      bodyStyle.overflowY = 'auto'
    }
  }, [])

  return (
		<Modal
			isOpen={openModal}
			className={styles.react__Modal}
			overlayClassName={styles.modal__overlay}
		>
			<div className={styles.close__icon__container}>
				<button type='button' className={styles.modal__close} onClick={closeModal}>
					<FaTimes />
				</button>
			</div>
			{children}
		</Modal>
  )
}
export default ReactModal
