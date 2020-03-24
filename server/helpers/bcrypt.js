const bcrypt = require('bcrypt')
const salt = 10

function hash (pass) {
    return bcrypt.hashSync(pass, salt)
}

function compare (pass,db_pass) {
    return bcrypt.compareSync(pass, db_pass)
}


module.exports = {hash, compare}