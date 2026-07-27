const adminAuth = (req, res, next) => {
    console.log('Check admin is authenticated')
    const token = 'xyz'
    // Token validation logic
    const isAdmin = token === 'xyz'
    if(!isAdmin) {
        res.status(401).send('Unauthorized')
    } else {
        next()
    }
}

const userAuth = (req, res, next) => {
    console.log('Check user is authenticated')
    const token = 'xyz'
    // Token validation logic
    const isAdmin = token === 'xyz'
    if(!isAdmin) {
        res.status(401).send('Unauthorized')
    } else {
        next()
    }
}

module.exports = {
    adminAuth,
    userAuth
}