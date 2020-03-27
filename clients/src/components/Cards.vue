<template>
  <div v-b-hover="handleHover">
    <b-card
      :img-src="item.image_url"
      img-alt="Card image"
      img-top
      :sub-title="item.name"
      tag="article"
      style="max-width: 12rem;border:none;height:15rem;"
      v-if="!isHovered"
    >
      <b-card-text style="color:#39387a;font-size: 16px;font-weight: bold;">
        {{formatRupiah(item.price)}}
        <br />
        <p style="color:#39387a;cursor:pointer;">
          <b-icon icon="bag" class="mt-2"></b-icon> Beli Sekarang
        </p>
      </b-card-text>
    </b-card>
    <b-card
      :img-src="item.image_url"
      img-alt="Card image"
      img-top
      :sub-title="item.name"
      tag="article"
      style="max-width: 12rem;box-shadow: 2px 2px 2px grey;height:15rem;"
      v-else
    >
      <b-card-text style="color:#39387a;font-size: 16px;font-weight: bold;">
        {{formatRupiah(item.price)}}
        <br />
        <p style="color:#39387a;cursor:pointer;" @click.prevent="product(item)">
          <b-icon icon="bag" class="mt-2"></b-icon> Beli Sekarang
        </p>
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
    },
    product(data) {
      this.$store.commit("getOne", data);
      this.$router.push({
        path: `/product/${data.id}`
      });
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