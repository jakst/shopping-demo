import React from 'react'
import { Product } from '../api/api'
import { usePersistentState } from './persistent-state.hook'

type Props = {
	children: React.ReactNode
}

type CartItem = {
	product: Product
	quantity: number
	value: number
	color: number
	subOption?: number
}

export function Cart({ children }: Props) {
	const [cartItems, setCartItems] = usePersistentState<CartItem[]>(
		'shopping-cart',
		[]
	)

	const addToCart = React.useCallback(
		(item: { product: Product; color: number; subOption?: number }) => {
			const { product, color, subOption } = item
			if (!product.available) return

			const cartItem = cartItems.find(
				cartItem =>
					cartItem.product.id === product.id &&
					cartItem.color === color &&
					cartItem.subOption === subOption
			)
			const quantity = cartItem ? cartItem.quantity + 1 : 1

			const newCartItem = {
				product,
				quantity,
				color,
				subOption,
				get value() {
					return this.quantity * Number(this.product.price)
				},
			}

			setCartItems([
				...cartItems.filter(
					cartItem =>
						cartItem.product.id !== product.id ||
						cartItem.color !== color ||
						cartItem.subOption !== subOption
				),
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
	addToCart: (item: {
		product: Product
		color: number
		subOption?: number
	}) => void
}

const CartContext = React.createContext<Cart>({
	cartItems: [] as CartItem[],
	cartQuantity: 0,
	cartValue: 0,
	addToCart: () => {},
})

export const useCart = () => React.useContext(CartContext)
