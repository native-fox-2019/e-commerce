<template>
  <div id="app">
    <navbar></navbar>
    <div >
    <router-view/>
    </div>
    <div class="footer">
      <span> Gabriel Geovrisco</span>
      <span> mail: geovrisco@gmail.com </span>
    </div>
  </div>
</template>
<script>
import navbar from './components/navbar.vue';

export default {
  components: {
    navbar,
  },
};
</script>
