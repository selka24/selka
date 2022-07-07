<template>
    <div class="row">
        <div class="col-md-4 formulate-input" style="padding-right: 12px">
            <div class="formulate-input-label formulate-input-label">Year of birth *</div>
            <v-select :options="yearOptions" v-model="selectedYear"/>
        </div>
        <div class="col-md-4 formulate-input"  style="padding-right: 12px; padding-left: 12px">
            <div class="formulate-input-label formulate-input-label">Month of birth *</div>
            <v-select :options="months" v-model="selectedMonth"/>
        </div>
        <div class="col-md-4 formulate-input" style="padding-left: 12px">
            <div class="formulate-input-label formulate-input-label">Day of birth *</div>
            <v-select :options="numberOfDays" v-model="selectedDay"/>
        </div>
    </div>
</template>

<script>
import VSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
export default {
    name: "BirthdayPicker",
    components:{
        VSelect
    },
    data(){
        return {
            countries: ['Italy'],
            selectedYear: '',
            selectedMonth: '',
            selectedDay: '',
            minAge: 18,
            months: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ]
        }
    },
    watch:{

    },
    computed:{
        currentYear(){
            return new Date().getFullYear();
        },
        currMonthIdx(){
            return this.months.findIndex(m => m === this.selectedMonth)
        },
        yearOptions(){
            const length = (this.currentYear - (this.minAge - 1)) - 1920;
            return Array.from({length}, (_, i) => i + 1920).reverse();
        },
        numberOfDays(){
            if(this.selectedYear && this.currMonthIdx > -1){
                const length = new Date(this.selectedYear, (this.currMonthIdx + 1), 0).getDate();
                return Array.from({length}, (_, i) => i + 1);
            }
            return [];
        }
    },
    methods:{
        handleChanges(){
            this.$emit('birthday-changed', {year: this.selectedYear, month: this.selectedMonth, day: this.selectedDay})
        }
    },
    updated() {
        this.handleChanges();
    }
}
</script>

<style>
</style>
