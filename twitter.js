// import state from frontend.js

const { text } = require('stream/consumers');
var Twitter = require('twitter');
// require('dotenv/config');
var Sentiment = require('sentiment'); 

const apikey = "7bBZ96F5uNzss9lKSFtMoFiEw"
const ask = "nuHAMKVJUgLnMEAuAhrP8Makd1UkxJcHU04VUdY1Wbmp5BEfK1"
const at = "1511452233811996672-jdnn7j7lUB4uagfZwrfYt6eq75tQgU"
const ats = "6WtRhiWy1FLLGa6tJsp5zbM68cg0IpNjazXSGarXjL9Zu"

var client = new Twitter({
  consumer_key: apikey,
  consumer_secret: ask,
  access_token_key: at, 
  access_token_secret: ats
});
 
// var st  = String(state)
var params = {q:'covid AND lang:en'};
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


//and for queries
// only log text
//variable for state
//qualilty check tweets
