<template>
<div>
<Navbar></Navbar>
<div>
    <img class="head" src="https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80" alt="">
</div>
    <div class="container"><h1>All Product</h1></div>
<div class="container" style=" border-radius: 40px 40px 10px 10px;
    -moz-border-radius: 40px 40px 10px 10px;
    -webkit-border-radius: 40px 40px 10px 10px;
    border: 0px solid #000000;">
  <div class="card">
    <div class="card__img">
      <img class="foto" src="https://source.unsplash.com/user/daniel_von_appen/500x400" alt="">
    </div>
    <p class="card__header">Lorem ipsum dolor sit amet</p>
    <p class="card__description">Obcaecati fuga suscipit minima veniam, voluptatum quibusdam quam alias perferendis dolores ipsum?</p>
  </div>
</div>
<Footer></Footer>

</div>
 
  
</template>

<script>
import Vue from 'vue'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
export default Vue.extend ({
    name : 'Defence',
    components : {
        Navbar,
        Footer

    }

})
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Merriweather|Playfair+Display+SC:900");
:root {
  --card-size: 270px;
  --card-width: calc(100vw - var(--grid-gap) * 2);
  --card-height: calc(var(--card-width) * 0.6);
  --grid-gap: 3.5rem;
}
.container {
  min-height: 100%;
  max-width: 1600px;
  margin: auto;
  padding: var(--grid-gap);
  display: grid;
  -webkit-box-pack: center;
justify-content: center;
  grid-template-columns: 1fr;
  grid-column-gap: var(--grid-gap);
  grid-row-gap: calc(var(--grid-gap) - 0.3rem);
}

.card {
  text-align: center;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
           border-radius: 30px 30px 0px 0px;
-moz-border-radius: 30px 30px 0px 0px;
-webkit-border-radius: 30px 30px 0px 0px;
}
.card:hover {
  opacity: 0.75;
}
.card__img {
  width: var(--card-width);
  height: 70%;
}
.card__img img {
  height: 100%;
  width: 100%;
  display: block;
  -o-object-fit: cover;
  object-fit: cover;
  border-radius: 30px 30px 0px 0px;
-moz-border-radius: 30px 30px 0px 0px;
-webkit-border-radius: 30px 30px 0px 0px;
}
.card__header {
  margin: 0.7em 0 0.55em;
  font-family: Playfair Display SC, serif;
  font-size: 1.22rem;
  line-height: 1.13;
  font-weight: 900;
  letter-spacing: 0.05em;
}
.card__description {
  margin: 0;
  letter-spacing: 0.025em;
}

@media (min-width: 600px) {
  :root {
    --card-height: calc(var(--card-size) * 0.7);
    --card-width: var(--card-size);
  }

  .container {
    padding: var(--grid-gap);
    grid-template-columns: repeat(auto-fit, var(--card-width));
  }

  .container--space-evenly {
    --grid-column-gap: 3.5vw;
    width: 100%;
    max-width: 100%;
    padding-left: calc(var(--grid-column-gap) * 2) !important;
    padding-right: calc(var(--grid-column-gap) * 2) !important;
    -webkit-box-pack: space-evenly;
    justify-content: space-evenly;
    grid-column-gap: calc(var(--grid-column-gap) * 0.6);
  }

img {
    width: 100% !important;
    height: 550px !important;
}

img .foto {
  height: 10px;
}

}


</style>