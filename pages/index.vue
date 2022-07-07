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
            <div class="col-md-7 border-right">
                {{userInfo}}
                <div class="p-3 py-5">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h4 class="text-right">Profile Settings</h4>
                    </div>
                    <div class="row mt-2">
                        <div class="col-md-6">
                            <label>Name</label>
                            <input type="text" class="form-control" placeholder="First name" v-model="userInfo.firstName"></div>
                        <div class="col-md-6"><label>Surname</label><input type="text" class="form-control" v-model="userInfo.lastName" placeholder="Last name"></div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-12"><label>Mobile Number</label><input type="text" class="form-control" placeholder="enter phone number" v-model="userInfo.phone"></div>
                        <div class="col-md-7 mt-3"><label>Address</label><input type="text" class="form-control" placeholder="enter address line 1" v-model="userInfo.address"></div>
                        <div class="col-md-2 mt-3"><label>Street number</label><input type="text" class="form-control" placeholder="enter address line 1" v-model="userInfo.streetNumber"></div>
                        <div class="col-md-3 mt-3"><label>POSTAL CODE</label><input type="text" class="form-control" placeholder="enter address line 1" v-model="userInfo.postCode"></div>
                        <address-picker class="mt-3" v-if="userInfo.countryInfo" :country-info="userInfo.countryInfo"/>
                        <birthday-picker v-if="userInfo.birthday" :birthday="userInfo.birthday"/>
                    </div>
                    <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button">Save Profile</button></div>
                </div>
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
    },
    computed:{
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
