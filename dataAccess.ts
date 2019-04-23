import * as mongodb from 'mongodb'
import * as fs from 'fs'
import * as crypto from 'crypto'
import * as jwt from 'jsonwebtoken'

export interface User {
    uName: string,
    totalDownloads: number,
    totalUpvotes: number,
    totalDownvotes: number,
    avatar: any,
    email: string,
    salt: any,
    hash: any
}

export interface Save {
    sName: string
    type: number
    description: string
    isPrivate: boolean
    isBlood: boolean
    downloads: number
    upVotes: number
    dnVotes: number
    uName: string
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

    addSavePromise = (req: any) => {
        return new Promise((resolve, reject) => {
            let save: Save = {
                sName: req.body.sName,
                type: req.body.type,
                description: req.body.description,
                isPrivate: req.body.isPrivate,
                isBlood: req.body.isBlood,
                downloads: 0,
                upVotes: 0,
                dnVotes: 0,
                uName: req.body.uName
            }
            this.db.collection('saves').insertOne(save, (err, save) => {
                if (err) {
                    reject(err.code)
                }
                else {
                    resolve('Save inserted')
                }
            })

        })
    }

    //removed a new client from here, it shoulda been useless
    addUserPromise = (req: any) => {
        return new Promise((resolve, reject) => {
            let salt = crypto.randomBytes(16).toString('hex')
            let hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, 'sha512').toString('hex')
            let user: User = {
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
            this.db.collection('users').insertOne(user, (err, save) => {
                if (err) {
                    reject(err.code)
                }
                else {
                    resolve(token)
                }
            })
        })
    }

    loginPromise = (req: any) => {
        return new Promise((resolve, reject) => {
            let bool = false
            this.db.collection('users').findOne({ uName: req.body.uName }, (err, user) => {

                if (err) {
                    reject(err)
                }
                else if (!user) {
                    reject('User not found') //'User not found'
                }
                else {
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
                        resolve(token)
                    }
                    else {
                        reject('Incorrect password') //'Incorrect password'
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
