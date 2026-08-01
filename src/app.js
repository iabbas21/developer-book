const express = require('express')
const connectDB = require('./config/database')
const User = require('./models/user')
const { validateSignUpData } = require('./utils/validation')
const bcrypt = require('bcrypt')

const app = express()

// Runs for every incoming request
app.use(express.json())

app.post('/signup', async (req, res) => {
    try {
        // Validate req data
        validateSignUpData(req.body)

        const { firstName, lastName, emailId, password } = req.body

        // Ecrypt the password
        const passwordHash = await bcrypt.hash(password, 10)

        // Creating new instance of User model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        })
        await user.save()

        res.send('User added successfully!')
    } catch(error) {
        res.status(400).send('ERROR : ' + error.message)
    }
})

app.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body

        // Check if user exist in DB
        const user = await User.findOne({ emailId })
        if(!user) {
            throw new Error('Invalid credentials')
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(isPasswordValid) {
            res.send('Login successful')
        } else {
            throw new Error('Invalid credentials')
        }
    } catch(error) {
        res.status(400).send('ERROR : ' + error.message)
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

app.delete('/user', async (req, res) => {
    const userId = req.body.userId
    try {
        const result = await User.findByIdAndDelete(userId) // ==> findOneAndDelete({ _id: userId })
        console.log(result)
        res.send('User deleted successfully')
    } catch(error) {
        res.status(400).send('Something went wrong')
    }
})

app.patch('/user/:userId', async (req, res) => {
    const userId = req.params.userId
    const updateData = req.body
    
    try {
        const ALLOWED_UPDATES = ['photoUrl', 'age', 'about', 'skills'];
        const isUpdateAllowed = Object.keys(updateData).every(k => ALLOWED_UPDATES.includes(k))

        if(!isUpdateAllowed) throw new Error('Update not allowed')

        if(updateData.skills?.length > 10) throw new Error('Max 10 skills are allowed')

        const result = await User.findByIdAndUpdate(userId, updateData, { returnDocument: 'after', runValidators: true }) // ==> findOneAndUpdate({ _id: userId }, updateData)
        console.log(result)
        res.send('User updated successfully')
    } catch(error) {
        res.status(400).send('Update failed: ' + error.message)
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