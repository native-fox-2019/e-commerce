<template>
  <div class="footer">
    <div class="container">
      <div class="footer-list">
        <div class="grid-container">
          <div class="grid-cell">
            <h3 class="grid-cell-h3">HELP</h3>
            <ul class="footer-link-list">
              <li class="footer-link-list-item">
                <a>henarivanaa@gmail.com</a>
              </li>
              <li class="footer-link-list-item">
                <a>henarivanaa@gmail.com</a>
              </li>
              <li class="footer-link-list-item">
                <a>henarivanaa@gmail.com</a>
              </li>
              <li class="footer-link-list-item">
                <a>henarivanaa@gmail.com</a>
              </li>
            </ul>
          </div>
          <div class="grid-cell">
            <h3 class="grid-cell-h3">SHOP</h3>
            <ul class="footer-link-list">
              <li class="footer-link-list-item">
                <a>Men's Shoes</a>
              </li>
              <li class="footer-link-list-item">
                <a>Women's Shoes</a>
              </li>
            </ul>
          </div>
          <div class="grid-cell">
            <h3 class="grid-cell-h3">OUR COMPANY</h3>
            <ul class="footer-link-list">
              <li class="footer-link-list-item">
                <a>Lorem Ipsum</a>
              </li>
              <li class="footer-link-list-item">
                <a>Lorem Ipsum</a>
              </li>
              <li class="footer-link-list-item">
                <a>Lorem Ipsum</a>
              </li>
              <li class="footer-link-list-item">
                <a>Lorem Ipsum</a>
              </li>
              <li class="footer-link-list-item">
                <a>Lorem Ipsum</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped>
  .footer {
    background-color: #212a2f;
    padding: 72px 0;
  }

  .footer-list {
    margin-bottom: 68px;
    text-align: left;
  }

  .grid-container {
    display: flex;
    flex-flow: row wrap;
  }

  .grid-cell {
    width: 25%;
    position: relative;
    display: block;
  }

  .grid-cell-h3 {
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin: 0 0 18px 15px;
    color: white;
  }

  .footer-link-list {
    margin-bottom: auto;
    list-style: none;
  }

  .footer-link-list-item {
    list-style-type: none;
    margin-bottom: 12px;
  }

  .footer-link-list-item
  a {
    font-size: 14px;
    font-weight: 400;
    color: white;
  }
</style>
