const {makeToken}=require('../helpers/token')
const {User}=require('../models')
const md5=require('md5')
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

class AuthController{

    static async index(req,res){
        res.send('Server is on');
    }

    static async checkConnection(req,res){
        const { Client } = require('pg')
        let client
        try{
            client = new Client({
                user: config.username,
                host: config.host,
                database: config.database,
                password: config.password,
                port: config.port,
                ssl: {
                    rejectUnauthorized: false
                }
            })
        }catch(err){
            console.log({err});
            res.send({message: 'Ada error', err});
        }
        console.log('yeaaaah')
        client.connect().then(() => {
            console.log('BERHIASIL CONNECT')
            res.send('Berhasil connect')
        })
        .catch((err) => {
            console.log('Gagal untuk connect',err);
            res.send({message: 'Ada error', err});
        })
        // console.log('Masuk ke check connection')
        // let sequelize
        // try{
        //     sequelize = new Sequelize(config.database, config.username, config.password, config);
        // }catch(err){
        //     console.log('Ada error saat koneksi ke database', err);
        //     res.send(err);
        // }
        // sequelize
        // .authenticate()
        // .then(() => {
        //     console.log('Connection has been established successfully.');
        //     res.send('Connection successfull');
        // })
        // .catch(err => {
        //     console.error('Unable to connect to the database:', err);
        //     res.send('Cannot connect',err);
        // });
    }

    static async login(req,res){
        let body=req.body;
        
        try{
            let user=await User.findOne({where:{email:body.email,password:md5(body.password)}});
            if(user){
               
                let token=makeToken(user);
                res.status(200).json({token});
            }
            else{
                res.status(400).json({message:'User not found'});
            }
        }catch(err){
            console.log(err);
            res.status(500).json(err);
        } 
    }

    static async register(req,res,next){
        let body=req.body

        try{
            let errors=[];
            if(!User.validateRegisterInput(body,errors)){
                res.status(400).json({message:'Error on validation',errors})
                return
            }
            let user=await User.create({...body,role:'user'});
            res.status(201).json(user);
        }catch(err){
            next(err)
        }
    }

    static async profile(req,res,next){
        let userId=req.user.id
        let body=req.body
        try{
            let result=await User.update(body,{where:{id:userId}})
            res.status(200).json({message:'Updated',result})
        }catch(err){
            next(err)
        }
    }
}

module.exports=AuthController