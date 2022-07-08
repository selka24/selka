export const state = () => ({
    userInfo: null
})

export const getters = {
    isAdmin(state){
        return state.userInfo ? state.userInfo.admin : false;
    }
}

export const mutations = {
    mutState(state, {key, value}){
        state[key] = value;
    },
    mutUserData(state, data){
        state.userInfo.user_data = data;
    }
}

export const actions = {
    async actGetUserInfo({commit}){
        const {data, error} = await this.$supabase
            .from('profiles')
            .select('*')
            .eq('id', this.$supabase.auth.user().id);

        if(data) commit('mutState', {key: 'userInfo', value: data[0]});
    }
}
