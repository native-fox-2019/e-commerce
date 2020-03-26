const {Banner}=require('../models')

class BannerController{
    static async index(req,res){
        try{
            let banners=await Banner.findAll({order:['id']});
            res.status(200).json(banners);
        }catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    }
}

module.exports=BannerController