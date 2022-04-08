// import state from frontend.js

const { text } = require('stream/consumers');
var Twitter = require('twitter');
require('dotenv/config');
 
const apikey = process.env.apikey
const ask = process.env.apikeysecret
const at = process.env.accesstoken
const ats = process.env.accesstokensecret

var client = new Twitter({
  consumer_key: apikey,
  consumer_secret: ask,
  access_token_key: at, 
  access_token_secret: ats
});
 
// var st  = String(state)
var params = {q: 'covid'};
// var params = {has: 'covid',lang:en,place:state};
client.get('search/tweets', params, function(error, tweets, response) {
  console.log(tweets);
});

//and for queries
// only log text
//variable for state
//english 
//qualilty check tweets