const setAccessToken = (token) => {
    localStorage.setItem("access_token", token)
}

const setRefreshToken = (token) => {
    localStorage.setItem("refresh_token", token)
}

const getAccessToken = () => {
    return localStorage.getItem("access_token")
}

const getRefreshToken = () => {
    return localStorage.getItem("refresh_token")
}

const removeToken = () => {
    localStorage.clear();
}

export {
    setAccessToken,
    setRefreshToken,
    getAccessToken,
    getRefreshToken,
    removeToken,
}