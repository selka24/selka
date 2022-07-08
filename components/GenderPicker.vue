<template>
    <div class="col-md-4 formulate-input" style="padding-right: 12px">
        <label class="formulate-input-label formulate-input-label">Gender *</label>
        <v-select :options="genderOptions" :value="value" @input="genderSelected"/>
    </div>
</template>

<script>
import VSelect from "vue-select";
export default {
    name: "GenderPicker",
    components:{
        VSelect
    },
    data(){
        return {
            genderOptions: ['F.', 'M.'],
            gender: ''
        }
    },
    methods:{
        genderSelected(gender){
            console.log(gender, 'xhenedera')
            this.$emit('input', gender)
        }
    },
    props:['value']
}
</script>

<style scoped>

</style>
