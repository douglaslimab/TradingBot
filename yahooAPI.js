const request = require('request');
const fs = require('fs');
const writeStream = fs.createWriteStream('file.json');

var symbol = 'itsa4'
var interval = '1d'  //Valid intervals: [1m, 2m, 5m, 15m, 30m, 60m, 90m, 1h, 1d, 5d, 1wk, 1mo, 3mo]
var range = '1d'      //"validRanges":["1d","5d","1mo","3mo","6mo","1y","2y","5y","10y","ytd","max"]

var url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}.SA?region=US&lang=en-US&includePrePost=false&interval=${interval}&useYfid=true&range=${range}&corsDomain=finance.yahoo.com&.tsrc=finance`

request(url, function(err, res, data){
    if(err){
        console.log(err)
    } else{
        console.log(data)
        writeStream.write(data)
    }
})
