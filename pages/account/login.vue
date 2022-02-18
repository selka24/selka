<template>
    <div style="display: flex; justify-content: center; width: 100%;">
        <b-card class="mb-2" style="max-width: 30rem">
            <b-form @submit.stop.prevent="login">
                <b-form-group
                    id="email-group"
                    label="Email:"
                    label-for="email-user"
                >
                    <b-form-input v-model="email" :state="usernameValidation" id="email-user"></b-form-input>
                    <b-form-invalid-feedback :state="usernameValidation">
                        Your email must be 4-13 characters long.
                    </b-form-invalid-feedback>
                    <b-form-valid-feedback :state="usernameValidation">
                        Looks Good.
                    </b-form-valid-feedback>
                </b-form-group>
                <b-form-group
                    id="password-group"
                    label="Password:"
                    label-for="text-password"
                >
                    <b-form-input type="password" v-model="password" id="text-password" aria-describedby="password-help-block"></b-form-input>
                    <b-form-text id="password-help-block">
                        Your password must be 8-20 characters long, contain letters and numbers, and must not
                        contain spaces, special characters, or emoji.
                    </b-form-text>
                </b-form-group>
                <b-button type="submit" variant="primary">Submit</b-button>
            </b-form>
        </b-card>
    </div>
</template>
<script>
// import {BForm} from 'bootstrap-vue';
import { supabase } from "../../js/client";
import {mapActions, mapGetters} from 'vuex'

export default {
    layout: 'noAuth',
    data(){
        return {
            email: 'krisel_hysenaj@hotmail.com',
            password: '12345678'
        }
    },
    computed:{
        ...mapGetters({
            getStateByKey: 'auth/getStateByKey'
        }),
        usernameValidation(){
            return this.email.length > 0 && this.email.length < 30;
        }
    },
    methods:{
        ...mapActions({
            actLogin: 'auth/actLogin'
        }),
        async login(){
            this.actLogin({email: this.email, password: this.password});
            // console.log(this.email, this.password);
            // const { user, session, error } = await supabase.auth.signIn({
            //     email: this.email,
            //     password: this.password
            // });
            // if(error){

            // } else {

            // }
            // console.log(user, session, error, 'signing in');
        }
    }
}
</script>