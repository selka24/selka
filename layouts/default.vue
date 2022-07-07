<template>
    <div>
        <header class="header-fixed">
            <div class="header-limiter">
                <nuxt-link to="/">
                    <img src="https://www.deghi.it/_nuxt/img/deghi_logo.2deb641.svg" style="width: 150px">
                </nuxt-link>
            </div>
        </header>
        <div class="page-content mt-5 pb-2 mb-10">
            <Nuxt />
        </div>
    </div>
</template>

<script>
export default {
    name: "default",
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
