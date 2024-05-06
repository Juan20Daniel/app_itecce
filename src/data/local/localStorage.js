export const saveTokenLocalStorage = (token) => {
    localStorage.setItem('token', token);
}

export const getTokenLocalStorage = () => {
    const token = localStorage.getItem('token');
    if(!token) return false;
    return token;
}

export const removeTokenLocalStorage = () => {
    localStorage.removeItem('token');
}