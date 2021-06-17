<template>
  <div id="app">
    <NavBar/>
      <transition name="fade">
        <router-view id="view"></router-view>
      </transition>
    <Footer/>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
import Footer from './components/Footer'

export default {
  name:'App',
  components:{
    NavBar,
    Footer
  },
  created(){
    var token=localStorage.getItem('token');
    if(token){
      this.$store.commit('setIsLogin',true);
    }
    else{
      this.$store.commit('setIsLogin',false);
    }
    var cart=localStorage.cart
    if(cart){
      var cartObj=JSON.parse(cart)
      this.$store.commit('setCart',cartObj)
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

.logo-img{
  width: 100px;
  height: 100px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#view{
  min-height: 500px;
  margin-top:140px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-leave-active{
  display: none;
}
.fade-enter, .fade-leave-to .fade-leave /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
