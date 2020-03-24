<template>
<div>
  <AdminNavbar class="mb-2" />
  <AdminShowProduct />
</div>
</template>

<script>
import AdminNavbar from '../components/AdminNavbar.vue';
import AdminShowProduct from '../components/AdminShowProduct.vue';
export default {
  components: {
    AdminNavbar,
    AdminShowProduct
  }
}
</script>