const express = require('express')

const app = express()

app.use('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/home', (req, res) => {
    res.send('Namaste from dashboard')
})

app.use('/test', (req, res) => {
    res.send('Hello from the server!')
})

app.listen(3000, () => {
    console.log(`Server is running successfully`)
})