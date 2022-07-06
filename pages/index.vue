<template>
    <div>
        <h1>You're authenticated!</h1>
        <button @click="signOut()">Sign Out</button>
    </div>
</template>

<script>
export default {
    middleware: 'authenticated',
    methods: {
        signOut() {
            this.$supabase.auth.signOut().then(({ error }) => {
                if (error) {
                    console.error(error)
                } else {
                    this.$router.push('/login')
                }
            })
        },
    },
}
</script>
