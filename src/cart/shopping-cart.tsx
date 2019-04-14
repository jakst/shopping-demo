import React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { useCart } from './cart.context'

export function ShoppingCart() {
	const { cart } = useCart()

	return (
		<Wrapper>
			{cart.totalItems > 1 && `${cart.totalItems} items, ${cart.value} kr`}
			{cart.totalItems === 1 && `${cart.totalItems} item, ${cart.value} kr`}

			{cart.totalItems > 0 && <Link to="/checkout">Checkout</Link>}
			{cart.totalItems === 0 && <Inactive>Checkout</Inactive>}
		</Wrapper>
	)
}

const CheckoutButtonStyle = css`
	margin-left: 8px;
	padding: 8px;
	font-weight: bold;
	background-color: #eee;
	color: #666;
`

const Inactive = styled.div`
	${CheckoutButtonStyle};
`

const Wrapper = styled.div`
	display: flex;
	align-items: center;

	a {
		${CheckoutButtonStyle};
		background-color: green;
		color: white;
		text-decoration: none;
	}
`
