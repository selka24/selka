<template>
    <div class="row">
        <div class="col-md-4 formulate-input" style="padding-right: 12px">
            <div class="formulate-input-label formulate-input-label">Country *</div>
            <v-select :options="countries" v-model="selectedCountry"/>
        </div>
        <div class="col-md-4 formulate-input"  style="padding-right: 12px; padding-left: 12px">
            <div class="formulate-input-label formulate-input-label">Province *</div>
            <v-select :options="provinceItaly" v-model="selectedProvince"/>
        </div>
        <div class="col-md-4 formulate-input" style="padding-left: 12px">
            <div class="formulate-input-label formulate-input-label">City *</div>
            <v-select :options="currentCities" v-model="selectedCity"/>
        </div>
    </div>
</template>

<script>
import VSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
export default {
    name: "AddressPicker",
    components:{
        VSelect
    },
    data(){
        return {
            countries: ['Italy'],
            provinceItaly: ['Milan', 'Rome', 'Venice'],
            cities: {
                Milan: ['Arluno', 'Cusano Milanino'],
                Rome: ['Affile', 'Agosta', 'Anzio', 'Roman Arcinazzo'],
                Venice: ['Annone Veneto', 'Caorle', 'Cavarzere']
            },
            selectedCountry: 'Italy',
            selectedProvince: '',
            selectedCity: '',
        }
    },
    watch:{
        selectedProvince(){
            this.selectedCity = '';
        }
    },
    computed:{
        currentCities(){
            if(this.selectedProvince){
                return this.cities[this.selectedProvince];
            }
            return [];
        }
    },
    updated() {
        this.$emit('address-changed', {
            country: this.selectedCountry,
            province: this.selectedProvince,
            city: this.selectedCity
        })
    }
}
</script>
