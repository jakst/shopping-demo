import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { Cart } from './cart'
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
		<div>
			<a href="/">
				<h1>Shopping.com</h1>
			</a>

			<BrowserRouter>
				<Suspense fallback={<LoadingMessage />}>
					<Cart>
						<Switch>
							<Route exact path="/" component={LazyMainPage} />
							<Route path="/product/:id" component={LazyProductPage} />
							<Route path="/checkout" component={LazyCheckoutPage} />
							<Route path="/" component={Lazy404Page} />
						</Switch>
					</Cart>
				</Suspense>
			</BrowserRouter>
		</div>
	)
}

function LoadingMessage() {
	return <div>Loading...</div>
}
