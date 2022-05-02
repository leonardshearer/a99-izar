import express from 'express'
import minimist from 'minimist'
import { getAccessDb } from './src/logdatabase.js'
import getSentiment from './src/twitter.cjs'

// See docs/endpoints.md for query examples

const app = express()
const args = minimist(process.argv.slice(2))
const db = getAccessDb()

console.log(args)

const HTTP_PORT = (1 <= args.port && args.port <= 65535) ? args.port : 5000
const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', HTTP_PORT))
})

// Define interaction logging
const logging = (req, res, next) => {
    const query = db.prepare(`
        INSERT INTO accesslog (
            ip, 
            userid, 
            time, 
            method, 
            url, 
            protocol, 
            httpversion, 
            status, 
            referer, 
            userinfo
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `
    )
    const json = query.run(req.ip, req.user, Date.now(), req.method, req.url, req.httpVersion,
        req.protocol, req.statusCode, req.headers['referers'], req.headers['user-agent']
    )
    next()
}

app.use(express.json())

app.use(logging)

app.use(express.static('./public'))

// Most basic point to ensure server is working
app.get('/app/', (req, res) => {
    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.writeHead(res.statusCode, { 'Content-Type': 'text/plain' });
    res.end(res.statusCode + ' ' + res.statusMessage)
});

// View access log
if (args.debug) {
    app.get('/app/log/access/', (req, res, next) => {
        try {
            const query = db.prepare('SELECT * from accesslog').all()
            res.status(200).json(query)
        } catch {
            console.error(e)
        }
    })
}

// Retrieve data from Twitter API
app.get('/app/sentiment/:state', (req, res, next) => {
    getSentiment(req, res, next);
});

// Log user account actions (all of the below endpoints)
app.get('/app/user/register/:user', (req, res, next) => {
    res.statusCode = 200;
    res.statusMessage = 'User Registered';
    res.writeHead(res.statusCode, { 'Content-Type': 'text/plain' });
    res.end(res.statusCode + ' ' + res.statusMessage)
});

app.get('/app/user/login/:user', (req, res, next) => {
    res.statusCode = 200;
    res.statusMessage = 'User logged in';
    res.writeHead(res.statusCode, { 'Content-Type': 'text/plain' });
    res.end(res.statusCode + ' ' + res.statusMessage)
});

app.get('/app/user/logout', (req, res, next) => {
    res.statusCode = 200;
    res.statusMessage = 'User logged out';
    res.writeHead(res.statusCode, { 'Content-Type': 'text/plain' });
    res.end(res.statusCode + ' ' + res.statusMessage)
});

app.get('/app/user/changeemail', (req, res, next) => {
    res.statusCode = 200;
    res.statusMessage = 'User email changed';
    res.writeHead(res.statusCode, { 'Content-Type': 'text/plain' });
    res.end(res.statusCode + ' ' + res.statusMessage)
});

app.get('/app/user/changepassword', (req, res, next) => {
    res.statusCode = 200;
    res.statusMessage = 'User password changed';
    res.writeHead(res.statusCode, { 'Content-Type': 'text/plain' });
    res.end(res.statusCode + ' ' + res.statusMessage)
});

app.get('/app/user/delete', (req, res, next) => {
    res.statusCode = 200;
    res.statusMessage = 'User account deleted';
    res.writeHead(res.statusCode, { 'Content-Type': 'text/plain' });
    res.end(res.statusCode + ' ' + res.statusMessage)
});

// Provide error message if an invalid url/endpoint is entered
app.use(function (req, res, next) {
    res.statusCode = 404;
    res.statusMessage = 'NOT FOUND';
    res.writeHead(res.statusCode, { 'Content-Type': 'text/plain' });
    res.end(res.statusCode + ' ' + res.statusMessage)
})