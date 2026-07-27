const express = require('express')
const { adminAuth, userAuth } = require('./middlewares/auth')

const app = express()

// admin auth middleware 
app.use('/admin', adminAuth)

app.get('/admin/getAllUsers', (req, res) => {
    res.send('All users data')
})

app.get('/admin/deleteUser', (req, res) => {
    res.send('Deleted user')
})

app.post('/user/login', (req, res) => {
    res.send('User logged in successfully!')
})

app.get('/user/data', userAuth, (req, res) => {
    res.send('User data')
})

app.listen(3000, () => {
    console.log(`Server is running successfully`)
})