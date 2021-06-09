interface GenreParams {
	id: number
	name: string
}

const getGenre = (id: number, genres: GenreParams[]): string => {

	const genre = genres.find((value) => value.id === id)

	return genre?.name || "Undefined Genre"
}

export { getGenre }
