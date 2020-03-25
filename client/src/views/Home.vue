<template>
  <div>
    <UserNavbar />
    <UserShowProduct />
  </div>
</template>

<script>

import UserNavbar from '../components/UserNavbar.vue';
import UserShowProduct from '../components/UserShowProduct.vue';
export default {
  name: 'Home',
  components: {
    UserNavbar,
    UserShowProduct
  }
}
</script>
