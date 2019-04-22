import * as http from 'http'
import * as express from 'express'
import * as helmet from 'helmet'
import * as compression from 'compression'
import * as bodyParser from 'body-parser'
import { router } from './api'


export class App {
    app: any

    constructor() {
        this.app = express()
        this.app.use(helmet())
        this.app.use(compression())
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use('/api', router)

        this.app.use(express.static(__dirname + '/dist/armok'))

        const httpServer = http.createServer(this.app)

        httpServer.listen(8080, () => {
            console.log('HTTP Server running on port 8080')
        })
    }
}

let app = new App()