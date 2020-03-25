<template>
  <div id="app">
    <NavBar/>
    <router-view></router-view>
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
  }
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
</style>
