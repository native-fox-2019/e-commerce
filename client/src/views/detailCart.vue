<template>
<div style="margin-top: 5em;">
  <v-alert v-if="err" type="error">
    {{errMsg}}
  </v-alert>

  <v-alert v-if="success && !err" type="success">
    {{successMsg}}
  </v-alert>
  <v-card
    class="mx-auto"
    max-width="1000"
    outlined
  >
  
    <v-list-item three-line>
      <v-list-item-avatar
        tile
        size="300"
        color="grey"
      >
      <img :src="data.urlImage">
      </v-list-item-avatar>
      <v-list-item-content>
        <div class="overline" >
          <p style="font-family: 'Fredoka One', cursive; font-size: 20px;">
            {{data.name}}
            </p>
            </div>
        <v-list-item-title class="headline">
          Stock: {{data.stock}}
          </v-list-item-title>
        <v-list-item-title class="headline">
          Price:{{new Intl.NumberFormat('id-ID', { currency: 'IDR', style: 'currency', }).format(data.price)}}
          </v-list-item-title>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum totam illum quis atque eius error quibusdam soluta incidunt doloremque sequi iste libero, nostrum, voluptatem labore porro obcaecati neque alias nam?
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis dolores omnis assumenda eum debitis magnam quam, eaque ut earum libero eius voluptates doloremque facilis mollitia accusantium ex velit numquam hic.
          </p>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <v-btn text @click.prevent="addCart(data.id)">Add To Cart</v-btn>
      ||
      <v-btn text @click.prevent="goBack">Back</v-btn>
    </v-card-actions>
  </v-card>
</div>
</template>

<script>
export default {
  name: 'detailPage',
  data() {
    return {
      err: false,
      errMsg: '',
      success: false,
      successMsg: "Product has been added",
      data: {}
    }
  },
  methods: {
    getData() {
      this.$axios({
        url: '/products/'+ this.$route.params.id,
        method: "GET",
        headers: ({token: localStorage.getItem('token')})
      })
      .then(({data})=>{
        console.log(data);
        this.data = data
      })
      .catch(({response})=>{
        console.log(response);
      })
    },
    goBack() {
      this.$router.push({path: "/"})
    },
    addCart(id) {      
      this.$axios({
        url: '/transaction',
        method: "POST",
        headers: ({token : localStorage.getItem("token")}),
        data: {
          ProductId: id,
          quantity: 1
        }
      })
        .then(({data}) => {
          console.log(data, "APA SINI??");
          this.success = true
          this.err = false
        })
        .catch(({response})=>{
          console.log("SINI??");
          
          console.log(response);
          this.success = false
          this.err =  true;
          this.errMsg = response.data
        })

    }
  },
   
  created() {
    this.getData()
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Fredoka+One&display=swap');

</style>