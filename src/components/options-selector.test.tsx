import 'jest-dom/extend-expect'
import React from 'react'
import { cleanup, fireEvent, render } from 'react-testing-library'
import { OptionsSelector } from './options-selector'

afterEach(cleanup)

describe('OptionsSelector onChange', () => {
	test('does not trigger on first render', () => {
		const mockOnChange = jest.fn()

		render(
			<OptionsSelector
				options={[
					{ color: 'red', quantity: 1 },
					{ color: 'blue', quantity: 1 },
				]}
				selected={{ color: 0, subOption: 0 }}
				onChange={mockOnChange}
			/>
		)

		expect(mockOnChange).not.toHaveBeenCalled()
	})

	test('triggers when a new value is selected', () => {
		const mockOnChange = jest.fn()

		const component = render(
			<OptionsSelector
				options={[
					{ color: 'red', quantity: 1 },
					{ color: 'blue', quantity: 1 },
				]}
				selected={{ color: 0, subOption: 0 }}
				onChange={mockOnChange}
			/>
		)

		const colorSelector = component.getByDisplayValue(/red/)
		fireEvent.change(colorSelector, { target: { value: 1 } })

		expect(mockOnChange).toHaveBeenCalledWith({ color: 1, subOption: 0 })
	})

	test('resets suboption when color is changed', () => {
		const mockOnChange = jest.fn()

		const component = render(
			<OptionsSelector
				options={[
					{
						color: 'red',
						quantity: 1,
					},
					{
						color: 'blue',
						quantity: 1,
						subOption: {
							name: 'Storage',
							values: ['100', '200', '300'],
							suffix: 'GB',
						},
					},
				]}
				selected={{ color: 0, subOption: 1 }}
				onChange={mockOnChange}
			/>
		)

		const colorSelector = component.getByDisplayValue(/red/)
		fireEvent.change(colorSelector, { target: { value: 1 } })

		expect(mockOnChange).toHaveBeenCalledWith({ color: 1, subOption: 0 })
	})
})
