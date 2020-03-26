
module.exports=(err,req,res,next)=>{
    let name=err.name
    if(name==='SequelizeValidationError' || name==='SequelizeUniqueConstraintError'){
        let errors=[];
        for(let i=0;i<err.errors.length;i++){
            let e_obj=err.errors[i]
            errors.push(e_obj.message)
        }
        res.status(400).json({message:'Error on validation',errors})
    }
    else{
        console.log(err);
        res.status(500).json({message:'Internal server error. Check on console',err})
    }
}