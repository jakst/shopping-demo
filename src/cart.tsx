import React from 'react'
import { Product } from './api/api'

type Props = {
	children: React.ReactNode
}

type Cart = {
	totalItems: number
	items: Map<number, CartItem>
}

type CartItem = {
	quantity: number
	product: Product
}

export function Cart({ children }: Props) {
	const [cart, setCart] = React.useState<Cart>(emptyCart)

	const addToCart = React.useCallback(
		(product: Product) => {
			const currentCartItem = cart.items.get(product.id)

			const newCartItem = {
				quantity: currentCartItem ? currentCartItem.quantity + 1 : 1,
				product,
			}

			setCart(cart => ({
				totalItems: cart.totalItems + 1,
				items: new Map(cart.items).set(product.id, newCartItem),
			}))
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
	items: new Map(),
}

const CartContext = React.createContext({
	cart: emptyCart,
	addToCart: (product: any) => {},
})

export const useCart = () => React.useContext(CartContext)
