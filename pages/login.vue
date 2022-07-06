<template>
    <div class="container ">
        <div class="row">
            <div class="col-md-7" style="margin: auto;">
                <div class="row" style="justify-content: center;">
                    <div class="col-lg-6 col-sm-10"><h5 class="text-center">
                        I am already registered</h5>
                        <p class="text-center">
                            To complete the order enter your email and password and then click on the "Login" button
                        </p>
                        <div class="login-cards">
                            <main class="main">
                                <div class="tab-content">
                                    <div id="signin" class="tab-pane active">
                                        <form @submit.prevent="submit()">
                                            <div class="form-group mb-3 d-flex flex-column">
                                                <div class=" d-flex mb-4">
                                                    <input v-model="email" type="text" id="singin-email"
                                                           name="singin-email" placeholder="Email *"
                                                           required="required"
                                                           class="form-control custom-login-input"></div>
                                                <span
                                                    class="floating-placeholder">Enter a valid email address.</span>
                                            </div>
                                            <div class="form-group d-flex flex-column">
                                                <div class=" d-flex mb-4">
                                                    <input  v-model="password" type="password" id="singin-password"
                                                    name="singin-password" placeholder="Password *"
                                                    required="required" class="form-control custom-login-input">
                                                </div>
                                                <span class="floating-placeholder"
                                                      style="top: 12rem;"></span></div>
                                            <button type="submit"
                                                    class="btn custom-login-button">
                                                Log in
                                            </button>
                                            <p class="forgot-password">
                                                Did you forget your password?
                                            </p></form> <!----></div>
                                </div>
                            </main>
                        </div>
                    </div>
                    <div class="col-lg-6 col-sm-10 ">
                        <h5 class="text-center">I
                            am a new customer</h5>
                        <p class="text-center">
                            If you are not yet registered on our site, select a customer type to register
                        </p>
                        <div class="login-cards">
                            <nuxt-link v-for="reg in registrations" to="/register" :key="reg">
                                <button class="custom-login-button btn">
                                    {{ reg }}
                                </button>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            registrations: [
                'private',
                'agency',
                'freelance',
                'association',
            ]
        }
    },
    methods: {
        submit() {
            this.$supabase.auth
                .signIn({
                    email: this.email,
                    password: this.password,
                })
                .then(({error, data}) => {
                    if (error) {
                        alert(error.message)
                    } else {
                        this.$router.push('/')
                    }
                })
        },
    },
}
</script>
<style>

</style>
