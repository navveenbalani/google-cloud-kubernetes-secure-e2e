'use strict';

const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const {Buffer} = require('safe-buffer');

const app = express();

app.set('case sensitive routing', true);
app.use(bodyParser.json());

const PORT = 8080;

app.post('/echo', (req, res) => {
  res
    .status(200)
    .json({message: req.body.message})
    .end();
});


app.get('/healthz', (req, res) => {
console.log(req.connection.remoteAddress);  
res
    .status(200)
    .json({message: "ok"})
    .end();
});


app.get('/fetchWebsite', (req, res) => {
  
  request('https://navveenbalani.dev/', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    res
    .status(200)
    .json({message: "ok"})
    .end();
  } else {
  	res
    .status(500)
    .json({message: error})
    .end();
  }
})
});
  

app.listen(PORT);
console.log(`Running on ${PORT}`);
