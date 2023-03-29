import NHLDatabaseManager from '../db/dbManager';

export interface ColumnValueMap {
    column: string;
    value: string;
}

// TODO: implement notimplementederror if tableName isn't there
export class Model {
    database: any;
    tableName = null;
    
    constructor() {
        this.database = new NHLDatabaseManager()
    }

    async update(id: number, changes: any) {
        const columnValues = []
        for (const [column, value] of changes.items()) {
            columnValues.push(`${column} = ${value}`);
        }
        await this.database.voidQuery(`UPDATE ${this.tableName} 
            SET ${columnValues.join(',')}
            WHERE id = ${id}
        `)
    }

    async getById(id: number) {
        return await this.database.get(`SELECT * FROM ${this.tableName} WHERE id = ${id}`)
    }
    
}