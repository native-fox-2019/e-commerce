<template>
  <div v-b-hover="handleHover">
    <b-card
      :img-src="item.image_url"
      img-alt="Card image"
      img-top
      :sub-title="item.name"
      tag="article"
      style="max-width: 12rem;border:none;"
      v-if="!isHovered"
    >
      <b-card-text
        style="color:#39387a;font-size: 16px;font-weight: bold;"
      >{{formatRupiah(item.price)}}</b-card-text>
    </b-card>
    <b-card
      :img-src="item.image_url"
      img-alt="Card image"
      img-top
      :sub-title="item.name"
      tag="article"
      style="max-width: 12rem;box-shadow: 2px 2px 2px grey;"
      v-else
    >
      <b-card-text style="color:#39387a;">
        <h5>{{formatRupiah(item.price)}}</h5>
      </b-card-text>
    </b-card>
  </div>
</template>
<script>
export default {
  props: ["item"],
  data() {
    return {
      isHovered: false
    };
  },
  methods: {
    formatRupiah(angka) {
      let reverse = angka
        .toString()
        .split("")
        .reverse()
        .join("");
      let ribuan = reverse.match(/\d{1,3}/g);
      let rupiah = ribuan
        .join(".")
        .split("")
        .reverse()
        .join("");
      return "Rp. " + rupiah;
    },
    handleHover(hovered) {
      this.isHovered = hovered;
    }
  }
};
</script>
<style scoped>
img {
  height: 100px;
}
/* overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    transition: all 0.5s ease 0s; */
</style>