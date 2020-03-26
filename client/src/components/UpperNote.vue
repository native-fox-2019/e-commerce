<template>
<div id="upper">
    <div class="d-flex justify-content-around">
        <div>
        <img src="../assets/order.png">
        <p>Fast Shipping</p>
        </div>
        <div>
        <img src="../assets/stamp.png">
        <p>100% Authentic</p>
        </div>
        <div>
        <img src="../assets/money.png">
        <p>100% Money Back Guarantee</p>
        </div>
    </div>
    <hr>
</div>
</template>
<script>
export default {
  name: 'UpperNote',
};
</script>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Assistant:200,300&display=swap);
p{
    font-family: 'Assistant';
    font-weight: 300;
    font-size: 20px;
}
#upper{
    padding-top: 20px;
}
hr{
    border-top: 2px rgb(109, 109, 109) solid;
}
</style>
