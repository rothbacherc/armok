const fs = require('fs')
const http = require('http')
const https = require('https')
const express = require('express')
const helmet = require('helmet')
const compression = require('compression')

const app = express()
app.use(helmet())
app.use(compression())

/*
const privateKey = fs.readFileSync('/etc/letsencrypt/live/damay.dev/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/damay.dev/fullchain.pem', 'utf8');
//const ca = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate
};
*/

/*
app.use((req, res) => {
	res.send('Hello there !');
});
*/

app.use(express.static(__dirname + '/dist/armok'))

// Starting both http & https servers
const httpServer = http.createServer(app)
//const httpsServer = https.createServer(credentials, app);

httpServer.listen(8080, () => {
	console.log('HTTP Server running on port 8080')
})

/*
httpsServer.listen(8443, () => {
	console.log('HTTPS Server running on port 8443');
});
*/
