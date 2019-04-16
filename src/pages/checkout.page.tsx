import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useCart } from '../cart/cart.context'

export default function CheckoutPage() {
	const { cartItems, cartValue } = useCart()

	if (!cartItems.length)
		return (
			<Wrapper>
				<h2>Your cart is empty</h2>

				<Link to="/">Go to products overview 👉</Link>
			</Wrapper>
		)

	return (
		<Wrapper>
			{cartItems.map(item => (
				<Item key={item.product.id}>
					<div>{item.product.name}</div>
					<div>
						{item.quantity} x {item.product.price} = {item.value} kr
					</div>
				</Item>
			))}

			<Sum>Total: {cartValue} kr</Sum>
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

const Item = styled.div`
	display: flex;
	justify-content: space-between;
`

const Sum = styled.div`
	border-top: 2px solid #333;
	padding-top: 8px;
	margin: 8px 0 0;
	text-align: right;
`
