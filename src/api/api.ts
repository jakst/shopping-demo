import { fakeLatency } from '../latency'
import data from './data.json'

export type SubOption = {
	name: string
	values: string[]
	suffix: string
}

export type Option = {
	color: string
	quantity: number
	subOption?: SubOption
}

export type Product = {
	id: number
	name: string
	brand: string
	price: string
	available: boolean
	weight: number
	options: Option[]
}

export async function getProducts() {
	await fakeLatency()
	return data.items.map(mapper)
}

export async function getProductById(id: number) {
	await fakeLatency()
	return data.items.map(mapper).find(item => item.id === id)
}

// Create a sane data structure
function mapper(product) {
	return {
		...product,
		options: product.options.map(option => {
			const mainOptions = {
				quantity: option.quantity,
				color:
					typeof option.color === 'string' ? option.color : option.color[0],
			}

			let subOption

			if (option.power) {
				subOption = {
					name: 'Power',
					values: option.power.map(value => value.toString()),
					suffix: 'W',
				}
			} else if (option.storage) {
				subOption = {
					name: 'Storage',
					values: option.storage.map(value => value.toString()),
					suffix: 'GB',
				}
			}

			if (subOption) return { ...mainOptions, subOption }
			return mainOptions
		}),
	} as Product
}
