import {Model} from './model';

export class Player extends Model{
    tableName = 'Player'

    constructor() {
        super()
    }

    add(
        id: number,
        name: string,
        age?: number,
    ) {
        this.database.query(`INSERT INTO ${this.tableName} (
            id, name, age
        )
        VALUES (
            ${id}, ${name}, ${age}
        )`)
        .then(() => {
            this.database.close();
        });
    }
}

export class PlayerGameStats extends Model {
    tableName = 'PlayerGameStats'

    constructor() {
        super()
    }

   add(
        playerId: number,
        teamId: number,
        gameId: number,
        position: string,
        number: number,
        assists = 0,
        goals = 0,
        hits = 0,
        penaltyMinutes = 0,
    ) {
        this.database.query(`INSERT INTO ${this.tableName} (
            player_id, team_id, game_id, position, number, assists, goals, hits, penalty_minutes
        )
        VALUES (
            ${playerId}, ${teamId}, ${gameId}, ${position}, ${number}, ${assists}, ${goals}, ${hits}, ${penaltyMinutes}
        )`)
        .then(() => {
            this.database.close();
        });
    }
}