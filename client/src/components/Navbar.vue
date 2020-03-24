<template>
  <div class="header">
    <nav>
      <ul class="navlist start">
        <li>
          <button class="nav-button">
            <div class="nav-button-content">
              <p class="nav-content-description">MEN</p>
            </div>
          </button>
        </li>
        <li>
          <button class="nav-button">
            <div class="nav-button-content">
              <p class="nav-content-description">WOMEN</p>
            </div>
          </button>
        </li>
      </ul>
      <h4>LOGO</h4>
      <ul class="navlist end">
        <li>
          <button class="nav-button">
            <div class="nav-button-content">
              <p class="nav-content-description">CART</p>
            </div>
          </button>
        </li>
        <li>
          <button class="nav-button">
            <div class="nav-button-content">
              <p class="nav-content-description">LOGOUT</p>
            </div>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scoped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  li, a, button {
    text-decoration: none;
  }

  li {
    position: relative;
    align-items: center;
  }

  .header {
    display: flex;
    position: fixed;
    z-index: 100;
    width: 100%;
  }

  nav {
    display: flex;
    position: relative;
    width: 100%;
    height: 60px;
    justify-content: space-between;
    align-items: center;
    z-index: 1;
    margin: 0px;
  }

  .navlist {
    display: flex;
    align-items: center;
    list-style: none;
    width: 43%;
  }

  .navlist.start {
    justify-content: flex-start;
  }

  .navlist.end {
    justify-content: flex-end;
  }

  .nav-button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    cursor: pointer;
    outline: none;
    border-width: 0px;
    min-width: 42px;
    min-height: 42px;
    margin: 0px 0px 0px 18px;
  }

  .nav-button-content {
    display: flex;
    justify-content: center;
    margin: 0px 9px;
    border-bottom: 2px solid transparent;
    transition: border 100ms ease-in-out 0s;
  }

  .nav-button-content:hover {
    border-color: black;
  }

  .nav-content-description {
    font-weight: 700;
    font-size: 12px;
    line-height: 1.75;
    letter-spacing: 1.7px;
  }
</style>
