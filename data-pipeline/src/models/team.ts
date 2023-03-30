import {Model} from './model';

export class Team extends Model {
    tableName = 'Team'

    constructor() {
        super()
    }

    add(
        id: number,
        name: string,
    ) {
        this.database.query(`INSERT INTO ${this.tableName} (
            id, name
        )
        VALUES (
            ${id}, ${name}
        )`)
        .then(() => {
            this.database.close();
        });
    }
}
