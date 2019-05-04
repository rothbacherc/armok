import * as mongodb from 'mongodb'
import * as fs from 'fs'
import * as crypto from 'crypto'
import * as jwt from 'jsonwebtoken'
import * as multer from 'multer'
import * as mulGrid from 'multer-gridfs-storage'
import { mongo } from 'mongoose';

//similar model to the one we use in the front
//end but a little different to include the hash/salt
//so we can store properly
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

//clone of front end model
export interface Save {
    sName: string,
    type: number,
    description: string,
    isPrivate: boolean,
    isBlood: boolean,
    downloads: number,
    upVotes: number,
    dnVotes: number,
    uName: string,
}

//db class declaration
export class DataAccess {
    mongo: mongodb.MongoClient
    client: mongodb.MongoClient
    db: mongodb.Db
    url = (fs.readFileSync('mongoString.txt', 'utf8'))

    //this is the storage engine for the files that are uploaded,
    //it uses its own little connection because it's a dirty slut
    //hopefully it closes it automatically because i can't manually
    //do it and it gives me axiety
    storage = new mulGrid({
        db: mongodb.MongoClient
        .connect(this.url, {useNewUrlParser: true})
        .then(client => client.db('test')),
        file: (req, file)=> {
            return {
                filename: file.fieldname,
                bucketName: 'files'
            }
        }
    })

    //upload

    //construct by connecting
    constructor() {
        this.mongoConnect()
    }

    //we do just about everything asynchronously, the promises below
    //are called asyc, this is declared async
    private async mongoConnect() {
        this.mongo = new mongodb.MongoClient(this.url, { useNewUrlParser: true })

        //try to connect, then assign the db to variables
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

    //when adding a save we call this promise, the idea is
    //its like a function that takes in the req, and returns
    //the promise, the promise will return either resolved
    //or rejected
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
            }//inserts check against prime keys automagically, no need for extra logic
            this.db.collection('saves').insertOne(save, (err, save) => {
                if (err) {
                    reject(err.code)//if we fail/error reject the request and tell browser
                }
                else {
                    resolve('Save inserted')//baller
                }
            })

        })
    }

    //same same as above but for adding users
    addUserPromise = (req: any) => {
        return new Promise((resolve, reject) => {
            //build salt and hash upfront, if we fail we'll have to re-make them
            //but it shouldn't be too much issue
            //if performance is troublesome later maybe move it into the successful
            //insertion else{} I just don't want to move and break it
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

    //when we login we need to authenticate basically the same as above,
    //we default to not allowing the user in. this is important cybersec
    //stuff. mega secure, badass.
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
