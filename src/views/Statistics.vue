<style scoped>
.card {
  border-radius: 0;
  height: 75px;
}
.card-body {
  padding-top: 0rem;
  padding-bottom: 0rem;
}
p {
  margin-bottom: 0;
}
h1 {
  margin: 0;
}
.col {
  padding: 0;
}
</style>

<template>
  <div class="statistics">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="card text-white bg-dark mb-3">
            <div class="card-body">
              <p class="card-text">COVID-19 STATISTICS</p>
              <h1 class="card-title">GLOBAL</h1>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card text-white bg-dark mb-3">
            <div class="card-body">
              <p class="card-text">CONFIRMED</p>
              <h1 class="card-title">{{this.totalConfirm}}</h1>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card text-white bg-dark mb-3">
            <div class="card-body">
              <p class="card-text">DEATHS</p>
              <h1 class="card-title">{{this.totalDeath}}</h1>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card text-white bg-dark mb-3">
            <div class="card-body">
              <p class="card-text">UPDATE IN</p>
              <h1 class="card-title">{{this.time}}s</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Statistics",
    data() {
    return {
      totalConfirm: "", 
      totalDeath: "",
      time: 60,
    }
  },
  methods: {
    getDataCorona(){
      fetch(`https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?f=json&where=Confirmed%20%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Confirmed%20desc&outSR=102100&resultOffset=0&resultRecordCount=250&cacheHint=true`)
      .then(response => response.json())
      .then(data => {
        let totalConfirm = 0;
        let totalDeath = 0;
        for(const countryData of data.features){
          totalConfirm += countryData.attributes.Confirmed;
          totalDeath += countryData.attributes.Deaths;
        }
        this.totalConfirm = totalConfirm.toLocaleString();
        this.totalDeath = totalDeath.toLocaleString();
      })
    },
    getCountdown(){
      this.time--;
      if(this.time===0){
        this.time=60;
      }
    }
  },
  mounted() {
    this.getDataCorona();
    setInterval(()=>{
      this.getDataCorona();
    },60000)
    setInterval(()=>{
      this.getCountdown();
    },1000)
  },
};
</script>