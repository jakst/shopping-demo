import React from 'react'
import { match } from 'react-router'

type Props = {
	match: match<{ id: string }>
}

export default function ProductPage({ match }: Props) {
	const productId = match.params.id

	return (
		<div>
			<h2>Product page</h2>
			Product id: {productId}
		</div>
	)
}
