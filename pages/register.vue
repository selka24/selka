<template>
    <div class="col-md-6 col-sm-12" style="margin-right: auto;padding: 40px;">

        <h1 class="mb-4 colorBlack">Registration</h1>
        <h2 class="register-header">Billing information</h2>
        <div class="row">
            <formulate-input v-model="firstName" class="col-md-6" type="text" validation="required" label="First name *"/>
            <formulate-input v-model="lastName" class="col-md-6" type="text" validation="required" label="Last name *"/>
            <formulate-input v-model="address" class="col-md-6" type="text" validation="required" label="Address *"/>
            <formulate-input v-model="streetNumber" class="col-md-3" type="text" validation="required" label="Street number *"/>
            <formulate-input v-model="postCode" class="col-md-3" type="text" validation="required" label="POSTAL CODE *"/>
            <address-picker @address-changed="setCountry"/>
            <birthday-picker @birthday-changed="setBirthday"/>
            <div class="col-md-4 formulate-input" style="padding-right: 12px">
                <div class="formulate-input-label formulate-input-label">Gender *</div>
                <v-select :options="genderOptions" v-model="gender"/>
            </div>
            <formulate-input v-model="fiscalCode" class="col-md-8" type="text" validation="required" label="Fiscal Code *"/>
        </div>
        <h2 class="register-header">Account</h2>
        <formulate-form>
            <div class="row">
                <formulate-input label="Email *"
                                 class="col-md-6"
                                 type="email"
                                 validation="required|email"
                                 error-behavior="live"
                                 v-model="email"/>
                <formulate-input label="Phone *"
                                 class="col-md-6"
                                 type="text"
                                 validation="required"
                                 error-behavior="live"
                                 v-model="phone"/>
                <formulate-input
                    class="col-md-6"
                    label="New password"
                    type="password"
                    name="password"
                    validation="^required|min:8,length"/>
                <formulate-input
                    class="col-md-6"
                    label="Confirm password"
                    type="password"
                    name="password_confirm"
                    validation="^required|min:8,length|confirm"
                    validation-name="Password confirmation"/>
            </div>
            <formulate-input
                type="checkbox"
                label="I agree to the processing of data *"
                name="terms"
                v-model="accepted"
                validation="accepted"
            />
        </formulate-form>
        <p class="mt-5">
            * Required fields
        </p>
        <button type="button"
                class="btn custom-login-button"
                @click="submit">
            Register
        </button>
    </div>
</template>

<script>
import VSelect from "vue-select";
export default {
    name: "register",
    components:{
        VSelect
    },
    data(){
        return {
            firstName: '',
            lastName: '',
            address: '',
            streetNumber: '',
            postCode: '',
            countryInfo: null,
            gender: '',
            fiscalCode: '',  email: '',
            phone: '',
            password: '',
            genderOptions: ['F.', 'M.'],
            accepted: false,
            birthday: null,
        }
    },
    methods:{
        setBirthday(birthday){
            this.birthday = birthday;
        },
        setCountry(countryInfo){
            this.countryInfo = countryInfo;
        },
        submit(){
            console.log('submit registered')
        }
    }
}
</script>

<style scoped>

</style>
