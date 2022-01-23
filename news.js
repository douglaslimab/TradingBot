PORT = 5000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const cors = require('cors')


const app = express()
app.use(cors())

url = `https://www.infomoney.com.br/busca/?q=wege3`


axios(url)
    .then( response => {
        const html = response.data
        const $ = cheerio.load(html)
        const newsFeed = []

    //    console.log($.html())
        $('.gsc-webResult', html).each(function() {
            const title = $(this).find('gs-title').text()    //mCBkyc y355M JQe2Ld nDgy9d
            const link = $(this).find('a').attr('href') //   WlydOe
            const source = $(this).find('.gsc-url-top').text()   //   CEMjEf NUnG9d
            const time = $(this).find('.gs-bidi-start-align .gs-snippet').text() //   S1FAPd OSrXXb
            
            newsFeed.push({
                title,
                link,
                source,
                time
            })
        })

        console.log(newsFeed)
        
    }).catch((err) => {
        console.log(err)
    });


app.get('/:symbol', (req, res) => {

    itemsymbol = req.params.symbol
    const url = `https://www.google.com/search?q=${itemsymbol}&tbm=nws`
    res.send(url)

    const getData = async (url) => {
        try {
            const response = await axios.get(url)
            const html = response.data
            const $ = cheerio.load(html)
            const newsFeed = []

            $('.v7W49e', html).each(function () {
                const title = $(this).find('.mCBkyc .y355M .JQe2Ld .nDgy9d').text()    //mCBkyc y355M JQe2Ld nDgy9d
                const link = $(this).find('a').attr('href') //   WlydOe
                const source = $(this).find('.CEMjEf .NUnG9d').text()   //   CEMjEf NUnG9d
                const time = $(this).find('.S1FAPd .OSrXXb').text() //   S1FAPd OSrXXb

                newsFeed.push({
                    title,
                    link,
                    source,
                    time
                })
            })

            console.log(newsFeed)
            
        } catch (error) {
        console.log(error)
        }
    }
    getData(url)
})
app.listen(PORT, () => console.log(`News API Server running on the PORT ${PORT}`))