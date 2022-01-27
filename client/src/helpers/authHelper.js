export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'))
}

export function isAuthenticated() {
    const user = getCurrentUser()
    if (user) {
        return true
    }
    return false
}

export function getUserName() {
    const user = getCurrentUser()
    return user.name
}