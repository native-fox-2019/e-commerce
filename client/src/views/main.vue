<template>
  <div style="height: 100vh; padding: 9em 5vw 0;"
  class="d-flex flex-wrap flex-md-row justify-content-between">
    <div v-for="data in $store.state.list" :key="data.id" class="px-4 mt-5"
    style="height: 22vw; width: 22vw;">
      <cardAdmin :data="data"
      v-if="$store.state.role === 'admin'"
      @update="getList"
       />
      <cardUser v-if="$store.state.role === `user`" :data="data" />
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import cardAdmin from '@/components/cardAd.vue';
import cardUser from '@/components/cardUser.vue';

export default {
  components: {
    cardAdmin,
    cardUser,
  },
  created() {
    this.getList();
    this.$store.state.role = localStorage.role;
  },
  methods: {
    getList() {
      axios({
        url: '/products',
        baseURL: this.$store.state.url,
        method: 'get',
        headers: {
          token: localStorage.token,
        },
      })
        .then(({ data }) => {
          this.$store.state.list = data;
        })
        .catch((err) => {
          this.$store.dispatch('toast', { vm: this, message: err });
        });
    },
  },
};
</script>
