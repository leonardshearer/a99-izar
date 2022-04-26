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

//app.use(logging)

app.use(express.static('./dist'))

app.get('/app/', (req, res) => {
	// Respond with status 200
	res.statusCode = 200;
	// Respond with status message "OK"
	res.statusMessage = 'OK';
	res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
	res.end(res.statusCode+ ' ' +res.statusMessage)
});

if(args.debug) {
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

app.use(function (req, res, next) {
    res.statusCode = 404;
	// Respond with status message "OK"
	res.statusMessage = 'NOT FOUND';
    res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
	res.end(res.statusCode+ ' ' +res.statusMessage)
  })

// document.createElement('NC');
export var globalVariable = {
    state : "good"
 };

//ignore for  now
//  var state1 = document.createElement('select');
//  state1.id = 'state';
//  state1.innerHTML = '<option value="AL">Alabama</option><option value="AK">Alaska</option><option value="AZ">Arizona</option><option value="AR">Arkansas</option><option value="CA">California</option><option value="CO">Colorado</option><option value="CT">Connecticut</option><option value="DE">Delaware</option><option value="DC">District Of Columbia</option><option value="FL">Florida</option><option value="GA">Georgia</option><option value="HI">Hawaii</option><option value="ID">Idaho</option><option value="IL">Illinois</option><option value="IN">Indiana</option><option value="IA">Iowa</option><option value="KS">Kansas</option><option value="KY">Kentucky</option><option value="LA">Louisiana</option><option value="ME">Maine</option><option value="MD">Maryland</option><option value="MA">Massachusetts</option><option value="MI">Michigan</option><option value="MN">Minnesota</option><option value="MS">Mississippi</option><option value="MO">Missouri</option><option value="MT">Montana</option><option value="NE">Nebraska</option><option value="NV">Nevada</option><option value="NH">New Hampshire</option><option value="NJ">New Jersey</option><option value="NM">New Mexico</option><option value="NY">New York</option><option value="NC">North Carolina</option><option value="ND">North Dakota</option><option value="OH">Ohio</option><option value="OK">Oklahoma</option><option value="OR">Oregon</option><option value="PA">Pennsylvania</option><option value="RI">Rhode Island</option><option value="SC">South Carolina</option><option value="SD">South Dakota</option><option value="TN">Tennessee</option><option value="TX">Texas</option><option value="UT">Utah</option><option value="VT">Vermont</option><option value="VA">Virginia</option><option value="WA">Washington</option><option value="WV">West Virginia</option><option value="WI">Wisconsin</option><option value="WY">Wyoming</option>';
//  document.body.appendChild(state1);