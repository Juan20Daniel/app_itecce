export function recordText(text, widthWindow) {
    if(text === '') return '';
    if(widthWindow >= 399 || text.length <= 20) return text;
    var record = '';
    for(let i=0; i<=17; i++) {
        record=record + text[i];
    }
    const result = record.concat('...');
    return result;
}