export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
}

export function isAuthenticated()
{
    const user = getCurrentUser()
    return !!user;
}

export function isAdmin()
{
    const user = getCurrentUser()
    if(!user)
        return false
    return user.roleId === 1;
}

