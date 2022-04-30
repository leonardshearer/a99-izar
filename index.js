import express from 'express'
import minimist from 'minimist'
import { getAccessDb } from './src/logdatabase.js'
import getSentiment from './src/twitter.cjs'

const app = express()
const args = minimist(process.argv.slice(2))
const db = getAccessDb()

console.log(args)

const HTTP_PORT = (1 <= args.port && args.port <= 65535) ? args.port : 5000
const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', HTTP_PORT))
})

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

app.get('/app/', (req, res) => {
    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.writeHead(res.statusCode, { 'Content-Type': 'text/plain' });
    res.end(res.statusCode + ' ' + res.statusMessage)
});

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

app.get('/app/sentiment/:state', (req, res, next) => {
    getSentiment(req, res, next);
});

// app.get('/app/user/register', (req, res, next) => {

// });

// app.get('/app/user/login', (req, res, next) => {

// });

// app.get('/app/user/logout', (req, res, next) => {

// });

// app.get('/app/user/changeemail', (req, res, next) => {

// });

// app.get('/app/user/changepassword', (req, res, next) => {

// });

// app.get('/app/user/delete', (req, res, next) => {

// });

app.use(function (req, res, next) {
    res.statusCode = 404;
    res.statusMessage = 'NOT FOUND';
    res.writeHead(res.statusCode, { 'Content-Type': 'text/plain' });
    res.end(res.statusCode + ' ' + res.statusMessage)
})