<template>
    <Nuxt />
</template>

<script>
export default {
    middleware: ['isAuthenticated'],
    name: "default"
}
</script>

<style scoped>

</style>
