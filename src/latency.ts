/**
 * Introduces a latency between 0 and 800 ms
 */
export async function fakeLatency() {
	return new Promise(resolve => setTimeout(resolve, Math.random() * 800))
}
