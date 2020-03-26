<template>
  <div id="card_container" data-offset="2">
	<div class="pg">
		<img class="detai" :src="getOne.image_url" style="margin_right:40px">
	</div>
	<div id="card">
		<div class="shine"></div>
		<div class="text-block">
			<h1>{{getOne.name}}</h1>
			<h3>{{getOne.category}} || $ {{getOne.price}} M</h3>
			<p>
				{{getOne.description}}
			</p>
			
			<h3 class="mb-4" >stock : {{getOne.stock}} </h3>
		
			<router-link to="/allCategory"><button>Back</button></router-link>
			
			<button class="ml-3" @click="cart(getOne.id)">Add To Cart</button>
			
		</div>
	</div>
</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import url from '../../config/config'
export default Vue.extend ({
	name : 'Detail',
	mounted() {
		this.$store.dispatch('getOne', this.$route.params.id)
	},
	created() {
		this.$store.dispatch('getOne', this.$route.params.id)
	},
	computed : {
		getOne() {
			return this.$store.state.getOne
		}
	
	},
	methods : {
		cart(id) {
			axios({
				url : `${url}/transaction`,
		method : 'POST',
		
        headers : {
			token :  localStorage.getItem('token')
        },
        data : {
			ProductId : id,
			quantity : 1
        }
      })
      .then(({data}) => {
		this.$router.push({path : '/checkout'})
		  console.log(data)
      })
      .catch(({response}) => {
		  console.log(response)
	})
			
		}
	}

})
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Lato:400,300,700);
@import url(https://fonts.googleapis.com/css?family=Rubik:400,900);

.pg{
	margin-right: 20px;
	margin-bottom: 30px;
}

#card_container {
	width:700px;
	height:400px;
	position:absolute;
	top:50%;
	left:50%;
	margin:-175px 0 0 -350px;
}
#card {
	animation:backAn 50s infinite;
	color:#fff;
	padding:30px;
	width:100%;
	height:100%;
	position:absolute;
	z-index:1;
	background:url(https://cdn.imgbin.com/10/25/2/imgbin-aircraft-parts-accessories-airplane-aircraft-engine-automotive-engine-parts-xCy0D7s4byi0U8Sp7ZG7CQbFV.jpg) 100% bottom;
	/*background:url(http://riccardotartaglia.it/img/deadpool/back.jpg) 100% bottom;*/
	/*box-shadow:0px 45px 100px rgba(0, 0, 0, 0.4), inset 0 0 0 1000px rgba(156, 27, 27, 0.6);*/
	box-shadow:0px 45px 100px rgba(0, 0, 0, 0.4), inset 0 0 0 1000px rgba(0, 76, 86, 0.6);
}
#card .text-block {
	position:relative;
	z-index:2;
	text-shadow:0 3 10 rgba(0, 0, 0, 0.7);
}
#card .text-block h1 {
	font-family:'Rubik', Sans-serif;
	font-size:3em;
	margin:0;
	text-transform:uppercase;
	font-weight:700;
}
#card .text-block h1 small {
	font-size:.4em;
	color:#ccc;
	position:relative;
	bottom:10px;
}
#card .text-block h3 {
	margin:0;
	font-weight:700;
}
#card .text-block p {
	font-weight:300;
	width:60%;
}
#card .text-block button {
	transition:all 0.35s cubic-bezier(0.37, 0.26, 0.35, 1);
	border:4px solid #fff;
	padding:10px;
	background:transparent;
	font-family:'Rubik', Sans-serif;
	text-transform:uppercase;
	font-weight:700;
	cursor:pointer;
}
#card .text-block button:hover {
	background:#004c56;
}
#card_container .pg {
	position:absolute;
	height:500x;
	width:40%;
	right:-10px;
	bottom:0px;
	z-index:2;
}
#card_container .pg > img{
	height:450px;
}
.shine {
	position:absolute;
	top:0;
	left:0;
	right:0;
	bottom:0;
	background:linear-gradient(90deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 60%);
	z-index:1;
}
button {
	color:#fff;
}
@keyframes backAn {
	0% {
		background-size:100%;
	}
	50% {
		background-size:250%;
	}
	100% {
		background-size:100%;
	}
}
</style>