import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateWatchList1608046008410 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'watchlist',
			columns: [
				{
					name: 'id',
					type: 'uuid',
					isPrimary: true,
					generationStrategy: 'uuid',
					default: 'uuid_generate_v4()'
				},
				{
					name: 'movie_id',
					type: 'integer',
					isUnique: true
				},
				{
					name: 'genre_id',
					type: 'integer'
				},
				{
					name: 'title',
					type: 'varchar'
				},
				{
					name: 'year',
					type: 'varchar'
				},
				{
					name: 'poster_path',
					type: 'varchar'
				},
				{
					name: 'vote_average',
					type: 'real'
				},
				{
					name: 'user_id',
					type: 'uuid',
				}
			],
			foreignKeys: [
				{
					name: 'UserId',
					columnNames: ['user_id'],
					referencedColumnNames: ['id'],
					referencedTableName: 'users',
					onDelete: 'CASCADE',
					onUpdate: 'CASCADE'
				}
			]
		}))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('watchlist')
    }

}
