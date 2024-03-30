const jwt = require("jsonwebtoken")
const token = (id)=> {
    return jwt.sign({id}, process.env.JSON_TOKEN, {
        expiresIn: "100d"
    })
}

module.exports = token