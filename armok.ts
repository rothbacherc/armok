import * as http from 'http'
import * as express from 'express'
import * as helmet from 'helmet'
import * as mongodb from 'mongodb'
import * as compression from 'compression'
import { DataAccess } from './dataAccess'


const url: string = 'mongodb://localhost:27017/myproject'

export class App {
    app: express
    router: express.Router
    data: DataAccess

    constructor(){
        this.app = express()
        this.app.use(helmet())
        this.app.use(compression())
        this.buildRoutes()
        this.data = new DataAccess()
        const httpServer = http.createServer(this.app)
        httpServer.listen(8080, () => {
            console.log('HTTP Server running on port 8080')
        })
    }
    
    private buildRoutes(){
        this.router = express.Router()

        this.router.post('/api/register', (err, req, res) => {
            
        })

        this.app.use(express.static(__dirname + '/dist/armok'))
    }
}

const app = new App()