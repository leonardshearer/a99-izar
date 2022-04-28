// globalVariable is in index.js
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
var positive;
var negative;

module.exports = function getSentiment(req, res, next) {
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
      var sentimentAPI = new Sentiment();
      var result = sentimentAPI.analyze(allTweets);
      console.dir(result);
      res.statusCode = 200;
      //res.statusMessage = JSON.stringify(result).replace(/\r?\n|\r/g, '');
      var sentiment = { x: ["positive", "negative"],
      y: [result.positive, result.negative],
      type: 'bar'
    }
      //console.log(res.statusMessage);
      positive = result.positive.length
      negative = result.negative.length
      document.getElementById("posi").innerHTML = positive;
      document.getElementById("negi").innerHTML = negative;

      // document.getElementById("numOfP laces").innerText = tempCountPlaces;

      res.writeHead( res.statusCode, { 'Content-Type' : 'application/json' });
      res.end(JSON.stringify(sentiment));
    });
}

module.exports = positive, negative;

