<template>
  <b-dropdown-item-button>
      test
  </b-dropdown-item-button>
</template>
<script>
export default {
  props: ['data'],
  computed: {
    title() {
      if (this.data.name.length > 14) {
        return `${this.data.name.slice(0, 14)}...`;
      }
      return this.data.name;
    },
  },
};
</script>
