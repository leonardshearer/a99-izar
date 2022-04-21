import express from 'express'
import minimist from 'minimist'
import { getAccessDb } from './code/logdatabase.js'

const app = express()
const args = minimist(process.argv.slice(2))
const db = getAccessDb()

console.log(args)

const logging = (req, res, next) => {
    const query = db.prepare(`
        INSERT INTO accesslog (ip, userid, time, method, url, protocol, httpversion, status, referer, userinfo)
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