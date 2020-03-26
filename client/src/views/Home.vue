<template>
    <div>
        <UserNavbar/>
        <Banner/>
        <UpperNote/>
        <Product/>
        <Footer/>
    </div>
</template>
<script>
import UserNavbar from '../components/UserNavbar.vue';
import Banner from '../components/Banner.vue';
import UpperNote from '../components/UpperNote.vue';
import Product from '../components/Product.vue';
import Footer from '../components/footer.vue';

export default {
  name: 'Home',
  components: {
    UserNavbar,
    Banner,
    UpperNote,
    Product,
    Footer,
  },
};
</script>
