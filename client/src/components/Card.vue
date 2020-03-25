<template>
  <div>
    <v-card
    min-width="150"
    max-width="400"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      v-bind:src="image_url"
    >
    </v-img>

    <v-card-subtitle class="pb-0">Stock: {{ stock }}</v-card-subtitle>

    <v-card-text class="text--primary">
      <div><strong>{{ name }}</strong></div>

      <div>Rp. {{ price }}</div>
      <div class="mt-3">
        <v-btn
          color="orange"
          max-width="100%"
        >
          <v-icon>mdi-plus</v-icon>
          <span>add to cart</span>
        </v-btn>
      </div>
    </v-card-text>

  </v-card>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['id', 'image_url', 'name', 'category', 'price', 'stock', 'updatedAt'],
};
</script>
