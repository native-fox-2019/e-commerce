
module.exports={
    imageURL(product){
        if(product.isScrapped)
           return product.image_url
       return this.$store.state.SERVER+'/img/'+product.image_url
   }
}