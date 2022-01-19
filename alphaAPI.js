'use strict';
const e = require('express');
var request = require('request');
var timestamp = require('timestamp-conv')

var funct = 'TIME_SERIES_DAILY'
var symbol = 'wege3'
var interval = '5min'
var apikey = '0RG6KZV5T50KVDL7'

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
//var url = `https://www.alphavantage.co/query?function=${funct}&symbol=${symbol}.SA&apikey=${apikey}`;

var symbol = 'itsa4'
var interval = '1h'  //Valid intervals: [1m, 2m, 5m, 15m, 30m, 60m, 90m, 1h, 1d, 5d, 1wk, 1mo, 3mo]
var range = '1d'      //"validRanges":["1d","5d","1mo","3mo","6mo","1y","2y","5y","10y","ytd","max"]

var url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}.SA?region=US&lang=en-US&includePrePost=false&interval=${interval}&useYfid=true&range=${range}&corsDomain=finance.yahoo.com&.tsrc=finance`

request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:

      var date = new timestamp.date(JSON.stringify(data.chart.result[0].timestamp[0]))

      var out = []
      out.push(JSON.stringify(data.chart.result[0].timestamp))
      console.log(out)

      console.log(date.getDay(), date.getMonth(), date.getYear(), date.getHour(), date.getMinute());

      console.log(JSON.stringify(data.chart.result[0].timestamp));
      console.log(JSON.stringify(data.chart.result[0].indicators.quote[0].open));
      console.log(JSON.stringify(data.chart.result[0].indicators.quote[0].high));
      console.log(JSON.stringify(data.chart.result[0].indicators.quote[0].low));
      console.log(JSON.stringify(data.chart.result[0].indicators.quote[0].close));
      console.log(JSON.stringify(data.chart.result[0].indicators.quote[0].volume));
    }
});