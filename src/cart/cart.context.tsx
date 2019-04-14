import React from 'react'
import { Product } from '../api/api'

type Props = {
	children: React.ReactNode
}

type CartItem = {
	product: Product
	quantity: number
	value: number
}

export function Cart({ children }: Props) {
	const [cartItems, setCartItems] = React.useState<CartItem[]>([])

	const addToCart = React.useCallback(
		(product: Product) => {
			if (!product.available) return
			const cartItem = cartItems.find(item => item.product.id === product.id)
			const quantity = cartItem ? cartItem.quantity + 1 : 1

			const newCartItem = {
				product,
				quantity,
				value: quantity * Number(product.price),
			}

			setCartItems([
				...cartItems.filter(item => item.product.id !== product.id),
				newCartItem,
			])
		},
		[cartItems]
	)

	const [cartQuantity, cartValue] = React.useMemo(
		() =>
			cartItems.reduce(
				(previous, item) => [
					previous[0] + item.quantity,
					previous[1] + item.value,
				],
				[0, 0]
			),
		[cartItems]
	)

	return (
		<CartContext.Provider
			value={{
				cartItems,
				cartQuantity,
				cartValue,
				addToCart,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}

type Cart = {
	cartItems: CartItem[]
	cartQuantity: number
	cartValue: number
	addToCart: (product: Product) => void
}

const CartContext = React.createContext<Cart>({
	cartItems: [] as CartItem[],
	cartQuantity: 0,
	cartValue: 0,
	addToCart: () => {},
})

export const useCart = () => React.useContext(CartContext)
