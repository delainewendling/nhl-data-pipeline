import mysql from 'mysql';
import NHLDatabaseManager from './dbManager.js';

const createPlayerTable = `CREATE TABLE Player (
    id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    age INT,
    PRIMARY KEY (id)
);`

const createTeamTable = `CREATE TABLE Team (
    id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);`

const createGameTable = `CREATE TABLE Game (
    id BIGINT NOT NULL,
    start_date_time TIMESTAMP,
    end_date_time TIMESTAMP,
    points INT,
    home_team_id INT,
    away_team_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (home_team_id) REFERENCES Team(id),
    FOREIGN KEY (away_team_id) REFERENCES Team(id)
);`

const createPlayerGameStatsTable = `CREATE TABLE PlayerGameStats (
    player_id BIGINT,
    team_id INT,
    game_id BIGINT,
    assists INT,
    goals INT,
    hits INT,
    position VARCHAR(16),
    number INT,
    penalty_minutes DECIMAL(5,2), 
    PRIMARY KEY (player_id, game_id),
    FOREIGN KEY (player_id) REFERENCES Player(id),
    FOREIGN KEY (team_id) REFERENCES Team(id),
    FOREIGN KEY (game_id) REFERENCES Game(id)
);`


const dbManager = new NHLDatabaseManager();

// process.env.NHL_DATABASE_USER
// process.env.NHL_DATABASE_PASSWORD

// dbManager.voidQuery(createPlayerTable);
// dbManager.voidQuery(createTeamTable);
// dbManager.voidQuery(createGameTable);
// dbManager.voidQuery(createPlayerGameStatsTable);

// dbManager.voidQuery(`INSERT INTO Player (id, name, age) VALUES (3, 'Hardy Pardy', 26)`);
// dbManager.voidQuery(`INSERT INTO Player (id, name, age) VALUES (4, 'Dee Dee Pickles', 29)`);

const results = await dbManager.get(`SELECT * FROM Player WHERE id = 18`)
console.log(results);
// dbManager.closeConnection()
// TODO: delete GAME table and TeamGameStats Table
// TODO: delete entries in GAME and TEAM tables