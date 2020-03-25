<template>
  <div class="collection-banner">
    <div class="collection-banner-image">
      <div class="image"></div>
    </div>
    <div class="collection-banner-details">
      <div class="wrapper">
        <div class="banner-titles">
          <h1 class="title-typography">Men's Shoes</h1>
        </div>
        <p class="description-typography">Solid kicks for life's everyday adventure</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Banner',
};
</script>

<style scoped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .collection-banner {
    display: flex;
    flex-direction: row;
    background-color: rgb(33, 42, 47);
    height: 500px;
    width: 100%;
  }

  .collection-banner-image {
    width: 65%;
  }

  .image {
    background-image: url(https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_992,f_auto,q_auto/https://images.ctfassets.net/9uo1qvvet3xa/5JMJqG6V77pdPXLorPGY6z/5185c6cba753906a5c4694d6e3f4d6da/WR_Collection_BNR_1300x692__1_.jpg);
    height: 100%;
  }

  .collection-banner-details {
    width: 35%;
    text-align: center;
    flex: 1 1 0%;
  }

  .wrapper {
    width: 100%;
    height: 100%;
    padding: 24px 48px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    justify-content: center;
  }

  .banner-titles {
    margin-bottom: 12px;
  }

  .title-typography {
    color: white;
    font-size: 48px;
    line-height: 1.3;
    font-weight: 900;
    letter-spacing: 0.5px;
  }

  .description-typography {
    color: white;
    font-size: 16px;
    letter-spacing: 0.5px;
    line-height: 1.5;
    font-weight: 500;
  }
</style>
