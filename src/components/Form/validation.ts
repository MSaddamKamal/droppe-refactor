import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Your product needs a title')
    .min(3, 'Title must be at least 3 characters'),
  price: Yup.number()
    .typeError('Price must be a number')
    .required('Your product needs a price'),
  description: Yup.string()
    .required('Your product needs a description')
    .min(3, 'Description must be at least 3 characters')
})

export default validationSchema
