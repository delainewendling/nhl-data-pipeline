import mysql from 'mysql';

export default class NHLDatabaseManager {
    pool: any;

    constructor() {
        this.pool = mysql.createPool({
            host: 'nhl-data.crozanspo6zd.us-east-1.rds.amazonaws.com',
            user: process.env.NHL_DATABASE_USER,
            password: process.env.NHL_DATABASE_PASSWORD,
            database: 'nhlData',
            connectionLimit: 100,
        })
    }

    // Execute any queries that do not return anything
    async voidQuery(query: string) {
        await this.pool.query(query, (error) => {
            if (error) throw error;
            console.log('Query Executed Successfully');
        });
    }

    async get(query: string) {
        await this.pool.query(query, (error, results) => {
            if (error) throw error;
            console.log('Query Executed Successfully');
            return results;
        });
    }

    closeConnection() {
        this.pool.end((err) => {
            if (err) throw err;
        });
    }
}

