"use strict"
module.exports = (req, res, next) => {
    console.log('authorization')
    const isAdmin = req.user.isAdmin
   if (isAdmin) {
       next()
   } else {
       res.status(401).json({message : ['you have no authority']})
   }
}