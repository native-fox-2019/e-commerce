<template>
  <div id="footer">
    <div class="footerPart" id="footer1">
      <h5>WearIsysm</h5>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus deleniti illum debitis aliquid, eum error</p>
    </div>
    <div class="footerPart" id="footer1">
      <h6>Menu :</h6>
      <P>
        Baju
        <br />Jaket
        <br />Celana
        <br />Sepatu
      </P>
    </div>
    <div class="footerPart" id="footer1">
      <h6>Help :</h6>
      <P>
        Contact :
        <br />+628534563738
        <br />Email :
        <br />WearIsysm@hello.com
      </P>
    </div>
    <div class="footerPart" id="footer1">
      <div id="followLine">
        <h6>Follow us :</h6>
      </div>
      <div id="socialMedia">
        <div class="icons">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#707070"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-instagram"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </div>
        <div class="icons">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#707070"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-facebook"
          >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </div>
        <div class="icons">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#707070"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-twitter"
          >
            <path
              d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
            />
          </svg>
        </div>
        <div class="icons">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#707070"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-twitch"
          >
            <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7" />
          </svg>
        </div>
      </div>
      <div>
        <small>&copy; Copyright {{currentYear}}, dimas</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      currentYear: new Date().getFullYear()
    };
  }
};
</script>

<style scoped>
#footer {
  height: 150px;
  margin-top: 2em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footerPart {
  display: flex;

  /* align-items: center; */
  flex-direction: column;
}
#footer1 {
  width: 150px;
  text-align: left;
}
#footer1 p {
  font-size: 12px;
}
#followLine {
  border-bottom: 2px solid #707070;
  margin-bottom: 1em;
}
#socialMedia {
  display: flex;
  justify-content: space-between;
}
.icons {
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icons:hover {
  background-color: #707070;
  stroke: #fff;
  cursor: pointer;
}
svg:hover {
  cursor: pointer;
  stroke: #fff;
}
</style>