export const lazy = <T>(fn: () => T) => {
	let result: T
	return () => {
		if (result === undefined) {
			result = fn()
		}

		return result
	}
}
