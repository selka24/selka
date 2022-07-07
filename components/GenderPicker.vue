<template>
    <div class="col-md-4 formulate-input" style="padding-right: 12px">
        <div class="formulate-input-label formulate-input-label">Gender *</div>
        <v-select :options="genderOptions" v-model="gender"/>
    </div>
</template>

<script>
export default {
    name: "GenderPicker",
    data(){
        return {
            genderOptions: ['F.', 'M.'],
            gender: ''
        }
    },
    computed
}
</script>

<style scoped>

</style>
