export function idGenerator() {
    return Math.random().toString(32).slice(2)
}

export function getToken() {
    return localStorage.getItem('token');
}

export function setToken(token) {
    localStorage.setItem('token', token)

}

export function removeToken(){
    localStorage.removeItem('token');
}