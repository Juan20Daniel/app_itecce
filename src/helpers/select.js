export function select(values, id) {
    const linkActive = values.map(value => value.id === id ? { ...value, active:true } : { ...value, active:false });
    return linkActive;
}