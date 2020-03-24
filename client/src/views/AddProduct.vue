<template>
<div>
  <AdminNavbar />
  <h1>Add a new Product</h1>
  <AddProductCard />
</div>
</template>

<script>
import AdminNavbar from '../components/AdminNavbar.vue';
import AddProductCard from '../components/AddProductCard.vue';
export default {
  components: {
    AdminNavbar,
    AddProductCard
  }
}
</script>