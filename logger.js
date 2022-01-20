
const moment = require('moment')

var counter = 0
const logger = (req, res, next) => {
    counter++
    console.log(`hello.. ${counter}`)
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`)
    next()
}

module.exports = logger