import * as express from 'express'
import { DataAccess } from './dataAccess'

let router = express.Router()
let data: DataAccess
data = new DataAccess()

router.use(function timeLog (req, res, next) {
    next()
})

router.get('/', function (req, res) {
    res.sendFile(__dirname, '/dist/armok/index.html')
})

router.put('/register', function (req, res) {
    let token = data.addUser(req)
    res.status(200).json({
        token: token
    })
})

export {router}