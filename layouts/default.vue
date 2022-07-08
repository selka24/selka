<template>
    <div>
        <header class="header-fixed d-flex gap-3">
            <div class="header-limiter">
<!--                <nuxt-link to="/">-->
<!--                    <img src="https://www.deghi.it/_nuxt/img/deghi_logo.2deb641.svg" style="width: 150px">-->
<!--                </nuxt-link>-->
            </div>
            <div class="m-l-auto">
                <nuxt-link to="/dashboard">
                    <i class="fa-solid fa-table-columns" style="cursor: pointer; color: black; font-size: 21px;"></i>
                </nuxt-link>
                <b-dropdown v-if="userInfo" right :text="userInfo.user_data.firstName">
                    <b-dropdown-item @click="signOut">Sign Out</b-dropdown-item>
                </b-dropdown>
            </div>
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
import {mapMutations, mapState} from "vuex";

export default {
    name: "default",
    computed:{
        ...mapState({
            userInfo: state => state.store.userInfo
        })
    },
    methods:{
        ...mapMutations({
            mutState: 'store/mutState'
        }),
        signOut() {
            this.$supabase.auth.signOut().then(({ error }) => {
                if (error) {
                    console.error(error)
                } else {
                    this.mutState({key: 'userInfo', value: null})
                    this.$router.push('/login')
                }
            })
        },
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
