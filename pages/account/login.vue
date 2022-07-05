<template>
    <div style="display: flex; justify-content: center; width: 100%;">

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