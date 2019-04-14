import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getProducts, Product } from '../api/api'

export default function MainPage() {
	const [products, setProducts] = React.useState<Product[]>([])

	const fetchProducts = React.useCallback(async () => {
		const fetchedProducts = await getProducts()
		setProducts([...fetchedProducts])
	}, [])

	React.useEffect(() => void fetchProducts(), [fetchProducts])

	if (!products.length) return <div>Loading products...</div>

	return (
		<Grid>
			{products.map(product => (
				<Link key={product.id} to={`/product/${product.id}`}>
					<div>
						{product.name}
						<Price>{product.price} kr</Price>
					</div>
				</Link>
			))}
		</Grid>
	)
}

const Grid = styled.div`
	display: grid;
	align-items: center;
	grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
	grid-gap: 10px;
	max-width: 1024px;
	margin: 0 auto;

	a {
		padding: 10px;

		box-shadow: 1px 1px 2px #ddd;
		color: black;
		text-decoration: none;
	}
`

const Price = styled.div`
	text-align: right;
	margin-top: 20px;
	font-weight: bold;
`
