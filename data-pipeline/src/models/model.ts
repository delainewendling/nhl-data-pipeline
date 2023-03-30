import NHLDatabaseManager from '../db/dbManager';

// TODO: implement notimplementederror if tableName isn't there
export class Model {
    database: any;
    tableName = null;
    
    constructor() {
        this.database = new NHLDatabaseManager()
    }

    update(id: number, changes) {
        const columnValues = []
        for (const column in changes) {
            columnValues.push(`${column} = ${changes[column]}`);
        }
        this.database.query(`UPDATE ${this.tableName} SET ${columnValues.join(', ')} WHERE id = ${id}`)
        .then(() => {
            this.database.close();
        });
    }

    getById(id: number) {
        return this.database.query(`SELECT * FROM ${this.tableName} WHERE id = ${id}`)
    }
    
}
