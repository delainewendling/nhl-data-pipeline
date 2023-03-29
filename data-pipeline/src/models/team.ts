import {Model} from './model';

export class Team extends Model {
    tableName = 'Team'

    constructor() {
        super()
    }

    async add(
        id: number,
        name: string,
    ) {
        await this.database.voidQuery(`INSERT INTO ${this.tableName} (
            id, name
        )
        VALUES (
            ${id}, ${name}
        )`)
    }
}
