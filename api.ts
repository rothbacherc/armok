import * as express from 'express'
import * as expressJwt from 'express-jwt'
import * as fs from 'fs'
import { DataAccess } from './dataAccess'

export interface logToken {
    status: number,
    message: string
}

let router = express.Router()
let data: DataAccess
data = new DataAccess()
const mySecret = fs.readFileSync('secret', 'utf8')


const checkifAuth = expressJwt({
    secret: mySecret,
    credentialsRequired: false
    // getToken: function fromHeader (req) {
    //     if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    //         return req.headers.authorization.split(' ')[1];
    //     }
    // }
})

router.use(function (req, res, next) {
    next()
})

router.get('/', function (req, res) {
    res.sendFile(__dirname, '/dist/armok/index.html')
})

router.put('/register', function (req, res) {
    try {
        let callAddUserPromise = async (req) => {
            let result = await (data.addUserPromise(req))
            return result
        }
        callAddUserPromise(req).then(function (result) {
            res.status(200).json(result)
        }).catch(function (reject){
            if(reject === 11000){
                res.status(409).json('Save name exists')
            }
            else{
                res.status(500)
            }
        })
    }
    catch (e){
        console.log(e)
        res.status(500)
    }
    // let strToken = data.addUser(req)
    // res.status(200).json({
    //     token: strToken
    // })
})

router.put('/login', function (req, res) {
    try {
        let callLoginPromise = async (req) => {
            let result = await (data.loginPromise(req))
            return result
        }
        callLoginPromise(req).then(function (result) {
            res.status(200).json(result)
        }).catch(function (reject){
            if(reject === 'User not found'){
                res.status(404).json(reject)
            }
            else{
                res.status(401).json(reject)
            }
        })
    } catch (e) {
        console.log(e)
        res.status(500).json(null)
    }
})

router.put('/upload/save', checkifAuth, function (req, res){
    try{
        let callAddSavePromise = async (req) => {
            let result = await (data.addSavePromise(req))
            return result
        }
        callAddSavePromise(req).then(function (result) {
            res.status(200).json(result)
        }).catch(function (reject) {
            if(reject === 11000){
                res.status(409).json('Save name exists')
            }
            else{
                res.status(500)
            }
        })
    }
    catch (e){
        console.log(e)
        res.status(500)
    }
})

export { router }