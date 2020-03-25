const { users } = require('../models')
const bcrypt = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')

class userController {

    static register(req, res) {
        let input = {
            email: req.body.email,
            password: req.body.password,
            role: "Admin"
        }
        console.log("ini req.body",req.body)

        users.create(input)
            .then(user => {
                console.log("ini user:", user)
                
                if(user.role == "Admin"){
                    let tokenAdmin = jwt.jwtSign({
                        id: user.id,
                        email: user.email,
                        role: user.role
                    })                    
                    console.log("ini token",tokenAdmin)
                    console.log("ini obj token",{tokenAdmin})
                    res.status(200).json({ tokenAdmin })
                    console.log("ini token",tokenAdmin)
                    console.log("ini obj token",{tokenAdmin})
                } else if(user.role == "Customer") {
                    let tokenCustomer = jwt.jwtSign({
                        id: user.id,
                        email: user.email,
                        role: user.role
                    })
                    console.log("ini token",tokenCustomer)
                    console.log("ini obj token",{tokenCustomer})
                    res.status(200).json({ tokenCustomer })
                    console.log("ini token",tokenCustomer)
                    console.log("ini obj token",{tokenCustomer})
                }
            }).catch(err => {
                res.status(401).json({msg:"email and password must be filled"})
            })
    }

    static login(req, res) {
        let email = {
            where: {
                email: req.body.email
            }
        }
        let password = req.body.password

        console.log("ini email", email, "ini password=>", password,"ini req.body=>",req.body)

        users.findOne(email)
            .then(user => {
                let isValidate = bcrypt.checker(password, user.password)
                if (isValidate) {
                    if(user.role == "Admin"){
                        let tokenAdmin = jwt.jwtSign({
                            id: user.id,
                            email: user.email,
                            role: user.role
                        })                        
                        console.log("ini token",tokenAdmin)
                        console.log("ini obj token",{tokenAdmin})
                        res.status(200).json({ tokenAdmin })
                        console.log("ini token",tokenAdmin)
                        console.log("ini obj token",{tokenAdmin})
                    } else if(user.role == "Customer") {
                        let tokenCustomer = jwt.jwtSign({
                            id: user.id,
                            email: user.email,
                            role: user.role
                        }) 
                        console.log("ini token",tokenCustomer)
                        console.log("ini obj token",{tokenCustomer})
                        res.status(200).json({ tokenCustomer })
                        console.log("ini token",tokenCustomer)
                        console.log("ini obj token",{tokenCustomer})
                    }
                } else {
                    res.status(404).json({ msg:"id or email is not found" })
                }
            }).catch(err => {
                res.status(500).json({ msg: "disini internal server error",
            error:err.error })
            })
    }

    static getAllUser(req,res){
        users.findAll()
        .then(user =>{
            res.status(200).json(user)
        })
        .catch(err =>{
            res.status(404).json({message:"user is not found"})
        })
    }

    static updateUser(req,res){
        let input = {
            role : req.body.role
        }
        let idUser={
            where:{
                id: req.params.id
            }
        }
        users.update(input,idUser)
        .then(user =>{
            res.status(200).json(user)
        }).catch(err =>{
            res.status(500).json({message:"update fail"})
        })
    }

    static deleteUser(req,res){
        let id = {
            where:{
                id:req.params.id
            }
        }

        users.destroy(id)
        .then(user =>{
            res.status(200).json(user)
        })
        .catch(err =>{
            res.status(500).json({message:"delete is fail"})
        })
    }

}
module.exports = userController