const validator = require('validator')

function validateSignUpData(data) {
    const { firstName, lastName, emailId, password } = data

    if (!firstName || !lastName) {
        throw new Error('firstName and lastName is required')
    }

    if(!validator.isEmail(emailId)) {
        throw new Error('Please enter valid email address')
    }

    if(!validator.isStrongPassword(password)) {
        throw new Error('Please enter strong password')
    }
}

function validateEditProfileData(data) {
    const ALLOWED_UPDATES = ['age', 'gender', 'photoUrl', 'about', 'skills']
    return Object.keys(data).every(k => ALLOWED_UPDATES.includes(k))
}

module.exports = {
    validateSignUpData,
    validateEditProfileData
}