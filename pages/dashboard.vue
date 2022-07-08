<template>
    <div>
        <b-table v-show="!editingUser" striped hover :items="flatUsers" :fields="fields">
            <template #cell(birthday)="data">
                {{ callCalculateAge(data.value) }}
            </template>
            <template #cell(dispAdd)="data">
                {{getAddress(data)}}
            </template>
            <template #cell(actions)="data">
                <button @click="editUser(data.item)" class="btn custom-login-button compactBtn">Edit</button>
                <button v-if="userInfo.id !== data.item.id" class="btn custom-login-button compactBtn" @click="deleteUser(data.item.id, data.index)">Delete</button>
            </template>
        </b-table>
        <div v-if="editingUser">
            <profile :edit-user="editingUser" @cancel-edit="editingUser = null"/>
        </div>
    </div>
</template>

<script>

import {calculateAge} from "@/js/helpers";
import {mapState} from "vuex";

export default {
    middleware: ['authenticated', 'admin'],
    name: "dashboard",
    data(){
        return {
            editingUser: null,
            supabase_url: "https://elgnbuqtuzilfphmysru.supabase.co",
            supabase_key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsZ25idXF0dXppbGZwaG15c3J1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY0NTI3ODcwNywiZXhwIjoxOTYwODU0NzA3fQ.HaRjrHMewJqi54DfjFY6CfqR_tqSR3vgWVzOBmrM8rE',
            users: [],
            fields:[
                {key: 'firstName', label: 'Name'},
                {key: 'lastName', label: 'Surname'},
                'email',
                {key: 'birthday', label: 'Age'},
                'gender',
                {key: 'dispAdd', label: 'Address'},
                'fiscalCode',
                'actions'
            ]
        }
    },
    computed:{
        ...mapState({
            userInfo: state => state.store.userInfo
        }),
        flatUsers(){
            if(this.users.length){
                return this.users.map(x => {
                    return {...x.user_data, id: x.id, email: x.email}
                });
            }
            return [];
        }
    },
    methods:{
        editUser(user){
            this.editingUser = user;
        },
        async deleteUser(id, idx){
            if(confirm('Are you sure you want to delete this user?')){
                const response = await this.$supabase
                    .from('profiles')
                    .delete()
                    .match({id})

                if(response.data){
                    const { data: user, error } = await this.$supabase.auth.api.deleteUser(
                        id
                    );
                }
                this.users.splice(idx, 1);
            }
        },
        getAddress({item}){
            const {city, province, country} = item.countryInfo;
            const {address, postCode, streetNumber} = item;
            console.log(item)
            return `${address} ${streetNumber}, ${postCode} ${city} ${province}, ${country}`
        },
        callCalculateAge(birthday){
            return calculateAge(birthday);
        },
        async getUsers(){
            const {data, error} = await this.$supabase
                .from('profiles')
                .select('*')

            this.users = data;
        }
    },
    created() {
        this.getUsers();
    }
}
</script>

<style scoped>

</style>
