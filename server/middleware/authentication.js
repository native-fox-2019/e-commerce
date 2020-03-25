const jwt = require('jsonwebtoken')

function authentication(req, res, next){
    const {token} = req.headers
    try{
        let decoded = jwt.verify(token, 'aaa')
        req.userdata = decoded
        console.log("...........")
        console.log(req.userdata)
        if(req.userdata.username){
            next()
        } else {
            res.status(400).json('not authorized')
        }
    } catch (err) {
        res.status(400).json('authentication failed')
    }
}

module.exports = authentication