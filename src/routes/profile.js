const express = require('express')
const { userAuth } = require('../middlewares/auth')
const User = require('../models/user')
const { validateEditProfileData } = require('../utils/validation')
const profileRouter = express.Router()

profileRouter.get('/profile/view', userAuth, async (req, res) => {
    try {
        const user = req.user

        res.send(user)
    } catch(error) {
        res.status(400).send('ERROR : ' + error.message)
    }
})

profileRouter.patch('/profile/edit', userAuth, async (req, res) => {
    try {
        const data = req.body
        const isUpdateAllowed = validateEditProfileData(data)

        if(!isUpdateAllowed) {
            throw new Error('Update is not allowed')
        }

        const loggedInUser = req.user
        const user = await User.findByIdAndUpdate(loggedInUser._id, data, { returnDocument: 'after' })
        res.json({
            message: 'User profile updated successfully',
            data: user
        })
    } catch(error) {
        res.status(400).send('ERROR : ' + error.message)
    }
})

profileRouter.patch('/profile/changePassword', async (req, res) => {})

module.exports = profileRouter