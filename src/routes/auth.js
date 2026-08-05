const express = require('express');
const { validateSignUpData } = require('../utils/validation');
const authRouter = express.Router()
const bcrypt = require('bcrypt');
const User = require('../models/user');

authRouter.post('/signup', async (req, res) => {
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

authRouter.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body

        const user = await User.findOne({ emailId })
        if(!user) {
            throw new Error('Invalid credentials')
        }
        const isPasswordValid = await user.validatePassword(password)
        if(isPasswordValid) {
            const token = await user.getJwtToken()

            res.cookie('token', token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), httpOnly: true })

            res.send('Login successful')
        } else {
            throw new Error('Invalid credentials')
        }
    } catch(error) {
        res.status(400).send('ERROR : ' + error.message)
    }
})

authRouter.post('/logout', (req, res) => {
    res.cookie('token', null, { expires: new Date(Date.now()) })
    res.send('Logout successful')
})

module.exports = authRouter