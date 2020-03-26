<template>
  <div>
    <Navbar />
    <v-container>
      <v-row>
        <v-col cols-9>
          <v-list three-line>
            <template v-for="(item, index) in items">
              <v-list-item
                :key="item.title"
              >
                <v-list-item-avatar>
                  <v-img :src="item.image_url"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title ><h2>{{item.name}}</h2></v-list-item-title>
                  <v-list-item-subtitle>
                    <h2>Rp. {{ item.price }}</h2></v-list-item-subtitle>
                  <v-text-field
                    id="quantity"
                    label="Quantity"
                    type="number"
                    v-model="quantity[index]"
                  ></v-text-field>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-col>
        <v-col cols-3>
          <v-card
            class="mx-auto"
            max-width="344"
            outlined
          >
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">Shopping Summary</v-list-item-title>
                <hr>
                <v-list-item-subtitle>
                  <v-row>
                    <v-col cols-8>
                      <h3>Total Price:</h3>
                    </v-col>
                    <v-col cols-4>
                      <h3><strong>Rp.{{ totalPriceIdr }}</strong></h3>
                    </v-col>
                  </v-row>
                </v-list-item-subtitle>
                <v-btn color="orange">
                  Checkout
                </v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'Cart',
  components: {
    Navbar,
  },
  data() {
    return {
      quantity: [],
      priceList: [],
      totalPriceIdr: null,
      items: [],
    };
  },
  created() {
    this.$store.dispatch('getCarts');
    this.items = this.$store.state.carts;
    this.priceList = this.$store.state.priceList;
    this.$store.commit('checkLogin');
    this.toIdr(this.totalPrice);
  },
  methods: {
    toIdr(bilangan) {
      const numberString = bilangan.toString();
      const sisa = numberString.length % 3;
      let rupiah = numberString.substr(0, sisa);
      const ribuan = numberString.substr(sisa).match(/\d{3}/g);
      if (ribuan) {
        const separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
      }
      this.totalPriceIdr = rupiah;
    },
  },
  watch: {
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.quantity.forEach((element, index) => {
        total += element * this.priceList[index];
      });
      this.toIdr(total);
      return total;
    },
  },
};
</script>
