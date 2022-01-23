const newsFeed = document.querySelector('#news-feed')
const ctx = document.querySelector('#my-chart').getContext("2d")
const inputSymbol = document.querySelector('#input-symbol')
const inputInterval = document.querySelector('#input-interval')
const inputRange = document.querySelector('#input-range')
const sendBtn = document.querySelector('#send-btn')
const refreshBtn = document.querySelector('#refresh')


//  Candlestick Settings

const initialCandlePack = {    x: 0, o: 0, h: 0, l: 0, c: 0 }

const data = {
    datasets: [{
        label: "",
        data: [ initialCandlePack ],
    }]
}

const config = {
	type: 'candlestick',
    data: data,
    options:{   responsive: true    }
}

const myChart = new Chart(ctx, config)

var updateMyChart = function(){
    var dataset = myChart.config.data.datasets[0].data
    dataset.push(lastCandlePack)
    myChart.update()
}


//  Api Address

url = 'http://localhost:5000/b3/ticker/'
news = 'http://localhost:8000/info/'


//  Send Button

sendBtn.addEventListener('click', async () => {
    urlCode = url + inputSymbol.value + '&' + inputInterval.value + '&' + inputRange.value
    console.log(urlCode)  

//    while(feedDisplay.firstChild){
//        feedDisplay.removeChild(feedDisplay.firstChild)
//    }

    return fetch(urlCode)
        .then((result) => {
            return result.json()
        }).then((data) => {
            myChart.config.data.datasets[0].data = []
            
            for(i=0;i<=Object.keys(data.timestamp).length;i++){
                lastCandlePack = {
                    x: data.timestamp[i],
                    o: data.open[i].toFixed(2),
                    h: data.high[i].toFixed(2),
                    l: data.low[i].toFixed(2),
                    c: data.close[i].toFixed(2)
                }
                myChart.config.data.datasets[0].label = data.symbol
                myChart.config.data.datasets[0].data.push(lastCandlePack)
                myChart.update()
            }
        }).catch((err) => {
            console.log(err)
        });
})

refreshBtn.addEventListener('click', () => {
    urlCode = news + inputSymbol.value
    console.log.urlCode

    return fetch(urlCode)
    .then((result) => {
        return result.json()
    }).then((data) => {
        
    while(newsFeed.firstChild){
        newsFeed.removeChild(newsFeed.firstChild)
    }

    data.forEach(article => {
        const articleItem = `<div><h3>` + article.title + `</h3><p>` + article.url + `</p></div>`
        newsFeed.insertAdjacentHTML("beforeend", articleItem)
    })

    }).catch((err) => {
        
    });
})