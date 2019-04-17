import * as http from 'http'
import * as express from 'express'
import * as helmet from 'helmet'
import * as mongodb from 'mongodb'
import * as compression from 'compression'

const url: string = 'mongodb://localhost:27017/myproject'

export class App {
    app: express
    router: express.Router
    mongo: mongodb.MongoClient
    uhh: Promise<mongodb.MongoClient>

    constructor(){
        this.app = express()
        this.app.use(helmet())
        this.app.use(compression())
        this.buildRoutes()
        this.mongoConnect()
        const httpServer = http.createServer(this.app)
        httpServer.listen(8080, () => {
            console.log('HTTP Server running on port 8080')
        })
    }
    
    private buildRoutes(){
        this.router = express.Router()


        this.app.use(express.static(__dirname + '/dist/armok'))
    }

    private mongoConnect(){
        this.mongo = new mongodb.MongoClient(url)

        this.mongo.connect()
        .then(db => {
            if(db.isConnected()){
                console.log('Connected mongo')
            }
            db.close()
        } )
        .catch(err => {
            console.log('Error: ')
            console.error(err)
        })
    }
}

const app = new App()