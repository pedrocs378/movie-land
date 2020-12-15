import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import User from './User'

@Entity('watchlist')
class WatchList {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	movie_id: number

	@Column()
	genre_id: number

	@Column()
	title: string

	@Column()
	year: string

	@Column()
	poster_path: string

	@Column()
	vote_average: number

	@Column()
	user_id: string

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user: User
}

export default WatchList
