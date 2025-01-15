import { typeSections } from "./utils";
const normalizeText = (arrayCamps) => {
    const convertText = JSON.stringify(arrayCamps);
    const debugText = convertText.replace(/[^a-zA-Z,óí ]/g, '');
    const textNormalized = debugText.split(',').join(', ');
    return textNormalized;
}
export function verifyCamps(values, typeList) {
    var campsNotFound = [];
    const correctsCamps = typeSections[typeList];
    for(var i=0; i<=correctsCamps.length - 1; i++) {
        if(!values[0].hasOwnProperty(correctsCamps[i])) {
            campsNotFound = [...campsNotFound, correctsCamps[i]];
        }
    }
    return campsNotFound.length ? normalizeText(campsNotFound) : false;
}