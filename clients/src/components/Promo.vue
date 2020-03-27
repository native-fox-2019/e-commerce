<template>
  <div>
    <b-card
      :img-src="item.image"
      img-alt="Image"
      img-top
      no-body
      tag="article"
      style="max-width: 20rem;"
    ></b-card>
  </div>
</template>
<script>
export default {
  props: ["item"]
};
</script>