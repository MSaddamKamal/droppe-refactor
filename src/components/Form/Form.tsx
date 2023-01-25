import { yupResolver } from '@hookform/resolvers/yup'
import { type ProductBasicInfo } from 'components/Product/types'
import Button from 'components/Utility/Button'
import React from 'react'
import { useForm } from 'react-hook-form'
import styles from './Form.module.css'
import validationSchema from './validation'

interface FormProps {
  getSubmitResponse: (error: boolean, productPayload: object) => void
}

const Form = ({ getSubmitResponse }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ProductBasicInfo>({
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = async (data: ProductBasicInfo) => {
    const productPayload = {
      ...data,
      isFavorite: false,
      rating: {
        rate: 0,
        count: 0
      }
    }

    const url = 'https://fakestoreapi.com/products'

    try {
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(productPayload)
      })
      const jsonResponse = await res.json()

      getSubmitResponse(false, { ...productPayload, id: jsonResponse?.id })
    } catch (er) {
      getSubmitResponse(true, {})
    }
  }

  return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<label htmlFor='title' className={styles.label}>
				Product Title: *
			</label>
			<input
				id='title'
				type='text'
				{...register('title')}
				className={styles.input}
			/>
			<div className={styles.invalid_feedback} role='alert'>
				{errors.title?.message}
			</div>

			<label htmlFor='price' className={styles.label}>
				Product Price: *
			</label>
			<input
				id='price'
				type='number'
				{...register('price')}
				className={styles.input}
			/>
			<div className={styles.invalid_feedback} role='alert'>
				{errors.price?.message}
			</div>

			<label htmlFor='description' className={styles.label}>
				Product Description: *
			</label>
			<textarea
				id='description'
				{...register('description')}
				className={styles.textarea}
			></textarea>
			<div className={styles.invalid_feedback} role='alert'>
				{errors.description?.message}
			</div>

			<Button type='submit' aria-label='add'>
				Add a product
			</Button>
		</form>
  )
}

export default Form
