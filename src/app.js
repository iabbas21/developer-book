const express = require('express')
const connectDB = require('./config/database')
const User = require('./models/user')

const app = express()

// Runs for every incoming request
app.use(express.json())

app.post('/signup', async (req, res) => {
    // Creating a new instance of User model
    const user = new User(req.body)

    try {
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