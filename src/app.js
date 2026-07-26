const express = require('express')

const app = express()

app.get('/user', 
    (req, res, next) => {
        console.log('Route handler 1')
        next()
    }, 
    (req, res, next) => {
        console.log('Route handler 2')
        // res.send('Route Handler 2')
        next()
    },
    (req, res, next) => {
        console.log('Route handler 3')
        // res.send('Route Handler 2')
        next()
    },
    (req, res, next) => {
        console.log('Route handler 4')
        res.send('Route Handler 4')
        // next()
    }
)

app.listen(3000, () => {
    console.log(`Server is running successfully`)
})