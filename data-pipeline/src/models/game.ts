import { Model } from './model';

export class Game extends Model {
    tableName = 'Game'

    constructor() {
        super()
    }

   add(
        id: number,
        homeTeamId: number,
        awayTeamId: number,
        startTime: EpochTimeStamp, 
        endTime=null
    ) {
        this.database.query(`INSERT INTO ${this.tableName} (
            id, home_team_id, away_team_id, start_time, end_time
        )
        VALUES (
            ${id}, ${homeTeamId}, ${awayTeamId}, ${startTime}, ${endTime}
        )`)
        .then(() => {
            this.database.close();
        })
    }
}