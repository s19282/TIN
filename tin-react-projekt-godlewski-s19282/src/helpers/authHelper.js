export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
}

export function isAuthenticated() {
    const user = getCurrentUser()
    // if (user) {
    //     return true
    // }
    // return false
    //TODO: remove if it will work
    return !!user;
}

