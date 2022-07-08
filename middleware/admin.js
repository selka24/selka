export default async ({ store, redirect }) => {
    if (!store.getters["store/isAdmin"]) {
        return redirect('/')
    }
}
