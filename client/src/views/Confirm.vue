<template>
<div>
    <UserNavbar/>
    <img src="https://cdn.shopify.com/s/files/1/0193/3758/t/23/assets/tag-heuer-watches-banner_1440x.jpg">
    <div class="confim">
      <h3> Thank you for purchasing our product </h3>
      <p> we're gonna contact you as soon as possible</p>
      <p> have a good day. </p>
    </div>
    <Footer/>
</div>
</template>
<script>
import UserNavbar from '../components/UserNavbar.vue';
import Footer from '../components/footer.vue';

export default {
  name: 'Confirm',
  components: {
    UserNavbar,
    Footer,
  },
};
</script>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Lato:300,400&display=swap);

.confirm{
  margin-top: 10px;
}
p{
  font-family: 'Lato';
  font-weight: 300;
  color: black;
}
h3{
  font-family: 'Lato';
  color: black;
}
img{
    margin-top : 50px;
    width: 50%;
    height: 50%;
}

</style>
