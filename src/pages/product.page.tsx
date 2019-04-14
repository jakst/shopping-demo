import React from 'react'
import { match } from 'react-router'
import { getProductById, Product } from '../api/api'
import { useCart } from '../cart'

type Props = {
	match: match<{ id: string }>
}

export default function ProductPage({ match }: Props) {
	const productId = match.params.id
	const [product, setProduct] = React.useState<Product>()
	const [error, setError] = React.useState(false)
	const { addToCart } = useCart()

	const fetchProduct = React.useCallback(async () => {
		setError(false)
		const fetchedProduct = await getProductById(Number(productId))

		if (fetchedProduct) setProduct(fetchedProduct)
		else setError(true)
	}, [productId])

	React.useEffect(() => void fetchProduct(), [fetchProduct])

	if (error) return <div>Could not find product with id "{productId}".</div>
	if (!product) return <div>Loading item...</div>

	return (
		<div>
			<h2>{product.name}</h2>
			<h3>{product.price} kr</h3>
			Manufacturer: {product.brand}
			<br />
			{product.available ? 'In stock 👍' : 'Not available 👎'}
			<br />
			Weight: {product.weight} kg
			<br />
			<button onClick={() => addToCart(product)}>Add to cart</button>
		</div>
	)
}
