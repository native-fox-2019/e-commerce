<template>
  <div class="alert-success">
  <span class="closebtn" @click.prevent="hideAlert">&times;</span>
  {{success.msg}}
</div>
</template>

<script>
export default {
  name: 'Alert',
  props: ['success'],
  data () {
    return {
      show: true
    }
  },
  methods: {
    hideAlert () {
      this.$emit('hide', false)
      this.show = false
    }
  }
}
</script>

<style>
.alert-success {
  position: fixed;
  width: 95vw;
  padding: 20px;
  background-color: #44ec11; /* Red */
  color: white;
  margin-bottom: 15px;
}

.closebtn {
  margin-left: 20px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.closebtn:hover {
  color: black;
}
</style>
