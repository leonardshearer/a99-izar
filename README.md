# a99 Final Project - Covid-19 Twitter Sentiment Analysis tool

## Summary 

Our project allows users to select a geographic area and view the sentiment towards COVID-19 in that area. This is produced by collecting tweets via the Twitter API, performing sentiment analysis, and generating a graph of the results.

## Installation

To run download/pull files from https://github.com/comp426-2022-spring/a99-izar and run npm install in your terminal. You may also need to run npm rebuild.

## Dependencies

    "better-sqlite3": "^7.5.1",
    "dotenv": "^16.0.0",
    "express": "^4.18.1",
    "firebase": "^9.6.11",
    "JSON": "^1.0.0",
    "minimist": "^1.2.6",
    "nodemon": "^2.0.16",
    "plotly.js-dist-min": "^2.11.1",
    "require": "^0.4.4",
    "sentiment": "^5.0.2",
    "twitter": "^1.7.1",
    "twitter.js": "^0.14.0"

## How to Run

In your terminal, run either npm run or npm test. You can then open  up the localhost:5555 on your browser. Then you should see the login page where you can register and login. Once you login you should be able to see the homepage.

## Instructions

0.Download files and run them
1.Register or Login 
2.Once on the homepage, use the dropdown to click on a state
3.Click the submit button
4.The graph should be visible for the given state now. Use the buttons on the top right of the graph to change the way you view it. 
5.You can logout, update your account, or delete your account on the righthand side of the page.

## Software Architecture

The frontend of the website is created using a combination of HTML, CSS, and JavaScript. To login, the site is connected to Firebase, which has its own user account functions. The graph is generated using Plotly. All user interactions trigger a call to an endpoint, which either has some functionality (such as obtaining the Twitter sentiment), or simply adds the interaction to the access log. This allows for easy logging of Firebase interactions.

## Planning

Ideas
https://docs.google.com/document/d/1_deFIbn060b8ypZBWJSGPnqILBLC3JqM8esqJppSUVU/edit?usp=sharing

To plan individual tasks, we used the Projects tab on GitHub.

We used GroupMe to communicate and bring up issues.