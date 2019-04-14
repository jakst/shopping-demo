import { fakeLatency } from '../latency'
import data from './data.json'

export type Options = { [key: string]: any } & {
	color: string | string[]
	quantity: number
}[]

export type Product = {
	id: number
	name: string
	brand: string
	price: string
	available: boolean
	weight: number
	options: Options
}

export async function getProductById(id: number) {
	await fakeLatency()
	return data.items.find(item => item.id === id) as Product
}
