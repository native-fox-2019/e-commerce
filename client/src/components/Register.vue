<template>
	<div>
			<b-modal
			id="modal-register"
			ref="modal-register"
			title="Register"
			@show="resetModal"
			@hidden="resetModal"
			@ok="handleOk"
			ok-title="Register"
			ok-only
			>
				<form ref="form" @submit.stop.prevent="createData">
						<b-form-group
						:state="addState"
						label="Username"
						label-for="username-input"
						invalid-feedback="Username is required"
						>
							<b-form-input
								id="username-input"
								v-model="username"
								:state="addState"
								required
							></b-form-input>
						</b-form-group>
						
						<b-form-group
						:state="addState"
						label="Email"
						label-for="email-input"
						invalid-feedback="Email is required"
						>
							<b-form-input
								id="email-input"
								v-model="email"
								:state="addState"
								required
							></b-form-input>
						</b-form-group>

						<b-form-group
						:state="addState"
						label="Password"
						label-for="password-input"
						invalid-feedback="Password is required"
						>
							<b-form-input
								id="password-input"
								v-model="password"
								:state="addState"
								type="password"
								required
							></b-form-input>
						</b-form-group>

						<b-form-group
						:state="addState"
						label="Confirm Password"
						label-for="confirmPass-input"
						invalid-feedback="Password is required"
						>
							<b-form-input
								id="confirmPass-input"
								v-model="confirmPass"
								:state="addState"
								type="password"
								required
							></b-form-input>
						</b-form-group>
				</form>
			</b-modal>
	</div>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
	data(){
		return {
			username: null,
			email: null,
			password: null,
			confirmPass: null,
			addState: null
		}
	},

    methods: {
			checkFormValidity() {
            const valid = this.$refs.form.checkValidity();
            this.addState = valid;
            return valid;
        },

        resetModal() {
            this.username = ''
            this.email = '',
            this.password = ''
            this.addState = null;
        },

        handleOk(bvModalEvt) {

            bvModalEvt.preventDefault();
        
            this.registerUser();
        },

        registerUser() {

            if (!this.checkFormValidity()) {
                return;
            }
			
			if(this.confirmPass === this.password){
				axios({
						method: 'post',
						url: `${this.$store.state.url}/users/register`,
						data: {
								email: this.email,
								password: this.password,
								username: this.username
						}
				})
						.then(res=>{ 
								localStorage.setItem('token', res.data.access_token)
								this.$store.dispatch('loginState');
						})
						.catch(err=>{
								console.log(err);
						})
			}else{
				Swal.fire({
					icon: 'error',
					title: 'Error',
					text: 'Password and Confirm Password have to be match'
				})
			}

        
            this.$nextTick(() => {
                this.$bvModal.hide('modal-register')
            })
        }
		}
}
</script>