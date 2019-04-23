import 'jest-dom/extend-expect'
import React from 'react'
import { MemoryRouter } from 'react-router'
import { act, cleanup, render, waitForElement } from 'react-testing-library'
import * as Api from '../api/api'
import { Product } from '../api/api'
import MainPage from './main.page'

let api = Api as any
api.getProducts = jest.fn()

afterEach(cleanup)

describe('Main page', () => {
	test('displays a loading message', async () => {
		const component = render(<MainPage />)
		const loadingText = component.getByText(/Loading products/)

		expect(loadingText).toBeInTheDocument()
	})

	test('outputs price of all products returned from api', async () => {
		api.getProducts = jest.fn(() =>
			Promise.resolve<Product[]>([
				{
					id: 1,
					available: true,
					name: 'Headphones',
					brand: 'Sony',
					price: 2499,
					weight: 0.5,
					options: [
						{ color: 'black', quantity: 12 },
						{ color: 'gold', quantity: 3 },
					],
				},
				{
					id: 2,
					available: true,
					name: 'TV',
					brand: 'Samsung',
					price: 7990,
					weight: 14.0,
					options: [{ color: 'black', quantity: 12 }],
				},
			])
		)

		let component
		act(() => {
			component = render(
				<MemoryRouter>
					<MainPage />
				</MemoryRouter>
			)
		})

		const productElements = await waitForElement(() =>
			component.getAllByText(/kr/i)
		)

		expect(productElements.length).toBe(2)
	})
})
