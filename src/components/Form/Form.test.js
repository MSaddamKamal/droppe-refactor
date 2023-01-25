import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Form from './Form'

describe('Testing Add Product Form', () => {
	let titleInput
	let priceInput
	let descriptionInput

	const setup = () => {
		const getSubmitResponse = jest.fn()
		render(<Form getSubmitResponse={getSubmitResponse} />)
		titleInput = screen.getByLabelText('Product Title: *')
		priceInput = screen.getByLabelText('Product Price: *')
		descriptionInput = screen.getByLabelText('Product Description: *')
	}
	beforeEach(() => {
		setup()
	})

	test('Form Can Be Rendered', async () => {
		expect(titleInput).toBeInTheDocument()

		expect(priceInput).toBeInTheDocument()

		expect(descriptionInput).toBeInTheDocument()
	})


})
