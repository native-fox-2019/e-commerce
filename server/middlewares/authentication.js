const {compare} = require('../helpers/bcrypt')
const {User} = require('../models')

module.exports = function authentication (req,res,next) {
    const {email, password} = req.body
    User.findOne({where:{email}})
    .then(data => {
        if(data){
            if(compare(data.password, password)) {
                next()
            } else {
                next({
                    status:400,
                    message: 'invalid username/password'
                })
            }
        } else {
            next({
                status:404,
                message: "email haven't registered"
            })
        }
    })
    .catch(next)
}
