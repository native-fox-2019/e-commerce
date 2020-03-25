<template>
  <div>
    <Navbar/>
    <Alert/>
    <Success/>
    <ProductsCard/>
  </div>
</template>

<script>
import Navbar from '@/components/navbar'
import Alert from '@/components/Alert'
import Success from '@/components/SuccessAlert'
import ProductsCard from '@/components/products-card'
export default {
  name: 'Cart',
  components: {
    Navbar,
    Alert,
    Success,
    ProductsCard
  }
}
</script>

<style>

</style>
