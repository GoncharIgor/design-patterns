import {MongoClient} from 'mongodb';

class DbConnection {
    static dbInstance = null;
    db = null;

    constructor() {
        DbConnection.dbInstance = this;
    }

    static getInstance() {
        if (DbConnection.dbInstance) {
            return DbConnection.dbInstance;
        }

        return new DbConnection();
    }

    async connect() {
        const dbConnectionUrl = 'mongodb+srv://username:password@cluster0.83333.mongodb.net/collection-name?retryWrites=true&w=majority';
        const client = await MongoClient.connect(dbConnectionUrl);

        this.db = client.db();
    }

    async disconnect() {
        if (this.db != null) {
            this.db.close();
        }
    }
}


const dbConnection = DbConnection.getInstance();
// Object.freeze(dbConnection); - may be an option, but will conflict with "connect" and "disconnect" f()s

export default dbConnection;

