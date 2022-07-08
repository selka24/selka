export default async ({ $supabase, store, redirect }) => {
    console.log($supabase.auth.session(), 'sesionii')
    if (!$supabase.auth.session()) {
        return redirect('/login')
    } else {
        await store.dispatch('store/actGetUserInfo');
    }
}
