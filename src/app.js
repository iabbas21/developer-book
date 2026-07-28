const express = require('express')
const connectDB = require('./config/database')
const User = require('./models/user')

const app = express()

app.post('/signup', async (req, res) => {
    const userData = {
        firstName: 'Irfan',
        lastName: 'Abbas',
        emailId: 'irfanabbas@gmail.com',
        password: 'Irfan@123'
    }

    try {
        // Creating a new instance of User model
        const user = new User(userData)
        await user.save()

        res.send('User added successfully!')
    } catch(error) {
        res.status(400).send('Error saving user: ' + error.message)
    }
})

connectDB()
    .then(() => {
        console.log('Database connection established...')
        app.listen(3000, () => {
            console.log(`Server is running successfully...`)
        })
    })
    .catch(() => console.log('Database cannot be connected..'))