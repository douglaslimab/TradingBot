const request = require('request');
const fs = require('fs');

const writeStream = fs.createWriteStream('file1.json');

const portfolio = {
    "symbol": "",
    "currency": "",
    "interval": "",
    "range": "",
    "timestamp": "",
    "open": "",
    "high": "",
    "low": "",
    "close": "",
    "adjclose": "",
    "volume": ""}

var symbol = 'itsa4'
var interval = '1mo'  //Valid intervals: [1m, 2m, 5m, 15m, 30m, 60m, 90m, 1h, 1d, 5d, 1wk, 1mo, 3mo]
var range = '1y'      //"validRanges":["1d","5d","1mo","3mo","6mo","1y","2y","5y","10y","ytd","max"]
    
var url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}.SA?region=US&lang=en-US&includePrePost=false&interval=${interval}&useYfid=true&range=${range}&corsDomain=finance.yahoo.com&.tsrc=finance`

request(url, function(err, res, data){
    if(err){
        console.log(err)
    } else{
        const pack = JSON.parse(data)

        portfolio.symbol = pack.chart.result[0].meta.symbol
        portfolio.currency = pack.chart.result[0].meta.currency
        portfolio.interval = pack.chart.result[0].meta.dataGranularity
        portfolio.range = pack.chart.result[0].meta.range
        portfolio.timestamp = pack.chart.result[0].timestamp
        portfolio.open = pack.chart.result[0].indicators.quote[0].open
        portfolio.high = pack.chart.result[0].indicators.quote[0].high
        portfolio.low = pack.chart.result[0].indicators.quote[0].low
        portfolio.close = pack.chart.result[0].indicators.quote[0].close
        portfolio.adjclose = pack.chart.result[0].indicators.adjclose[0].adjclose
        portfolio.volume = pack.chart.result[0].indicators.quote[0].volume

        console.log(portfolio)
        writeStream.write(JSON.stringify(portfolio))
    }
})