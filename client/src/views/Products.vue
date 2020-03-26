<template>
  <div style="padding:100px;">
    <div class="row" style="width:100%">
      <div class="col-3" v-for="product in this.$store.state.productList" :key="product.id">
        <div class="card mb-4" style="width:100%;"  v-if="product.stock > 0">
          <img class="card-img-top" :src="product.image_url" :alt="product.name" style="width:100%; height:200px;"/>
          <div class="card-body">
            <p class="card-text" style="font-size:13px;">
               <strong>
                  {{ product.name }}
                 </strong>
            </p>
            <p class="card-text" style="font-size:13px;">
                {{ product.showPrice }}
            </p>
            <p class="card-text" style="font-size:13px;">
                stock: {{ product.stock }}
            </p>
            <label style="font-size:13px;">Amount: </label>
            <input type="number" min="0" :max="product.stock" placeholder=0 v-model="amount[Number(product.id)]" style="width:50px;"><br>
            <button class="btn btn-outline-danger btn-sm mt-3" @click.prevent="addToCart(product.id, product.price, amount)">add to cart</button>
          </div>
        </div>
        <div class="card mb-4" style="width:100%;"  v-if="product.stock == 0">
          <img class="card-img-top" :src="product.image_url" :alt="product.name" style="width:100%; height:200px;"/>
          <div class="card-body">
            <p class="card-text" style="font-size:13px;">
               <strong>
                  {{ product.name }}
                 </strong>
            </p>
            <p class="card-text" style="font-size:13px;">
                {{ product.showPrice }}
            </p>
            <p class="card-text text-danger mt-5" style="font-size:25px; margin-bottom:47px;">
                SOLD OUT
            </p>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("getProduct");
  },
  data() {
      return {
          amount: {

          },
          totals:'' ,
          ids:'',
          amounts:''
      }
  },
  methods: {
      addToCart(id, price, amount) {
          let total = price*amount[id]
          this.totals = total
          this.ids = id
          this.amounts = Number(amount[id])
          console.log(this.amounts, this.totals)
          this.$store.dispatch('addToCart',{
              product_id: this.ids,
              amount: this.amounts,
              total: this.totals,
              price: price
          })
          this.empty()
      },
      empty() {
          this.amount = {}
          this.totals = ''
          this.ids = ''
          this.amounts = ''
      }
  }
};
</script>

<style></style>
