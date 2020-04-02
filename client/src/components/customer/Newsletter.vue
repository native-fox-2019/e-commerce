<template>
  <div id="news">
    <div id="miniSLide">
      <div id="mini" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner" style="height:250px">
          <div class="carousel-item active">
            <img
              src="https://scstylecaster.files.wordpress.com/2019/09/2020-fashion-trends-feature.jpg"
              class="d-block w-100"
              alt
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/spring-summer-trends-1578930915.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*"
              class="d-block w-100"
              alt
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F190912152727-uglyleaddd.jpg"
              class="d-block w-100"
              alt
            />
          </div>
        </div>
        <a class="carousel-control-prev" href="#mini" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#mini" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
    <div id="formNewsLetter">
      <div class="newsLetterNform">
        <div id="letter">
          <h5>NEWSLETTER</h5>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </div>
      <div class="newsLetterNform">
        <form>
          <input type="email" placeholder="your email here ...." />
        </form>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#707070"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-send"
        >
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsLetter"
};
</script>

<style>
#news {
  display: flex;
  height: 250px;
}
#miniSLide {
  width: 50%;
}
#formNewsLetter {
  width: 50%;

  display: flex;
  align-items: center;
}
#letter {
  display: flex;
  flex-direction: column;
}
.newsLetterNform {
  display: flex;
  /* justify-content: space-between; */
  padding: 1em;

  width: 50%;
}
.newsLetterNform input {
  outline: none;
  font-size: 12px;
  width: 200px;
  border: none;
  border-bottom: 1px solid #707070;
}
</style>