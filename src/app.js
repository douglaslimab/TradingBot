const feedDisplay = document.querySelector('#feed')
const ctx = document.querySelector('#my-chart').getContext("2d")
const inputSymbol = document.querySelector('#input-symbol')
const inputInterval = document.querySelector('#input-interval')
const inputRange = document.querySelector('#input-range')
const sendBtn = document.querySelector('#send-btn')

const labels = [
    "2018",
    "2019",
    "2020",
    "2021"
]

const data = {
    labels,
    datasets: [{
        data: [1, 3, 5, 8],
        label: "Chart"
    }]
}

const config ={
    type: 'line',
    data: data,
    options:{
        responsive: true
    }
}

const myChart = new Chart(ctx, config)

url = 'http://localhost:8000/b3/ticker/'

sendBtn.addEventListener('click', async () => {

    urlCode = url + inputSymbol.value + '&' + inputInterval.value + '&' + inputRange.value
    console.log(urlCode)  

    while(feedDisplay.firstChild){
        feedDisplay.removeChild(feedDisplay.firstChild)
    }

    return fetch(urlCode)
            .then((result) => {
                return result.json()
            }).then((data) => {
                const output = `<div class='price-row'><p>` + 
                    data.open[0] + 
                    `</p><p>` + 
                    data.high[0] + 
                    `</p><p>` + 
                    data.low[0] + 
                    `</p><p>` + 
                    data.close[0] +
                    `</p></div>`
                feedDisplay.insertAdjacentHTML("beforeend", output)
                console.log(data)
            }).catch((err) => {
                console.log(err)
            });
})

