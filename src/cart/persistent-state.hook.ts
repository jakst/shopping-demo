import React from 'react'

export function usePersistentState<ValueType>(
	key: string,
	defaultValue?: ValueType
): [ValueType, (newValue: ValueType) => void] {
	const sessionValue = window.sessionStorage.getItem(key)
	const [localValue, setLocalValue] = React.useState<ValueType>(
		(sessionValue && JSON.parse(sessionValue)) || defaultValue
	)

	const setValue = (newValue: ValueType) => {
		window.sessionStorage.setItem(key, JSON.stringify(newValue))
		setLocalValue(newValue)
	}

	return [localValue, setValue]
}
