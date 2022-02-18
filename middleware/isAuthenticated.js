export default function ({ store, redirect }) {
    return; // remove when finish auth todo
    // If the user is not authenticated
    if (!store.getters['auth/isAuthenticated']) {
      return redirect('/account/login')
    }
  }