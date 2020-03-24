<template>
    <div>
        <UserNavbar/>
        <Banner/>
        <UpperNote/>
        <Product/>

    </div>
</template>
<script>
import UserNavbar from '../components/UserNavbar.vue';
import Banner from '../components/Banner.vue';
import UpperNote from '../components/UpperNote.vue';
import Product from '../components/Product.vue';

export default {
  name: 'Home',
  components: {
    UserNavbar,
    Banner,
    UpperNote,
    Product,
  },
};
</script>
