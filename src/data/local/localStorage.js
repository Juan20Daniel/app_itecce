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

export const saveSectionLocalStorage = (section) => {
    localStorage.setItem('section', section);
}

export const getSectionLocalStorage = () => {
    const section = localStorage.getItem('section');
    return section;
}