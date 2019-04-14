import React from 'react'
import { Product } from '../api/api'

type Props = {
	children: React.ReactNode
}

type Cart = {
	totalItems: number
	value: number
	items: Map<number, CartItem>
}

type CartItem = {
	quantity: number
	value: number
	product: Product
}

export function Cart({ children }: Props) {
	const [cart, setCart] = React.useState<Cart>(emptyCart)

	const addToCart = React.useCallback(
		(product: Product) => {
			if (!product.available) return
			const currentCartItem = cart.items.get(product.id)
			const itemQuantity = currentCartItem ? currentCartItem.quantity + 1 : 1

			const newCartItem = {
				quantity: itemQuantity,
				value: itemQuantity * Number(product.price),
				product,
			}

			const cartItems = new Map(cart.items).set(product.id, newCartItem)
			const [cartQuantity, cartValue] = Array.from(cartItems.values()).reduce(
				(previous, item) => [
					previous[0] + item.quantity,
					previous[1] + item.value,
				],
				[0, 0]
			)

			setCart({
				totalItems: cartQuantity,
				value: cartValue,
				items: cartItems,
			})
		},
		[cart]
	)

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}

const emptyCart: Cart = {
	totalItems: 0,
	value: 0,
	items: new Map(),
}

const CartContext = React.createContext({
	cart: emptyCart,
	addToCart: (product: any) => {},
})

export const useCart = () => React.useContext(CartContext)
