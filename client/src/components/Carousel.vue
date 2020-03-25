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
                  <a href=""><span>SHOP MEN</span></a>
                </div>
                <div class="grid-cell">
                  <a href=""><span>SHOP WOMEN</span></a>
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

export default {
  name: 'Carousel',
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

  .grid-cell
  a {
    text-decoration: none;
    color: white;
    margin: 0 20px;
    text-align: center;
    outline: none;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer
  }
</style>
