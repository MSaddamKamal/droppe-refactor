import { render, screen } from '@testing-library/react'
import ProductList from './ProductList'

const dummyData = [
	{
		id: 1,
		title: 'product 1',
		description: 'test',
		price: 10,
		isFavorite: false,
		rating: {
			rate: 5,
			count: 0,
		},
	},
	{
		id: 2,
		title: 'product 2',
		description: 'test',
		price: 3,
		isFavorite: false,
		rating: {
			rate: 3,
			count: 0,
		},
	},
]

describe('Testing Products Listing', () => {
	test('Able To Render Handle Product List When No Data Is Avaliable', () => {
		const toggle = jest.fn()
		render(<ProductList products={[]} toggleFav={{ toggle }} />)
		const el = screen.getByText('No Data Avaliable')
		expect(el).toBeInTheDocument()
	})

	test('Able To Render Products in Product List', () => {
		const toggle = jest.fn()
		render(<ProductList products={dummyData} toggleFav={{ toggle }} />)
		const el = screen.queryByText('No Data Avaliable')
		expect(el).not.toBeInTheDocument()
		const productTitle1 = screen.getByText('product 1')
		expect(productTitle1).toBeInTheDocument()
		const productTitle2 = screen.getByText('product 2')
		expect(productTitle2).toBeInTheDocument()
	})
})
