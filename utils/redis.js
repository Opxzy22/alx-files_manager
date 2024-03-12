const redis = require('redis');

class RedisClient {

    constructor() {
        // create a Redis client
        this.client = redis.createClient();

        this.client.on('error', (error) => {
            console.log('Redis client error', error);
        })
    }

    isAlive() {
        return this.client.connected;
    }
    
    async get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, value) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(value);
                }
            })
        })
    }

    async set(key, value, duration) {
        return new Promise((resolve, reject) => {
            this.client.setex(key, duration, value, (err, result ) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }

    async del(key) {
        return new Promise((resolve, reject) => {
            this.client.del(key, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}


const redisClient = new RedisClient;
module.exports = redisClient;