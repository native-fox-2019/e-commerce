<template>
  <div id="app">
    <navbar></navbar>
    <div >
    <router-view/>
    </div>
    <div class="footer">
      <span> Gabriel Geovrisco</span>
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
