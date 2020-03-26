<template>
  <div>
      <div class="container text-center mt-5">
          <h1> Morning Admin {{dataLogin.first_name}} {{dataLogin.last_name}} </h1>
          <br>
           <h4> Where do you wanna go???</h4>
            <div class="row">
                <div class="col-2"></div>
                <div class="col-4"><button type="button" class="btn btn-outline-primary" @click="customer">Customer Page</button></div>
                <div class="col-4"><button type="button" class="btn btn-outline-primary" @click="admin">Admin Page</button></div>
                <div class="col-2"></div>
            </div>
      </div>

  </div>
</template>

<script>
import Vue from 'vue'
import Swal from 'sweetalert2'
export default Vue.extend ({
name : 'PageAdmin',

computed : {
    dataLogin() {
        return this.$store.state.dataLogin.data
    }
},
methods : {
    customer() {
        Swal.fire({
        position: 'center',
        icon: 'success',
        title: `Welcome to Customer page`,
        showConfirmButton: false,
        timer: 3000
        })
        this.$router.push({path : '/'})

    },
    admin() {
        Swal.fire({
        position: 'center',
        icon: 'success',
        title: `Welcome to Admin page`,
        showConfirmButton: false,
        timer: 3000
        })
        this.$router.push({path : '/adminpage'})
    }


}
})
</script>

<style>

</style>