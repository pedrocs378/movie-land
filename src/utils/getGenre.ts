import { GenreProps } from '../hooks/genres'

const getGenre = (id: number, genres: GenreProps[]): string => {

	const genre = genres.find((value) => value.id === id)

	return genre?.name || "Undefined Genre"
}

export { getGenre }
