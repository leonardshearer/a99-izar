const { text } = require('stream/consumers');
var Twitter = require('twitter');
var Sentiment = require('sentiment');


//api keys, secret keys and bearer tokens
const apikey = "7bBZ96F5uNzss9lKSFtMoFiEw"
const ask = "nuHAMKVJUgLnMEAuAhrP8Makd1UkxJcHU04VUdY1Wbmp5BEfK1"
const at = "1511452233811996672-jdnn7j7lUB4uagfZwrfYt6eq75tQgU"
const ats = "6WtRhiWy1FLLGa6tJsp5zbM68cg0IpNjazXSGarXjL9Zu"

module.exports = function getSentiment(req, res, next) {
  var client = new Twitter({
    consumer_key: apikey,
    consumer_secret: ask,
    access_token_key: at,
    access_token_secret: ats
  });

//creating a search query string to pass into the api
  var str = "covid " + req.params.state + " lang:en"
  var params = { q: str };
  //using the query string as an api parameter to get seached tweets
  client.get('search/tweets', params, function (error, tweets, response) {
    let allTweets = "";
//taking relevant text out of the tweet information
    for (let i = 0; i < tweets.statuses.length; i++) {
      const stat = tweets.statuses[i];
      allTweets += " " + stat.text;
    }
    // passing text through the Sentiment analysis API
    var sentimentAPI = new Sentiment();
    var result = sentimentAPI.analyze(allTweets);
    console.dir(result);
    res.statusCode = 200;
    var sentiment = {
      x: ["Positive", "Negative"],
      y: [result.positive.length, result.negative.length],
      type: 'bar'
    }

    res.writeHead(res.statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(sentiment));
  });
}