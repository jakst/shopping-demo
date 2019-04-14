import React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { useCart } from './cart.context'

export function ShoppingCart() {
	const { cartQuantity, cartValue } = useCart()

	return (
		<Wrapper>
			{cartQuantity > 1 && `${cartQuantity} items, ${cartValue} kr`}
			{cartQuantity === 1 && `${cartQuantity} item, ${cartValue} kr`}

			{cartQuantity > 0 && <Link to="/checkout">Checkout</Link>}
			{cartQuantity === 0 && <Inactive>Checkout</Inactive>}
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
