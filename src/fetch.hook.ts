import React from 'react'

export function useFetch<ItemType>(
	defaultValue: ItemType,
	fetchFn: () => Promise<ItemType>
) {
	const [data, setData] = React.useState<ItemType>(defaultValue)
	const [error, setError] = React.useState(false)

	const fetch = React.useCallback(async () => {
		setError(false)

		const data = await fetchFn()
		if (data) setData(data)
		else setError(true)
	}, [fetchFn])

	React.useEffect(() => void fetch(), [fetch])

	return { data, error }
}
