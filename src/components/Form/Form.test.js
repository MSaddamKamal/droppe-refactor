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

	test('Should Expect Title,Price & Descrtipion Inputs', () => {
		fireEvent.change(titleInput, { target: { value: 'test' } })
		expect(screen.getByDisplayValue('test') == titleInput).toBe(true)

		fireEvent.change(priceInput, { target: { value: 40 } })
		expect(screen.getByDisplayValue(40) == priceInput).toBe(true)

		fireEvent.change(descriptionInput, {
			target: { value: 'testing description' },
		})
		expect(
			screen.getByDisplayValue('testing description') == descriptionInput
		).toBe(true)
	})

	
})
