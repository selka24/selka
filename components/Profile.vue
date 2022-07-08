<template>
    <div class="container rounded bg-white mt-5 mb-5">
        <div v-if="flatUserInfo" class="row">
            <div class="col-md-3 border-right">
                <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                    <img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg">
                    <span class="font-weight-bold">{{flatUserInfo.firstName}}</span>
                    <span class="text-black-50">{{ flatUserInfo.email }}</span>
                </div>
            </div>
            <div class="col-md-8 border-right">
                <div class="p-3 py-5">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h4 class="text-right">{{ editUser ? `You are editing user "${editUser.firstName} ${editUser.lastName}"` : 'Profile Settings' }}</h4>
                        <button v-if="editUser" class="btn custom-login-button compactBtn" type="button" @click="$emit('cancel-edit')">
                            Cancel
                        </button>
                    </div>
                    <div class="row mt-2">
                        <div class="col-md-6">
                            <label style="font-weight: 600;">Name *</label>
                            <input type="text" class="form-control" placeholder="First name" v-model="flatUserInfo.firstName"></div>
                        <div class="col-md-6"><label style="font-weight: 600;">Surname</label><input type="text" class="form-control" v-model="flatUserInfo.lastName" placeholder="Last name"></div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-12"><label style="font-weight: 600;">Phone *</label><input type="text" class="form-control" placeholder="enter phone number" v-model="flatUserInfo.phone"></div>
                        <div class="col-md-7 mt-3"><label style="font-weight: 600;">Address *</label><input type="text" class="form-control" placeholder="enter address line 1" v-model="flatUserInfo.address"></div>
                        <div class="col-md-2 mt-3"><label style="font-weight: 600;">House number *</label><input type="text" class="form-control" placeholder="enter address line 1" v-model="flatUserInfo.streetNumber"></div>
                        <div class="col-md-3 mt-3"><label style="font-weight: 600;">POSTAL CODE *</label><input type="text" class="form-control" placeholder="enter address line 1" v-model="flatUserInfo.postCode"></div>
                        <address-picker class="mt-3" v-if="flatUserInfo.countryInfo" @address-changed="setNewAddress" :country-info="flatUserInfo.countryInfo"/>
                        <birthday-picker v-if="flatUserInfo.birthday" @birthday-changed="setNewBirthday" :birthday="flatUserInfo.birthday"/>
                    </div>
                    <div class="row mt-3">
                        <gender-picker v-model="flatUserInfo.gender"/>
                        <div class="col-md-8"><label style="font-weight: 600;">Fiscal code *</label><input type="text" class="form-control" placeholder="Fiscal code" v-model="flatUserInfo.fiscalCode"></div>
                    </div>
                    <div class="mt-5 text-center">
                        <button :disabled="disableSave" class="btn custom-login-button" type="button" @click="saveProfile">
                            Save Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <spin-loader v-if="savingInfo"/>
    </div>
</template>

<script>
import {mapState, mapMutations} from "vuex";

export default {
    name: 'Profile',
    props:['editUser'],
    middleware: 'authenticated',
    data(){
        return {
            flatUserInfo: null,
            disableSave: false,
            savingInfo: false
        }
    },
    computed:{
        ...mapState({
            userInfo: state => state.store.userInfo
        })
    },
    methods: {
        ...mapMutations({
            mutUserData: 'store/mutUserData'
        }),
        setNewBirthday(birthday){
            this.flatUserInfo.birthday = birthday;
        },
        setNewAddress(countryInfo){
            this.flatUserInfo.countryInfo = countryInfo;
        },
        checkSaveDisable(){
            for(let key in this.flatUserInfo){
                if(key === 'countryInfo' || key === 'birthday'){
                    for(let subKey in this.flatUserInfo[key]){
                        if(!this.flatUserInfo[key][subKey]){
                            this.disableSave = true;
                            return;
                        }
                    }
                } else {
                    if(!this.flatUserInfo[key]) {
                        this.disableSave = true;
                        return;
                    }
                }
            }
            this.disableSave = false;
        },
        async getUserProfile(){
            const currUser = this.editUser ? this.editUser : this.userInfo;
            console.log(currUser, 'currUser currUser')
            this.flatUserInfo = this.editUser ? this.editUser : {
                id: this.userInfo.id,
                email: this.userInfo.email,
                ...this.userInfo.user_data
            }
        },
        async saveProfile(){
            this.savingInfo = true;
            const {error} = await this.$supabase
                .from('profiles')
                .update({user_data: this.flatUserInfo})
                .eq('id', this.flatUserInfo.id)

            this.mutUserData(this.flatUserInfo);
            if(error){
                alert('Oops something went wrong! Please try again! ' + error);
            }
            this.savingInfo = false;
        },
    },
    watch:{
        flatUserInfo: {
            handler(){
                this.checkSaveDisable();
            },
            deep: true
        }
    },
    created() {
        this.getUserProfile();
    }
}
</script>
