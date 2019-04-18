import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router'
import { BrowserRouter, Link } from 'react-router-dom'
import styled from 'styled-components'
import { Cart } from './cart/cart.context'
import { ShoppingCart } from './components/shopping-cart'
import { fakeLatency } from './latency'

const LazyMainPage = React.lazy(async () => {
	await fakeLatency()
	return import('./pages/main.page')
})
const LazyProductPage = React.lazy(async () => {
	await fakeLatency()
	return import('./pages/product.page')
})
const LazyCheckoutPage = React.lazy(async () => {
	await fakeLatency()
	return import('./pages/checkout.page')
})
const Lazy404Page = React.lazy(async () => {
	await fakeLatency()
	return import('./pages/404.page')
})

export function App() {
	return (
		<BrowserRouter>
			<Cart>
				<Header>
					<Link to="/">
						<h1>Shopping.com</h1>
					</Link>

					<ShoppingCart />
				</Header>

				<Wrapper>
					<Suspense fallback={<LoadingMessage />}>
						<Switch>
							<Route exact path="/" component={LazyMainPage} />
							<Route path="/product/:id" component={LazyProductPage} />
							<Route path="/checkout" component={LazyCheckoutPage} />
							<Route path="/" component={Lazy404Page} />
						</Switch>
					</Suspense>
				</Wrapper>
			</Cart>
		</BrowserRouter>
	)
}

function LoadingMessage() {
	return <div>Loading...</div>
}

const Wrapper = styled.div`
	padding: 10px;
`

const Header = styled.div`
	margin-bottom: 24px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 8px 16px;
	box-shadow: 1px 0 2px #bbb;

	h1 {
		margin: 0;
		padding-bottom: 8px;
	}
`
