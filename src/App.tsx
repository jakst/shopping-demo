import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

export function App() {
	return (
		<div>
			<a href="/">
				<h1>Shopping.com</h1>
			</a>

			<BrowserRouter>
				<Suspense fallback={<LoadingMessage />}>
					<Switch>
						<Route exact path="/">
							<div>
								<h2>Main page</h2>
							</div>
						</Route>

						<Route path="/product/:id">
							<div>
								<h2>Product page</h2>
							</div>
						</Route>

						<Route path="/checkout">
							<div>
								<h2>Checkout page</h2>
							</div>
						</Route>

						<Route path="/">
							<div>
								<h2>404 not found</h2>
							</div>
						</Route>
					</Switch>
				</Suspense>
			</BrowserRouter>
		</div>
	)
}

function LoadingMessage() {
	return <div>Laddar</div>
}
