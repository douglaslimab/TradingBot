PORT = 8000
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const logger = require('./logger.js')

const app = express()
app.use(cors())

app.use(logger)

app.get('/b3/', (req, res) => {
    res.send('working here..')
})

app.get('/b3/ticker/:id&:interval&:range', (req, res) => {

    symbol = req.params.id
    interval = req.params.interval
    range = req.params.range
        
    var asset = {
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
        
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}.SA?region=US&lang=en-US&includePrePost=false&interval=${interval}&useYfid=true&range=${range}&corsDomain=finance.yahoo.com&.tsrc=finance`
    
    const getData = async (url) => {
        try {
          const response = await axios.get(url)
          const data = response.data

          const pack = data
          
          asset.symbol = pack.chart.result[0].meta.symbol
          asset.currency = pack.chart.result[0].meta.currency
          asset.interval = pack.chart.result[0].meta.dataGranularity
          asset.range = pack.chart.result[0].meta.range
          asset.timestamp = pack.chart.result[0].timestamp
          asset.open = pack.chart.result[0].indicators.quote[0].open
          asset.high = pack.chart.result[0].indicators.quote[0].high
          asset.low = pack.chart.result[0].indicators.quote[0].low
          asset.close = pack.chart.result[0].indicators.quote[0].close
//          asset.adjclose = pack.chart.result[0].indicators.adjclose[0].adjclose
          asset.volume = pack.chart.result[0].indicators.quote[0].volume

          res.json(asset)
        } catch (error) {
            console.log(error)
        }
    }
      
      getData(url)
    
})

app.listen(PORT, () => console.log(`Server running on the PORT ${PORT}`))