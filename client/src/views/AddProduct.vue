<template>
<div>
  <AdminNavbar />
  <div class="mt-4">
    <h1>Add a new Product</h1>
  </div>
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