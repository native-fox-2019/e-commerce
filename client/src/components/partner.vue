<template>
  <div class="row text-left" >
    <div class="col-4" v-for="image in dataImages" :key="image.id">
      <div class="card mb-2">
        <img :src="image" alt="" style="width:100%; height:150px;" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            dataImages: [
                'https://lh3.googleusercontent.com/proxy/cI4zo0bcXVSmlTJdWXjjGijTHOVHODZ2NdVBdtMJdQ1wj5RWUexri63k81HznbABl5KQi3I_FeAnAqNbC6hUXK53-0v-k_wlEad7cs3UlBvCa-iottyk2QU',
                'https://upload.wikimedia.org/wikipedia/id/8/8a/OT_Logo.png',
                'https://www.pngarts.com/files/3/PlayStation-Logo-Free-PNG-Image.png',
                'https://lh3.googleusercontent.com/proxy/QzkMx8JwR0WkbVgnPloSlClPspRYEwlNlRKzHSIddr7ZXJq1SUBLPch6Ic2gPFcBzSD5_trX6DbHE1FAjBy3aT4DVwycGY6e6_r3RsT9XZwbQf4',
                'https://pngimage.net/wp-content/uploads/2018/06/logo-nestle-png-4.png',
                'https://www.vippng.com/png/detail/332-3329107_unilever-logo-photo-unilever-logo-png.png'
            ]
        }
    }
};
</script>

<style></style>
