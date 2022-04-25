// import state from frontend.js
const express = require('express')
const app = express()

const args = require('minimist')(process.argv.slice(2))
console.log(args)
args['port']
const HTTP_PORT  = args.port || process.env.PORT || 3000

const server = app.listen(HTTP_PORT, () => {
	console.log('App listening on port %PORT%'.replace('%PORT%', HTTP_PORT))
});

const { globalVariable } = require('./oldfiles/frontend');
const { text } = require('stream/consumers');
var Twitter = require('twitter');
// require('dotenv/config');
var Sentiment = require('sentiment'); 

const apikey = "7bBZ96F5uNzss9lKSFtMoFiEw"
const ask = "nuHAMKVJUgLnMEAuAhrP8Makd1UkxJcHU04VUdY1Wbmp5BEfK1"
const at = "1511452233811996672-jdnn7j7lUB4uagfZwrfYt6eq75tQgU"
const ats = "6WtRhiWy1FLLGa6tJsp5zbM68cg0IpNjazXSGarXjL9Zu"
/*
var client = new Twitter({
  consumer_key: apikey,
  consumer_secret: ask,
  access_token_key: at, 
  access_token_secret: ats
});

var str = "covid " + globalVariable.state +  " lang:en"
var params = {q:str};
client.get('search/tweets', params, function(error, tweets, response) {
let allTweets = "";

  for (let i = 0; i < tweets.statuses.length;i++){
    const stat = tweets.statuses[i];
    allTweets += " " + stat.text;
  }
  var sentiment = new Sentiment();
  var result = sentiment.analyze(allTweets);
  console.dir(result);
});
*/
// only log text
//variable for state
//qualilty check tweets(other search terms)

app.get('/app/', (req, res) => {
	// Respond with status 200
	console.log('fxn');
	res.statusCode = 200;
	// Respond with status message "OK"
	res.statusMessage = 'OK';
	res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
	res.end(res.statusCode+ ' ' +res.statusMessage)
});

app.get('/app/sentiment/:state', (req, res) => {

    var client = new Twitter({
    consumer_key: apikey,
    consumer_secret: ask,
    access_token_key: at,
    access_token_secret: ats
    });

    var str = "covid " + req.params.state + " lang:en"
    var params = {q:str};
    client.get('search/tweets', params, function(error, tweets, response) {
      let allTweets = "";

      for (let i = 0; i < tweets.statuses.length;i++){
          const stat = tweets.statuses[i];
          allTweets += " " + stat.text;
      }
      var sentiment = new Sentiment();
      var result = sentiment.analyze(allTweets);
      console.dir(result);
      res.statusCode = 200;
      //res.statusMessage = JSON.stringify(result).replace(/\r?\n|\r/g, '');
      var statusMessage = JSON.stringify(result)
      console.log(res.statusMessage);
      res.writeHead( res.statusCode, { 'Content-Type' : 'application/json' });
      res.end(statusMessage);
    });

});


