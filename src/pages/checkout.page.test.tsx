import 'jest-dom/extend-expect'
import React from 'react'
import { MemoryRouter } from 'react-router'
import { cleanup, fireEvent, render } from 'react-testing-library'
import { Cart } from '../cart/cart.context'
import CheckoutPage from './checkout.page'

afterEach(cleanup)

describe('Checkout page', () => {
	test('Displays a message about empty cart', () => {
		const component = render(
			<MemoryRouter>
				<CheckoutPage />
			</MemoryRouter>
		)
		const emptyText = component.getByText(/cart is empty/)

		expect(emptyText).toBeInTheDocument()
	})

	test('sums up cart value correctly', async () => {
		window.sessionStorage.setItem(
			'shopping-cart',
			JSON.stringify([
				{ product: tv, color: 0, subOption: 0, quantity: 3 },
				{ product: playstation, color: 1, subOption: 0, quantity: 2 },
			])
		)

		const component = render(
			<MemoryRouter>
				<Cart>
					<CheckoutPage />
				</Cart>
			</MemoryRouter>
		)

		const playstationSum = component.getByTestId(/line-sum-1/)
		const tvSum = component.getByTestId(/line-sum-2/)
		const cartSum = component.getByTestId('cart-total')

		expect(playstationSum.textContent).toMatch(/6000/)
		expect(tvSum.textContent).toMatch(/18000/)
		expect(cartSum.textContent).toMatch(/24000/)
	})

	test('updates cart value correctly when quantity is changed', async () => {
		window.sessionStorage.setItem(
			'shopping-cart',
			JSON.stringify([
				{ product: tv, color: 0, subOption: 0, quantity: 3 },
				{ product: playstation, color: 1, subOption: 0, quantity: 2 },
			])
		)

		const component = render(
			<MemoryRouter>
				<Cart>
					<CheckoutPage />
				</Cart>
			</MemoryRouter>
		)

		const playstationSum = component.getByTestId(/line-sum-1/)
		const playstationQuantity = component.getByTestId(/line-quantity-1/)
		const cartSum = component.getByTestId('cart-total')

		expect(playstationSum.textContent).toMatch(/6000/)
		expect(cartSum.textContent).toMatch(/24000/)

		fireEvent.change(playstationQuantity, { target: { value: '5' } })

		expect(playstationSum.textContent).toMatch(/15000/)
		expect(cartSum.textContent).toMatch(/33000/)
	})

	test('updates cart value correctly when an item is removed', async () => {
		window.sessionStorage.setItem(
			'shopping-cart',
			JSON.stringify([
				{ product: tv, color: 0, subOption: 0, quantity: 3 },
				{ product: playstation, color: 1, subOption: 0, quantity: 2 },
			])
		)

		const component = render(
			<MemoryRouter>
				<Cart>
					<CheckoutPage />
				</Cart>
			</MemoryRouter>
		)

		const playstationRemoveButton = component.getByTitle(/remove.*playstation/i)
		const cartSum = component.getByTestId('cart-total')

		expect(cartSum.textContent).toMatch(/24000/)

		fireEvent.click(playstationRemoveButton)

		expect(component.queryByTestId(/line-sum-1/)).toBeNull()
		expect(cartSum.textContent).toMatch(/18000/)
	})
})

const playstation = {
	id: 1,
	name: 'Playstation 3',
	brand: 'Sony',
	price: 3000,
	weight: 1.5,
	available: true,
	options: [
		{
			color: 'grey',
			quantity: 1,
			subOption: {
				name: 'Storage',
				values: ['100', '250', '500'],
				suffix: 'GB',
			},
		},
		{
			color: 'white',
			quantity: 1,
			subOption: {
				name: 'Storage',
				values: ['250', '500'],
				suffix: 'GB',
			},
		},
	],
}

const tv = {
	id: 2,
	name: 'TV',
	brand: 'Samsung',
	price: 6000,
	weight: 14,
	available: true,
	options: [
		{
			color: 'black',
			quantity: 1,
		},
	],
}
