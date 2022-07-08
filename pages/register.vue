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
                    v-model="password"
                    label="New password"
                    type="password"
                    name="password"
                    validation="^required|min:8,length"/>
                <formulate-input
                    class="col-md-6"
                    v-model="confirmPassword"
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
                :disabled="disableRegister"
                @click="submit">
            Register
        </button>
        <spin-loader v-if="registeringUser"/>
        {{passwordNotValid}}
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
            fiscalCode: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            genderOptions: ['F.', 'M.'],
            accepted: false,
            birthday: null,
            registeringUser: false
        }
    },
    computed:{
        disableRegister(){
            if(this.passwordNotValid) return true;
            let checks = ['firstName', 'lastName', 'address', 'streetNumber', 'postCode', 'gender', 'fiscalCode', 'email', 'phone', 'password', 'confirmPassword', 'accepted', 'birthday', 'countryInfo']
            for(let info of checks){
                if(info === 'countryInfo' || info === 'birthday'){
                    for(let key in this[info]){
                        if(!key) return true
                        if(!this[info][key]){
                            return true;
                        }
                    }
                } else {
                    if(!this[info]){
                        return true
                    }
                }
            }
            return false;
        },
        passwordNotValid(){
            if(!this.password || !this.confirmPassword){
                return true;
            }
            return this.password !== this.confirmPassword;
        }
    },
    methods:{
        setBirthday(birthday){
            this.birthday = birthday;
        },
        setCountry(countryInfo){
            this.countryInfo = countryInfo;
        },
        async submit(){
            console.log('submit registered')
            this.registeringUser = true;
            const { user, session, error } = await this.$supabase.auth.signUp(
                {
                    email: this.email,
                    password: this.password,
                },
                {
                    data: {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        birthday: this.birthday,
                        address: this.address,
                        streetNumber: this.streetNumber,
                        postCode: this.postCode,
                        countryInfo: this.countryInfo,
                        gender: this.gender,
                        fiscalCode: this.fiscalCode,
                        phone: this.phone,
                    }
                }
            )
            if(error){
                alert(`Oops something went wrong! Please try again!${error}`)
            }
            this.registeringUser = false;
            alert('We have sent an email confirmation to the address provided! Please follow the email instructions to complete the registration. You can close this window.')
        }
    }
}
</script>

<style scoped>

</style>
