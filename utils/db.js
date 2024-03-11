const { MongoClient } = require('mongodb')

class DBClient {

    constructor() {
        const host = process.env.DB_HOST || localhost
        const port = process.env.DB_PORT || 27017
        const database = process.env.DB_DATABASE || files_manager

        const uri = `mongodb://${host}:${port}/${database}`;
        this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    async isAlive() {
        return this.client.isConnected();
    }

    async nbUsers() {
        const db = this.client.db();
        const collection = db.collection('users');
        return collection.countDocuments();
    }

    async nbFiles() {
        const db = this.client.db();
        const collection = db.collection('files');
        return collection.countDocuments();
    }
}

const dbClient = new DBClient;
module.exports = dbClient;