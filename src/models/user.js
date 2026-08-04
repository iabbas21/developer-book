const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    lastName: {
        type: String,
        minLength: 3,
        maxLength: 50
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Invalid email address')
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isStrongPassword(value)) {
                throw new Error('Password is not strong enough')
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value) {
            if(!['male', 'female', 'other'].includes(value)) {
                throw new Error('Gender is not valid')
            }
        }
    },
    photoUrl: {
        type: String,
        default: 'https://geographyandyou.com/images/user-profile.png',
        validate(value) {
            if(!validator.isURL(value)) {
                throw new Error('Invalid photo URL')
            }
        }
    },
    about: {
        type: String,
        default: "This is a default about of user"
    },
    skills: {
        type: [String]
    }
}, {
    timestamps: true
})

userSchema.methods.getJwtToken = async function() {
    const user = this
    const token = await jwt.sign({ _id: user._id }, 'DEV@Book$123', { expiresIn: '7d' })
    return token
}

userSchema.methods.validatePassword = async function(inputPassword) {
    const user = this
    const passwordHash = user.password
    const isPasswordValid = await bcrypt.compare(inputPassword, passwordHash)
    return isPasswordValid
}

const User = mongoose.model('User', userSchema)
module.exports = User