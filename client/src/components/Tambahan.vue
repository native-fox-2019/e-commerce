<template>
  <div>
  <div id="career" class="covered row mx-0">
    <div class="col-8">
    <img class="img" src="https://airbus-h.assetsadobe2.com/is/image/content/dam/channel-specific/website-/careers/career-germany/karrierepfade/sven/20170628_0594_Karrierepfade_HR-007.jpg?wid=1920&fit=fit,1&qlt=85,0" alt="">
    </div>
    <div class="col-4 col2">
            <h3 class="mt-5">
                AVIATO Carrier
            </h3>
        <button type="button" class="btn btn-outline-warning">CHECK HERE</button>
    </div>
  </div>
  <div class="peta mt-5">
      <img src="https://airbus-h.assetsadobe2.com/is/image/content/dam/channel-specific/website-/products-and-services/aircraft/services/Services_by_Airbus.png?wid=1920&fit=fit,1&qlt=85,0&fmt=png-alpha" alt="">
  </div>
</div>
</template>

<script>
export default {

}
</script>

<style>
.img img {
    width: 100%;
    height: 370px ;
    transition: transform .2s;
    margin: 0 auto;
    border-radius: 30px;
  
  
}

.img:hover {
  -ms-transform: scale(1.); /* IE 9 */
  -webkit-transform: scale(1.); /* Safari 3-8 */
  transform: scale(1.); 
  -webkit-box-shadow: 0px 5px 4px 4px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 5px 4px 4px rgba(0,0,0,0.75);
box-shadow: 0px 5px 4px 4px rgba(0,0,0,0.75);
}

.row {
    margin-top: 30px;
    width: 100% ! important;
    padding: 20px;
    height: 370px ! important;
     
}

.col2 {
    border:black solid 1px;
    -webkit-box-shadow: 0px 5px 4px 4px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 5px 4px 4px rgba(0,0,0,0.75);
    box-shadow: 0px 5px 4px 4px rgba(0,0,0,0.75);
    background: rgb(25, 21, 110);
    background: linear-gradient(260deg, rgba(2,0,36,0.3) 0%, rgba(186,52,146,0.06904760195093662) 35%, rgba(0,212,255,1) 100%); 
}
</style>