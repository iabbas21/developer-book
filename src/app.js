const express = require('express')
const connectDB = require('./config/database')
const User = require('./models/user')

const app = express()

// Runs for every incoming request
app.use(express.json())

app.post('/signup', async (req, res) => {
    // Creating a new instance of User model
    const data = req.body

    try {
        const ALLOWED_FIELDS = ['firstName', 'lastName', 'emailId', 'password']
        const isInsertionAllowed = Object.keys(data).every(k => ALLOWED_FIELDS.includes(k))

        if(!isInsertionAllowed) throw new Error('Insertion not allowed')

        const user = new User(data)
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