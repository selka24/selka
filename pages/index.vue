<template>
    <div class="container rounded bg-white mt-5 mb-5">
        <div class="row">
            <div class="col-md-3 border-right">
                <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                    <img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg">
                    <span class="font-weight-bold">{{userInfo.firstName}}</span>
                    <span class="text-black-50">{{ userInfo.email }}</span>
                    <span>
                    </span>
                </div>
            </div>
            <div class="col-md-8 border-right">
                <div class="p-3 py-5">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h4 class="text-right">Profile Settings</h4>
                    </div>
                    <div class="row mt-2">
                        <div class="col-md-6">
                            <label style="font-weight: 600;">Name *</label>
                            <input type="text" class="form-control" placeholder="First name" v-model="userInfo.firstName"></div>
                        <div class="col-md-6"><label style="font-weight: 600;">Surname</label><input type="text" class="form-control" v-model="userInfo.lastName" placeholder="Last name"></div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-12"><label style="font-weight: 600;">Phone *</label><input type="text" class="form-control" placeholder="enter phone number" v-model="userInfo.phone"></div>
                        <div class="col-md-7 mt-3"><label style="font-weight: 600;">Address *</label><input type="text" class="form-control" placeholder="enter address line 1" v-model="userInfo.address"></div>
                        <div class="col-md-2 mt-3"><label style="font-weight: 600;">Street number *</label><input type="text" class="form-control" placeholder="enter address line 1" v-model="userInfo.streetNumber"></div>
                        <div class="col-md-3 mt-3"><label style="font-weight: 600;">POSTAL CODE *</label><input type="text" class="form-control" placeholder="enter address line 1" v-model="userInfo.postCode"></div>
                        <address-picker class="mt-3" v-if="userInfo.countryInfo" :country-info="userInfo.countryInfo"/>
                        <birthday-picker v-if="userInfo.birthday" :birthday="userInfo.birthday"/>
                    </div>
                    <div class="row mt-3">
                        <gender-picker v-model="userInfo.gender"/>
                        <div class="col-md-8"><label style="font-weight: 600;">Fiscal code *</label><input type="text" class="form-control" placeholder="Fiscal code" v-model="userInfo.fiscalCode"></div>
                    </div>
                    <div class="mt-5 text-center"><button class="btn custom-login-button" type="button" @click="saveProfile">Save Profile</button></div>
                </div>
                {{disableSave}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    middleware: 'authenticated',
    data(){
        return {
            userInfo: {}
        }
    },
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
        saveProfile(){

        }
    },
    computed:{
        disableSave(){
            for(let key in this.userInfo){
                if(typeof this.userInfo[key] === 'object'){
                    for(let subKey in this.userInfo[key]){
                        if(!this.userInfo[key][subKey]){
                            console.log(this.userInfo[key][subKey], 'if disable')
                            return true;
                        }
                    }
                } else {
                    if(!this.userInfo[key]) {
                        console.log(this.userInfo[key], 'else disable')
                        return true;
                    }
                }
            }
            return false;
        },
        flatUserInfo(){
            const loggedUser = this.$supabase.auth.user();
            return {
                id: loggedUser.id,
                email: loggedUser.email,
                ...loggedUser.user_metadata
            }
        }
    },
    async mounted() {
        this.userInfo =  this.flatUserInfo;
        // const {data} = await this.$supabase
        //     .from('profiles')
        //     .select('*')
        // console.log(data, 'dataaaa')
    }
}
</script>
