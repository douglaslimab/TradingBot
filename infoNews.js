PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

app = express()

ticker = 'itsa4'
url = `https://www.moneytimes.com.br/?s=${ticker}`

axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []
    
            $('.news-item__content').each(function(){
                const title = $(this).find('.news-item__title').text()
                const url = $(this).find('a').attr('href')
                const date = $(this).find('.date').text()
                
                articles.push({
                    title,
                    url,
                    date
                })
            })
            console.log(articles)
        }).catch(err => console.log(err)) 

app.listen(PORT, () => console.log(`Sercer running on the PORT ${PORT}`))