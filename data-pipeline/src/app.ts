import { Listener } from './processes/listenForChanges';
import { GameDataProcessor } from './processes/gameDataProcessor';

const kickOffProcessForLiveGames = (data) => {
    const dates = data.dates;
    for (const date of dates) {
        const games = date.games;
        for (const game of games) {
            if (game.status.abstractGameStatus == "Live") { 
                new GameDataProcessor().uploadGameData(game)
            }
        }
    }
}

// Listen to the schedule API to see if any games are going live
// then kick off the process to upload game data
new Listener().listenForChanges(
    'https://statsapi.web.nhl.com/api/v1/schedule', kickOffProcessForLiveGames,
);
