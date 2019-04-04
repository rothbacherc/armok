const http = require('http')
const express = require('express')
const helmet = require('helmet')
const compression = require('compression')

const app = express()
app.use(helmet())
app.use(compression())

app.use((req, res) => {
        res.send('Hello there !');
});

// Starting both http & https servers
const httpServer = http.createServer(app);


httpServer.listen(8080, () => {
        console.log('HTTP Server running on port 8080');
});