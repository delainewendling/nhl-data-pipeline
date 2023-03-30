import mysql from 'mysql';

export default class NHLDatabaseManager {
    connection: any;

    constructor() {
        this.connection = mysql.createConnection({
            host: 'nhl-data.crozanspo6zd.us-east-1.rds.amazonaws.com',
            user: process.env.NHL_DATABASE_USER,
            password: process.env.NHL_DATABASE_PASSWORD,
            database: 'nhlData',
        })
    }

    query( sql: string ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }

    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
            } );
        } );
    }
}

