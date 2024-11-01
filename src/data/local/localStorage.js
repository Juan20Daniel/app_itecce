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

export const saveOptionsLocalStorage = (sections) => {
    localStorage.setItem('section', JSON.stringify(sections));
}

export const getOptionsLocalStorage = () => {
    const result = localStorage.getItem('section');
    if(!result) return null;
    return JSON.parse(result);
}