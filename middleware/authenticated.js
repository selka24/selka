export default async ({ $supabase, store, redirect }) => {
    if (!$supabase.auth.session()) {
        return redirect('/login')
    } else {
        await store.dispatch('store/actGetUserInfo');
    }
}
