import Skeleton from '@material-ui/lab/Skeleton'
import { useMemo } from 'react'

interface MovieLoadingProps {
	totalCards: number
}

export function MovieLoading({ totalCards }: MovieLoadingProps) {

	const cards = useMemo(() => {
		const cardsId = new Array()

		for (let i = 0; i < totalCards; i++) {
			cardsId.push({ cardId: Math.random() })
		}

		return cardsId
	}, [totalCards])

	return (
		<>
			{cards.map(({ cardId }) => {
				return (
					<Skeleton
						key={cardId}
						variant="rect"
						width="200px"
						height="300px"
					/>
				)
			})}
		</>
	)
}