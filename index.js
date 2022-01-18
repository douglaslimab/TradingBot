const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()
url = 'https://www.infomoney.com.br/cotacoes/engie-brasil-egie3/'

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

app.listen(PORT, () => console.log(`Server running on the PORT ${PORT}...`))