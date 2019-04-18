import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useCart } from '../cart/cart.context'

export default function CheckoutPage() {
	const { cartItems, cartValue, changeQuantity } = useCart()

	if (!cartItems.length)
		return (
			<Wrapper>
				<h2>Your cart is empty</h2>

				<Link to="/">Go to products overview 👉</Link>
			</Wrapper>
		)

	return (
		<Wrapper>
			{cartItems.map((item, index) => {
				const { color, subOption } = item.product.options[item.color]
				const option =
					(subOption &&
						typeof item.subOption !== 'undefined' &&
						`${subOption.values[item.subOption]} ${subOption.suffix}`) ||
					''

				return (
					<Item key={`${item.product.id}${color}${option}`}>
						<div
							style={{
								width: 250,
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							<div style={{ fontWeight: 'bold' }}>{item.product.name}</div>
							<div>
								{color} {option && `, ${option}`}
							</div>
						</div>

						<div style={{ width: 80, textAlign: 'right' }}>
							{item.product.price} kr
						</div>

						<div style={{ width: 40, textAlign: 'center' }}>x</div>

						<div>
							<input
								type="number"
								min={1}
								defaultValue={item.quantity.toString()}
								style={{ width: 40, textAlign: 'right' }}
								onChange={e => changeQuantity(index, Number(e.target.value))}
							/>
						</div>

						<div style={{ width: 80, textAlign: 'right', fontWeight: 'bold' }}>
							{item.value} kr
						</div>
					</Item>
				)
			})}

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
	margin-bottom: 16px;
`

const Sum = styled.div`
	border-top: 2px solid #333;
	padding-top: 8px;
	margin: 8px 0 0;
	text-align: right;
`
