
export function getRuntime(runtime: number) {
	if (runtime > 59) {
		const hour = Math.floor(runtime / 60)
		const minutes = runtime - (hour * 60)

		return `${hour}h ${minutes}min`
	} else {
		return `${runtime}min`
	}
}