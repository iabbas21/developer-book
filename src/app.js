const express = require('express')

const app = express()

app.use('/user', (req, res) => {
    res.send('Handle all HTTP methods of route /user')
})

app.get('/user', (req, res) => {
    res.send({ firstName: 'Irfan', lastName: 'Abbas' })
})

app.post('/user', (req, res) => {
    console.log('Save data in DB')
    res.send("Data saved successfully!")
})

app.delete('/user', (req, res) => {
    console.log('Delete data from DB')
    res.send("Data deleted successfully!")
})

app.use('/', (req, res) => {
    res.send('Hello from server')
})

app.listen(3000, () => {
    console.log(`Server is running successfully`)
})