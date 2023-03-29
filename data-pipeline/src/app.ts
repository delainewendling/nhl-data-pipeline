import express from 'express';
import { Listener } from './processes/listenForChanges';
import { GameDataProcessor } from './processes/gameDataProcessor';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

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
