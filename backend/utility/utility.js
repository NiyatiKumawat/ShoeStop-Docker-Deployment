const jwt = require ('jsonwebtoken')

const generateToken = (id , name ) =>{
    return jwt.sign({id , name } , process.env.JWT_SECRET || 'shoestop_jwt_default_secret_2026' , {
        expiresIn : process.env.expiry || '30d'
    })
}

module.exports = generateToken