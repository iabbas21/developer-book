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

app.get('/user', async (req, res) => {
    try {
        const user = await User.findOne({ emailId: req.body.emailId })
        if(!user) {
            res.status(404).send('User not found')
        } else {
            res.send(user)
        }
        // const users = await User.find({ emailId: req.body.emailId })

        // if(users.length > 0) {
        //     res.send(users)
        // } else {
        //     res.status(404).send('User not found')
        // }
    } catch(error) {
        res.status(400).send('Something went wrong')
    }
})

app.get('/feed', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch(error) {
        res.status(400).send('Something went wrong')
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