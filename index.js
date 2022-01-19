const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
var CronJob = require('cron').CronJob

const app = express()
url = 'https://www.infomoney.com.br/cotacoes/engie-brasil-egie3/'

//https://www.infomoney.com.br/cotacoes/mdiasbranco-mdia3/
//https://www.infomoney.com.br/cotacoes/itausa-itsa4/
//https://www.infomoney.com.br/cotacoes/taesa-taee11/
//https://www.infomoney.com.br/cotacoes/weg-wege3/
//https://www.infomoney.com.br/cotacoes/grendene-grnd3/

var job = new CronJob('*/15 * * * * *', function(){
    axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const stock = []
    
            const price = $('div.value p').text()
    
            console.log(price)
        }).catch((err) => {
            console.log(err)
        })
    
}, null, true)

job.start()

app.listen(PORT, () => console.log(`Server running on the PORT ${PORT}...`))