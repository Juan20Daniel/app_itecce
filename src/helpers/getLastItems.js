export const getLastItems = (array_items, offset, range=11) => {
    let result = array_items.slice(offset, offset+range);
    return result;
}