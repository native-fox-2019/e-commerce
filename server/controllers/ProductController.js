const {Product}=require('../models');
const {Op}=require('sequelize').Sequelize

class ProductController{
    static async index(req,res){
        let page=req.query.page || 1;
        let offset= 6 * (page-1);

        try{
            let attr={order:['id'],limit:6,offset,where:{}}
            req.query.category?attr.where.category=req.query.category:null
            if(req.query.search){
                attr.where.name={
                    [Op.iLike]: '%'+req.query.search+'%', 
                }
            }

            let products=await Product.findAll(attr);
            res.status(200).json(products)
        }catch(err){
            res.status(500).json(err)
        }
    }

    static async findById(req,res){
        let id=req.params.id
        try{
            let product=await Product.findByPk(id);
            if(product)
                res.status(200).json(product)
            else
                res.status(404).json({message:'Product not found'})
        }catch(err){
            res.status(500).json(err)
        }
    }
}

module.exports=ProductController;
