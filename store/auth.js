import { supabase } from "../js/client";

export const state = () => ({
    user: null,
    authFailed: null
})

export const getters = {
    getStateByKey(state){
        return (key) => {
            return state[key];
        }
    },
    isAuthenticated(state){
        return (state.user !== null );
    }
}

export const mutations = {
    mutSetState(state, {key, value}){
        state[key] = value;
    }
}

export const actions = {
    async actLogin({commit}, {email, password}){
        console.log('loggin user in', email, password);
        const { user, session, error } = await supabase.auth.signIn({
            email,
            password
        });
        console.log(user, session, error);
        if(error){
            commit('mutSetState', {key: 'authFailed', value: error});
        } else {
            commit('mutSetState', {key: 'user', value: user});
            this.$router.push('/')
        }
    },
    async actCreateBucket(){
        const { data, error } = await supabase
        .storage
        .createBucket('new-avatars', { public: true })
       
      console.log(data, error, 'creating bucket');
    },
    async actGetBucket(){
        const { data, error } = await supabase
        .storage
        .listBuckets()
        // .getBucket('avatars')
      console.log(data, error, 'getting bucket');
    }
}