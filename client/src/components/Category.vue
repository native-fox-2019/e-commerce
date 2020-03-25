<template>
  <div>
      <div class="container1 wrapper">
          <div class="row container1">
<div class="staff-photo-card col-3  my-4 text-center text-center">
  <div class="staff-photo-card-inner-div">
    <img style="height: 275px !important;" class="staff-photo" src="https://i.pinimg.com/originals/88/f0/8a/88f08a46f4b1cad53f9e9341ef049345.jpg" />
    <h3 class="name" style="margin-top:10px">Commercial</h3>
    <button type="button" class="btn btn-outline-info" @click="allCategory">See All List</button>
  </div>
</div>

<div class="staff-photo-card col-3 mt-2  my-4 text-center">
  <div class="staff-photo-card-inner-div">
    <img style="height: 275px !important;" class="staff-photo" src="https://www.claylacy.com/wp-content/uploads/2018/07/Gulfstream-GIV-Exterior-Sunset.jpg" />
    <h3 class="name" style="margin-top:10px">Privat Jet</h3>
    <button type="button" class="btn btn-outline-info" @click="allCategory">See All List</button>
  </div>
</div>
<div class="staff-photo-card col-3 mt-2  my-4 text-center">
  <div class="staff-photo-card-inner-div">
    <img style="height: 275px !important;" class="staff-photo" src="https://mediabites.com.pk/wp-content/uploads/2019/01/Heli-1.jpg" />
    <h3 class="name" style="margin-top:10px">Helicopter</h3>
    <button type="button" class="btn btn-outline-info" @click="allCategory">See All List</button>
  </div>
</div>
<div class="staff-photo-card col-3 mt-2  my-4 text-center">
  <div class="staff-photo-card-inner-div">
    <img style="height: 275px !important;" class="staff-photo" src="https://previews.123rf.com/images/chagpg/chagpg1705/chagpg170500152/78972417-jet-f16-fighter-on-aircraft-carrier-in-sea-ocean-war-and-weapon-concept-3d-rendering.jpg " />
    <h3 class="name" style="margin-top:10px">Defence</h3>
    <button type="button" class="btn btn-outline-info" @click="allCategory">See All List</button>
  </div>
</div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name : 'Category',

  methods : {
    allCategory() {
      this.$router.push({path : '/allCategory'})
    }
  }

}
</script>

<style>
.wrapper {
    height: 500px;
    margin-top: 50px;
    -webkit-box-shadow: 0px 5px 11px 3px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 5px 11px 3px rgba(0,0,0,0.75);
    box-shadow: 0px 5px 11px 3px rgba(0,0,0,0.75);
    border-radius: 86px 0px 152px 0px;
    -moz-border-radius: 86px 0px 152px 0px;
    -webkit-border-radius: 86px 0px 152px 0px;
    border: 0px double #000000;

}

.staff-photo{
    border-radius: 40px 40px 10px 10px;
    -moz-border-radius: 40px 40px 10px 10px;
    -webkit-border-radius: 40px 40px 10px 10px;
    border: 0px solid #000000;
    height: 30px;
}

</style>