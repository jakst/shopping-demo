import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

const LazyMainPage = React.lazy(() => import('./pages/main.page'))
const LazyProductPage = React.lazy(() => import('./pages/product.page'))
const LazyCheckoutPage = React.lazy(() => import('./pages/checkout.page'))
const Lazy404Page = React.lazy(() => import('./pages/404.page'))

export function App() {
	return (
		<div>
			<a href="/">
				<h1>Shopping.com</h1>
			</a>

			<BrowserRouter>
				<Suspense fallback={<LoadingMessage />}>
					<Switch>
						<Route exact path="/" component={LazyMainPage} />
						<Route path="/product/:id" component={LazyProductPage} />
						<Route path="/checkout" component={LazyCheckoutPage} />
						<Route path="/" component={Lazy404Page} />
					</Switch>
				</Suspense>
			</BrowserRouter>
		</div>
	)
}

function LoadingMessage() {
	return <div>Loading...</div>
}
