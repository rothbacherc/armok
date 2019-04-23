import * as mongodb from 'mongodb'
import * as fs from 'fs'
import * as crypto from 'crypto'
import * as jwt from 'jsonwebtoken'

interface User {
    uName: string,
    totalDownloads: number,
    totalUpvotes: number,
    totalDownvotes: number,
    avatar: any,
    email: string,
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
        this.mongoConnect()
    }

    private async mongoConnect() {
        this.mongo = new mongodb.MongoClient(this.url, { useNewUrlParser: true })

        await this.mongo.connect((err, client) => {
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

    public addUser(req: any): string {

        this.mongo = new mongodb.MongoClient(this.url, { useNewUrlParser: true })

        let salt = crypto.randomBytes(16).toString('hex')
        let hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, 'sha512').toString('hex')
        let user = {
            uName: req.body.uName,
            totalDownloads: 0,
            totalUpvotes: 0,
            totalDownvotes: 0,
            avatar: '.',
            email: req.body.email,
            salt: salt,
            hash: hash
        }

        let date = new Date()
        date.setDate(date.getDate() + 7)
        let token = jwt.sign({
            uName: user.uName,
            totalDownloads: user.totalDownloads,
            totalUpvotes: user.totalUpvotes,
            totalDownvotes: user.totalDownvotes,
            exp: (date.getTime() / 1000)
        }, fs.readFileSync('secret', 'utf8'))
        this.db.collection('users').insertOne(user)
        return token
    }

    myPromise = (req: any) => {
        return new Promise((resolve, reject) => {
        let bool = false
        this.db.collection('users').findOne({ uName: req.body.uName }, (err, user) => {
            
            if (err) {
                reject(err)
            }
            else if (!user) {
                resolve(null) //'User not found'
            }
            else{
                let hash = crypto.pbkdf2Sync(req.body.password, user.salt, 1000, 64, 'sha512').toString('hex')
                bool = user.hash === hash
                if (bool) {
                    let date = new Date()
                    date.setDate(date.getDate() + 7)
                    let token = jwt.sign({
                        uName: user.uName,
                        totalDownloads: user.totalDownloads,
                        totalUpvotes: user.totalUpvotes,
                        totalDownvotes: user.totalDownvotes,
                        exp: (date.getTime() / 1000)
                    }, fs.readFileSync('secret', 'utf8'))
                    console.log('win')
                    resolve(token)
                }
                else {
                    resolve(null) //'Incorrect password'
                }
            }
        })
    })
    }

    //this happens anyway, i don't need this...
    //i can't not have it though, i can't sleep...
    public mongoClose() {
        this.mongo.close()
    }
}
