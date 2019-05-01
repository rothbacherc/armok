import * as express from 'express'
import * as expressJwt from 'express-jwt'
import * as fs from 'fs'
import { DataAccess } from './dataAccess'

//build router and pull in the db
let router = express.Router()
let data: DataAccess
data = new DataAccess()
const mySecret = fs.readFileSync('secret', 'utf8')

//this is an automated JWT checker to make
//sure no one is impersonating anyone,
//anonymous users may still connect
const checkifAuth = expressJwt({
    secret: mySecret,
    credentialsRequired: false
})

//prolly don't need this, i don't wanna remove it though
router.use(function (req, res, next) {
    next()
})

//static file stuff
router.get('/', function (req, res) {
    res.sendFile(__dirname, '/dist/armok/index.html')
})

//api magic, /api/register directs here
router.put('/register', function (req, res) {
    try { //try/catch a promise to call the db for the insert
        let callAddUserPromise = async (req) => {
            let result = await (data.addUserPromise(req))
            return result
        } //declaration above, call below
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

//this is where /api/login goes, very similar to above
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

//same same but /api/upload/save, used for new saves
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

router.put('/upload/file', function (req,res) {
    console.log(req.body)
    fs.writeFile("test.zip", req.body, (err) => {
        if(err){
            throw err
        }
        else{
            res.status(200)
        }
    })
})

//export for use in armok.ts, dumb js stuff needs it here not above
export { router }