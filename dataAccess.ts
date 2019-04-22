import * as mongodb from 'mongodb'
import * as fs from 'fs'
import * as crypto from 'crypto'
import * as jwt from 'jsonwebtoken'

interface User {
    uName: string,
    email: string,
    totalDownloads: number,
    totalDownvotes: number,
    totalUpvotes: number,
    salt: any,
    hash: any
}

export class DataAccess {
    mongo: mongodb.MongoClient
    client: mongodb.MongoClient
    db: mongodb.Db
    url: string

    constructor() {
        this.url = (fs.readFileSync('mongoString.txt', 'utf8'))
        //this.mongoConnect()
    }

    private mongoConnect() {
        this.mongo = new mongodb.MongoClient(this.url, { useNewUrlParser: true })

        this.mongo.connect((err, client) => {
            if (client.isConnected()) {
                this.db = client.db('test')
                this.client = client
                console.log("Connected to mongodb")
            }
            if (err) {
                console.log('Mongo connection error:')
                console.error(err)
            }
        })
    }

    public async addUser(req: any) {

        this.mongo = new mongodb.MongoClient(this.url, { useNewUrlParser: true })

        let salt = crypto.randomBytes(16).toString('hex')
        let hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, 'sha512').toString('hex')
        let user = {
            uName: req.body.uName,
            email: req.body.email,
            totalDownloads: 0,
            totalDownvotes: 0,
            totalUpvotes: 0,
            salt: salt,
            hash: hash
        }

        await this.mongo.connect((err, client) => {
            if (client.isConnected()) {
                this.db = client.db('test')
                this.client = client
                console.log("Connected to mongodb")
                

                
                this.db.collection('users').insertOne(user)
            }
            if (err) {
                console.log('Mongo connection error:')
                console.error(err)
            }
        })



        let date = new Date()
        date.setDate(date.getDate() + 7)
        let token = jwt.sign({
            uName: user.uName,
            exp: (date.getTime() / 1000)
        }, fs.readFileSync('secret', 'utf8'))
        return token
    }

    //this happens anyway, i don't need this...
    //i can't not have it though, i can't sleep...
    public mongoClose() {
        this.mongo.close()
    }
}