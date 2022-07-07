<template>
    <div>
        <header class="header-fixed d-flex">
            <div class="header-limiter">
                <nuxt-link v-if="loggedUser" to="/">
                    <img src="https://www.deghi.it/_nuxt/img/deghi_logo.2deb641.svg" style="width: 150px">
                </nuxt-link>
            </div>
            <h5 style="color: black; margin-right: 10px">{{loggedUser.user_metadata.firstName}}</h5>
            <nuxt-link to="/">
                <i class="fa-regular fa-user" style="cursor: pointer; color: black; font-size: 21px;"></i>
            </nuxt-link>
        </header>
        <div class="page-content mt-5 pb-2 mb-10">
            <Nuxt />
        </div>
    </div>
</template>

<script>
export default {
    name: "default",
    computed:{
        loggedUser(){
            if(this.$supabase.auth.user()){
                return this.$supabase.auth.user()
            }
            return null;
        }
    },
    mounted() {
        let showHeaderAt = 80;
        let body = document.body;
        // Show the fixed header only on larger screen devices
            // When we scroll more than 150px down, we set the
            // "fixed" class on the body element.
        window.onscroll = (e) => {
            if(window.scrollY > showHeaderAt) {
                body.classList.add('fixed');
            } else {
                body.classList.remove('fixed');
            }
        };
    }
}
</script>

<style scoped>

</style>
