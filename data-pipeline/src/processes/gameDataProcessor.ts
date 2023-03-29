import axios from 'axios';
import {Game, Team, Player, PlayerGameStats} from '../models';
import { Listener } from './listenForChanges';


export class GameDataProcessor {
    endTime: EpochTimeStamp;
    gameId: number;
    gameDb: Game;
    teamDb: Team;
    playerDb: Player;
    playerGameStatsDb: PlayerGameStats;

    constructor() {
        this.endTime = null;
        this.gameId = null;
        this.gameDb = new Game();
        this.teamDb = new Team();
        this.playerDb = new Player();
        this.playerGameStatsDb = new PlayerGameStats();
    }

    uploadGameData = (game) => {
        this.gameId = game.gamePk;

        this.createTeamIfDoesNotExist(game.teams.away.team);
        this.createTeamIfDoesNotExist(game.teams.home.team);

        try {
            this.createNewGameIfDoesNotExist(game);
        } catch (err) {
            console.error(`There has been as error: ${err}. Exiting process...`)
            return;
        }
    
        const gameUrl = game.link;
        const listener = new Listener();
        while(!this.endTime) {
            // poll for new data and upload
            listener.listenForChanges(gameUrl, this.updateGameData)
        }
        // 4. Once status has changed, update endTime for game
    }

    createTeamIfDoesNotExist({id, name}) {
        if (!this.teamDb.getById(id)) {
            this.teamDb.add(id, name)
        }
    }

    createNewGameIfDoesNotExist(game) {
        const startTime = game.gameDate;
        const homeTeamId = game.teams.home.id;
        const awayTeamId = game.teams.away.id;

        if (!this.gameDb.getById(this.gameId)) {
            this.gameDb.add(this.gameId, homeTeamId, awayTeamId, startTime)
        } else {
            // If I had more time, I wouldn't rely on this mechanism for stopping duplicate processes for the same game. 
            // I would figure out a way to make sure the process was only kicked off in the case that the data change was from a status other than live to a status of live.
            // I would also create a custom error class for this
            throw Error('This game is already being uploaded')
        }
    }

    updateGameData (liveGameData) {
        if ('endDateTime' in liveGameData.datetime) {
            this.endTime = liveGameData.datetime.endDateTime
            this.gameDb.update(this.gameId, {'end_date_time': this.endTime})
        }
        const awayTeam = liveGameData.boxscore.teams.away;
        const awayTeamId = awayTeam.team.id;
        const homeTeam = liveGameData.boxscore.teams.home;
        const homeTeamId = homeTeam.team.id;
        const players = Object.assign({}, {...awayTeam.players, teamId: awayTeamId}, {...homeTeam.players, teamId: homeTeamId})
        for (const player of players.values()) {
            this.createPlayerIfDoesNotExist(player.person);
            this.createOrUpdatePlayerGameStats(player);
        }

    }

    createPlayerIfDoesNotExist({id, fullName, link}) {
        if (!this.playerDb.getById(id)) {
            // Maybe get the player data from another part of the response
            axios.get(link)
            .then((res) => {
                const age = res.data.people[0].currentAge;
                this.playerDb.add(id, fullName, age)
            })
            .catch((err) => {
                console.error(`There was an error getting the player's age ${err}`)
                this.playerDb.add(id, fullName, null)
            })
        }
    }

    
    createOrUpdatePlayerGameStats = (player) => {
        const id = player.person.id;
        const teamId = player.teamId;
        const position = player.position.name;
        const jerseyNumber = player.jerseyNumber;
        const stats = player.stats.skaterStats
        const assists = stats.assists;
        const goals = stats.goals;
        const hits = stats.hits;
        const penaltyMinutes = stats.penaltyMinutes;

        if (!this.playerGameStatsDb.getById(id)) {
            this.playerGameStatsDb.add(id, teamId, this.gameId, position, jerseyNumber, assists, goals, hits, penaltyMinutes);
        } else {
            this.playerGameStatsDb.update(id, {'assists': assists, 'goals': goals, 'hits': hits, 'penalty_minutes': penaltyMinutes});
        }

    }
}


new GameDataProcessor().uploadGameData('2022021171')