import * as mongodb from 'mongodb'
import * as fs from 'fs'
import * as crypto from 'crypto'
import * as jwt from 'jsonwebtoken'

export class DataAccess{
    mongo: mongodb.MongoClient
    client: mongodb.MongoClient
    db: mongodb.Db
    url: string

    constructor(){
        this.url = (fs.readFileSync('mongoString.txt', 'utf8'))
        this.mongoConnect()
    }

    private async mongoConnect(){
        this.mongo = new mongodb.MongoClient(this.url, {useNewUrlParser: true})

        await this.mongo.connect((err, client) => {
            if(client.isConnected()){
                this.db = client.db('test')
                this.mongo = client
                console.log("Connected to mongodb")
            }
            if(err){
                console.log('Mongo connection error:')
                console.error(err)
            }
        })
    }

}