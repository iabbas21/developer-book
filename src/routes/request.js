const express = require('express')

const requestRouter = express.Router()

requestRouter.post('/connectionRequest', async (req, res) => {
    res.send('Connection request sent successfully')
})

module.exports = requestRouter

