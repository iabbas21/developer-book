const express = require('express')
const connectDB = require('./config/database')
const User = require('./models/user')
const { validateSignUpData } = require('./utils/validation')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const { userAuth } = require('./middlewares/auth')

const app = express()

// Runs for every incoming request
app.use(express.json())
app.use(cookieParser())

const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')
const requestRouter = require('./routes/request')

app.use('/', authRouter)
app.use('/', profileRouter)
app.use('/', requestRouter)


connectDB()
    .then(() => {
        console.log('Database connection established...')
        app.listen(3000, () => {
            console.log(`Server is running successfully...`)
        })
    })
    .catch(() => console.log('Database cannot be connected..'))