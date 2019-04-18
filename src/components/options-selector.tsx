import React from 'react'
import styled from 'styled-components'
import { Option } from '../api/api'

type SelectedOptions = {
	color: number
	subOption: number
}

type Props = {
	options: Option[]
	selected: SelectedOptions
	onChange: (options: SelectedOptions) => void
}

export function OptionsSelector({ options, selected, onChange }: Props) {
	const { subOption } = options[selected.color]

	return (
		<Wrapper>
			Color:{' '}
			<select
				onChange={e =>
					onChange({ color: Number(e.target.value), subOption: 0 })
				}
			>
				{options.map((option, index) => (
					<option key={option.color} value={index}>
						{option.color}
					</option>
				))}
			</select>
			{subOption && (
				<>
					{subOption.name}:
					<select
						onChange={e =>
							onChange({ ...selected, subOption: Number(e.target.value) })
						}
					>
						{subOption.values.map((value, index) => (
							<option key={value} value={index}>
								{value} {subOption.suffix}
							</option>
						))}
					</select>
				</>
			)}
		</Wrapper>
	)
}

const Wrapper = styled.div`
	margin: 16px 0;
	display: flex;
	flex-direction: column;
`
