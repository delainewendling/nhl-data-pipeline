import {Model} from './model';

export class Player extends Model{
    tableName = 'Player'

    constructor() {
        super()
    }

    async add(
        id: number,
        name: string,
        age?: number,
    ) {
        await this.database.voidQuery(`INSERT INTO ${this.tableName} (
            id, name, age
        )
        VALUES (
            ${id}, ${name}, ${age}
        )`)
    }
}

export class PlayerGameStats extends Model {
    tableName = 'PlayerGameStats'

    constructor() {
        super()
    }

   async add(
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
        await this.database.voidQuery(`INSERT INTO ${this.tableName} (
            player_id, team_id, game_id, position, number, assists, goals, hits, penalty_minutes
        )
        VALUES (
            ${playerId}, ${teamId}, ${gameId}, ${position}, ${number}, ${assists}, ${goals}, ${hits}, ${penaltyMinutes}
        )`)
    }
}