import * as express from 'express'
import { DataAccess } from './dataAccess'

export interface logToken {
    status: number,
    token: string
}

let router = express.Router()
let data: DataAccess
data = new DataAccess()

router.use(function (req, res, next) {
    next()
})

router.get('/', function (req, res) {
    res.sendFile(__dirname, '/dist/armok/index.html')
})

router.put('/register', function (req, res) {
    let strToken = data.addUser(req)
    res.status(200).json({
        token: strToken
    })
})

router.put('/login', function (req, res) {
    try {
        let callDataPromise = async (req) => {
            let result = await (data.myPromise(req))
            return result
        }
        callDataPromise(req).then(function (result) {
            res.json(result)
        })
    } catch (e) {
        console.log(e)
        res.status(404).json(null)
    }
})

export { router }