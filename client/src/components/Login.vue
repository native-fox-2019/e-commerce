<template>
    <div>
			<b-modal
			id="modal-login"
			ref="modal-login"
			title="Login"
			@show="resetModal"
			@hidden="resetModal"
			@ok="handleOk"
			ok-title="Login"
			ok-only
			>
				<form ref="form" @submit.stop.prevent="createData">
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
					invalid-feedback="Username is required"
					>
						<b-form-input
							id="password-input"
							v-model="password"
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
				email: null,
				password: null,
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
			this.email = '',
			this.password = ''
            this.addState = null;
        },

        handleOk(bvModalEvt) {

            bvModalEvt.preventDefault();
        
            this.loginUser();
        },

        loginUser() {

            if (!this.checkFormValidity()) {
                return;
            }
						
            axios({
                method: 'post',
                url: `${this.$store.state.url}/users/login`,
                data: {
					email: this.email,
					password: this.password
                }
            })
                .then(res=>{ 
					localStorage.setItem('token', res.data.access_token)
                    this.$store.dispatch('loginState');
                })
                .catch(err=>{
					Swal.fire({
						icon: 'error',
						title: 'Error',
						text: err.response.data.message
					})
                })

        
            this.$nextTick(() => {
                this.$bvModal.hide('modal-login')
            })
        }
		}
}
</script>