<template>
  <div class="homepage-carousel">
    <div class="homepage-carousel-wrapper">
      <div class="homepage-carousel-image"></div>
      <div class="homepage-carousel-heading">
        <div class="container">
          <h1 class="typography">
            NATURAL COMFORT.
            <br>
            NOW THERE'S
            <br>
            A BRIGHT IDEA
          </h1>
        </div>
      </div>

      <div class="homepage-carousel-footer">
        <div class="container">
          <div class="grid">
            <div class="grid_small">
              <div class="grid">
                <div class="grid-cell">
                  <a class="link link-first" @click.prevent="menCollection">
                    <span class="link-text">SHOP MEN</span>
                  </a>
                </div>
                <div class="grid-cell">
                  <a class="link link-last" @click.prevent="womenCollection">
                    <span class="link-text">SHOP WOMEN</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Carousel',
  methods: {
    ...mapActions(['fetchProducts', 'checkStatus']),

    menCollection() {
      this.checkStatus();
      this.fetchProducts();
      if (this.$route.path !== '/collections/mens') {
        this.$router.push('/collections/mens');
      }
    },

    womenCollection() {
      this.checkStatus();
      this.fetchProducts();
      if (this.$route.path !== 'collections/womens') {
        this.$router.push('/collections/womens');
      }
    },
  },
};
</script>

<style scopped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .homepage-carousel {
    position:relative;
    min-height: 100vh;
  }

  .homepage-carousel-wrapper {
    position:absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
  }

  .homepage-carousel-image {
    background-image:url(https://cdn.allbirds.com/image/upload/f_auto,q_auto/v1/production/pageSectionHero/en-US/images/6u4i5mk8KOjFYGLlpfeoqp/1);
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .homepage-carousel-heading {
    z-index: 10;
    position: absolute;
    top: 20%;
    right: 0;
    left: 0;
  }

  .typography {
    font-size: 69px;
    letter-spacing: 10px;
    font-weight: 650;
    font-style: oblique;
    color: white;
    text-align: center;
    line-height: 1.4;
    transform: skewY(-5deg);
  }

  .homepage-carousel-footer {
    z-index: 10;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    padding-bottom: 48px;
  }

  .grid {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
  }

  .grid_small {
    width: 66%;
  }

  .grid-cell {
    position: relative;
    width: 50%;
  }

  .link {
    display: flex;
    text-decoration: none;
    color: white;
    text-align: center;
    outline: none;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transform: translateZ(0);
    width: 100%;
  }

  .link-first {
    margin-right: 24px;
  }

  .link-last {
    margin-left: 24px;
  }

  .link::before {
    transition: all .25s;
    content: "";
    display: block;
    width: 100%;
    border-bottom: 2px solid #fff;
    transform: scaleX(1);
    transform-origin: bottom right;
  }

  .link::after {
    transition: all .25s;
    content: "";
    display: block;
    width: 100%;
    border-bottom: 2px solid #fff;
    transform: scaleX(1);
    transform-origin: bottom left;
  }

  .link:hover::before {
    transform: scaleX(0);
  }

  .link:hover::after {
    transform: scaleX(0);
  }

  .link-text {
    flex-shrink: 0;
    letter-spacing: 1px;
    padding-top: 13px;
    padding-bottom: 13px;
    font-weight: 600;
    border-bottom: 2px solid #fff;
    transform: translateZ(0);
  }
</style>
