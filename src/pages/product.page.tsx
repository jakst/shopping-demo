import React from 'react'
import { match } from 'react-router'
import styled, { css } from 'styled-components'
import { getProductById, Product } from '../api/api'
import { useCart } from '../cart/cart.context'

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
		<Wrapper>
			<h2>{product.name}</h2>
			<h3>{product.price} kr</h3>
			Manufacturer: {product.brand}
			<br />
			Weight: {product.weight} kg
			<br />
			<AddToCart
				onClick={() => addToCart(product)}
				disabled={!product.available}
			>
				{product.available ? 'In stock, buy now! 👍' : 'No stock left 👎'}
			</AddToCart>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 500px;
	margin: 0 auto;
	padding: 16px;
	box-shadow: 1px 1px 3px #ddd;
`

const disabledStyle = css`
	background-color: #eee;
	color: #666;
`

const enabledStyle = css`
	background-color: green;
	color: white;
	cursor: pointer;
`

const AddToCart = styled.button`
	height: 50px;
	width: 150px;
	align-self: flex-end;

	font-weight: bold;
	border: none;

	${props => (props.disabled ? disabledStyle : enabledStyle)};
`
