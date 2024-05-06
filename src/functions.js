import * as XLSX from 'xlsx';

const typeSections = {
    students:[
        "Matrícula",
        "Nombre",
        "Apellido paterno",
        "Apellido materno",
        "Sección",
        "Grupo",
    ],
    teachers: [
        "Matrícula",
        "Nombre",
        "Apellido paterno",
        "Apellido materno",
    ],
    collaborators: [
        "Matrícula",
        "Nombre",
        "Apellido paterno",
        "Apellido materno",
    ]
}
export function select(values, id) {
    const linkActive = values.map(value => value.id === id ? { ...value, active:true } : { ...value, active:false });
    return linkActive;
}
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
export function addProperty(array) {
    if(!Array.isArray(array)) return array;
    const newArray = array.map(object => {
        return {
            ...object,
            isSelect:false
        }
    });
    return newArray;
}
export function updateProperty(array, id, select) {
    if(!Array.isArray(array)) return array;
    var newArray = array;
    for(let i=0; i<=array.length - 1; i++) {
        if(array[i].idClient === id) {
            newArray[i] = { ...newArray[i], isSelect:select }
        }
    }
    return newArray;
}


export function transformExcel(excel) {
    const workbook = XLSX.read(excel,{type:"buffer"});
    const workSheetName = workbook.SheetNames[0];
    const workSheet = workbook.Sheets[workSheetName];
    const data = XLSX.utils.sheet_to_json(workSheet);
    return data;
}
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

export function addTempAvatar(array_values) {
    const colorAvatars = ['#1A66AC','#AC721A','#5C7185','#323B44','#2A2889','#751B1B'];
    const result = array_values.map(item => {
        return {
            ...item,
            avatar:colorAvatars[Math.floor(Math.random() * 6)]
        }
    });
    return result;
}
export const downloadExcel = (section, data, nameFile) => {
    console.log(data);
    let result = data.map(item => [
        item['Matrícula'],
        item['Nombre'],
        item['Apellido paterno'],
        item['Apellido materno'],
        item.hasOwnProperty('Sección') ? item['Sección'] : '',
        item.hasOwnProperty('Sección') ? item['Grupo'] : '',
    ]);
    result.unshift(typeSections[section]);
    let workbook = {'Sheet1':XLSX.utils.aoa_to_sheet(result)};
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, workbook['Sheet1'], 'Sheet1');
    XLSX.writeFile(wb, nameFile+'.xlsx');
}
//123Tamarindo-



// const sections = {
    //     "BACHILLERATO GENERAL":{section:"BG", months:24, timesMonths:4, grade:6},
    //     "BACHILLERATO TÉCNICO EN SEGURIDAD PÚBLICA":{section:"BG", months:24, timesMonths:4, grade:6},
    //     "BACHILLERATO TÉCNICO EN COMERCIO EXTERIOR":{section:"BG", months:24, timesMonths:4, grade:6},
    //     "LICENCIATURA EN ADMINISTRACIÓN":{section:"LI", months:36, timesMonths:4, grade:9},
    //     "LICENCIATURA EN ADUANAS Y COMERCIO EXTERIOR":{section:"LI", months:48, timesMonths:4, grade:12},
    //     "LICENCIATURA EN DISEÑO GRÁFICO":{section:"LI", months:36, timesMonths:4, grade:9},
    //     "LICENCIATURA EN DERECHO":{section:"LI", months:36, timesMonths:4, grade:9},
    //     "LICENCIATURA EN NUTRICIÓN":{section:"LI", months:40, timesMonths:4, grade:10},
    //     "LICENCIATURA EN CONTABILIDAD":{section:"LI", months:36, timesMonths:4, grade:9},
    //     "LICENCIATURA EN CIENCIAS DE LA EDUCACIÓN":{section:"LI", months:40, timesMonths:4, grade:10},
    //     "LICENCIATURA EN INFORMÁTICA (UNAM)":{section:"LI", months:48, timesMonths:4, grade:12},
    //     "LICENCIATURA EN LENGUA INGLESA":{section:"LI", months:40, timesMonths:4, grade:10},
    //     "MAESTRÍA EN GESTIÓN OPERACIÓN ADUANERA":{section:"MA", months:24, timesMonths:6, grade:4},
    //     "MAESTRÍA EN DERECHO FAMILIAR":{section:"MA", months:24, timesMonths:4, grade:6},
    //     "MAESTRÍA EN FISCAL":{section:"MA", months:24, timesMonths:6, grade:4},
    //     "MAESTRÍA EN INVESTIGACIÓN EDUCATIVA":{section:"MA", months:24, timesMonths:6, grade:4}
    // }
    // const months = {
        //     "1":"ENE",
        //     "2":"FEB",
        //     "3":"MAR",
        //     "4":"ABR",
        //     "5":"MAY",
//     "6":"JUN",
//     "7":"JUL",
//     "8":"AGO",
//     "9":"SEP",
//     "10":"OCT",
//     "11":"NOV",
//     "12":"DIC",
// }

// function calcTimeToStudy(grade, seccion) {
//     const timeStudied = grade * sections[seccion].timesMonths;
//     const timetoStudy = sections[seccion].months - timeStudied;
//     return timetoStudy;
// }
// function getPeriod(date) {
//     const month = date.getMonth() + 1;
//     if(month === 1 || month === 2 || month === 3 || month === 4) return 4;
//     if(month === 5 || month === 6 || month === 7 || month === 8) return 8;
//     if(month === 9 || month === 10 || month === 11 || month === 12) return 0;
    
// }
// function getExpireYear(expireMonth, date) {
//     let expireYear = 0;
//     if(expireMonth === "AGO" && (getPeriod(date) === 4 || getPeriod(date) === 8)) expireYear = date.getFullYear();
//     if(expireMonth === "AGO" && getPeriod(date) === 0) expireYear = date.getFullYear() + 1;
//     if(expireMonth === "DIC") expireYear = date.getFullYear();
//     const comberResult = expireYear.toString();
//     return comberResult[2]+comberResult[3];
// }
// export function getdataExpire(data) {
//     const {group_studen, typeClient, seccion} = data;
//     if(typeClient !== "student") return "DIC/23";
//     if(sections[data.seccion].section === "MA") return "N/P";
//     const date = new Date();
//     const grade = group_studen.replace(/\D/g,'');
//     if(calcTimeToStudy(grade, seccion) >= 12) {
//         const yearExpire = date.getFullYear() + 1;
//         const monthExpire = date.getMonth() + 1;
//         return yearExpire.toString()[2]+yearExpire.toString()[3]+"/"+months[monthExpire.toString()];
//     }
//     const periodToStudy = sections[seccion].grade - parseInt(grade);
//     const expireMonthId = getPeriod(date) + sections[seccion].timesMonths * periodToStudy;
//     const calendarMonth = months[expireMonthId.toString()];
//     return calendarMonth+"/"+getExpireYear(calendarMonth, date);
// }