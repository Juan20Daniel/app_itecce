const sections = {
    "BACHILLERATO GENERAL":{section:"BG", months:24, timesMonths:4, grade:6},
    "BACHILLERATO TÉCNICO EN SEGURIDAD PÚBLICA":{section:"BG", months:24, timesMonths:4, grade:6},
    "BACHILLERATO TÉCNICO EN COMERCIO EXTERIOR":{section:"BG", months:24, timesMonths:4, grade:6},
    "LICENCIATURA EN ADMINISTRACIÓN":{section:"LI", months:36, timesMonths:4, grade:9},
    "LICENCIATURA EN ADUANAS Y COMERCIO EXTERIOR":{section:"LI", months:48, timesMonths:4, grade:12},
    "LICENCIATURA EN DISEÑO GRÁFICO":{section:"LI", months:36, timesMonths:4, grade:9},
    "LICENCIATURA EN DERECHO":{section:"LI", months:36, timesMonths:4, grade:9},
    "LICENCIATURA EN NUTRICIÓN":{section:"LI", months:40, timesMonths:4, grade:10},
    "LICENCIATURA EN CONTABILIDAD":{section:"LI", months:36, timesMonths:4, grade:9},
    "LICENCIATURA EN CIENCIAS DE LA EDUCACIÓN":{section:"LI", months:40, timesMonths:4, grade:10},
    "LICENCIATURA EN INFORMÁTICA (UNAM)":{section:"LI", months:48, timesMonths:4, grade:12},
    "LICENCIATURA EN LENGUA INGLESA":{section:"LI", months:40, timesMonths:4, grade:10},
    "MAESTRÍA EN GESTIÓN OPERACIÓN ADUANERA":{section:"MA", months:24, timesMonths:6, grade:4},
    "MAESTRÍA EN DERECHO FAMILIAR":{section:"MA", months:24, timesMonths:4, grade:6},
    "MAESTRÍA EN FISCAL":{section:"MA", months:24, timesMonths:6, grade:4},
    "MAESTRÍA EN INVESTIGACIÓN EDUCATIVA":{section:"MA", months:24, timesMonths:6, grade:4}
}
const months = {
    "1":"ENE",
    "2":"FEB",
    "3":"MAR",
    "4":"ABR",
    "5":"MAY",
    "6":"JUN",
    "7":"JUL",
    "8":"AGO",
    "9":"SEP",
    "10":"OCT",
    "11":"NOV",
    "12":"DIC",
}
export function select(values, id) {
    const linkActive = values.map(value => value.id === id ? { ...value, active:true } : { ...value, active:false });
    return linkActive;
}
export function verifyCamps(values) {
    var campsNotFound = [];
    const correctsCamps = [
        "Apellido materno",
        "Apellido paterno",
        "Grupo",
        "Matrícula",
        "Nombre",
        "Nombre de usuario",
        "Sección"
    ];
    for(var i=0; i<=correctsCamps.length - 1; i++) {
        if(!values[0].hasOwnProperty(correctsCamps[i])) {
            campsNotFound = [...campsNotFound, correctsCamps[i]];
        }
    }
    return campsNotFound;
}
function filterforNames(camps, arr_clients, listSelected) {
    const { data } = arr_clients;
    if(!Array.isArray(data[listSelected])) return false;
    const result = data[listSelected].filter(value => {
        return value.name.replace(/ /g, '').includes(camps.searchName) &&
        value.firstname.replace(/ /g, '').includes(camps.searchFirstname) &&
        value.lastname.replace(/ /g, '').includes(camps.searchLastname)
    });
    return result;
}
function filterForIdOrUser(valueToSearch, camp, arr_clients, listSelected) {
    const { data } = arr_clients;
    if(!Array.isArray(data[listSelected])) return false;
    const result = data[listSelected].filter(value => value[camp].startsWith(valueToSearch));
    return result;
}
export function searchFor(selectSearch, valuesToSearch, clients, listSelected) {
    const {
        searchFirstname,
        searchId,
        searchLastname,
        searchName,
        searchUserName
    } = valuesToSearch;
    switch (selectSearch) {
        case "names":
            const resultForName = filterforNames({searchName,searchFirstname,searchLastname}, clients, listSelected);
            return resultForName;
        case "id":
            const resultForId = filterForIdOrUser(searchId, "registration", clients, listSelected);
            return resultForId
        case "user_name": 
            const resultForUser = filterForIdOrUser(searchUserName, "user_algeb", clients, listSelected);
            return resultForUser;
        default:
            console.log("no es una opción")
            break;
    }
}
export function checkCamps(camps) {
    const result = Object.values(camps).filter(value => value !== '');
    return result.length > 0 ? true : false;
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
function calcTimeToStudy(grade, seccion) {
    const timeStudied = grade * sections[seccion].timesMonths;
    const timetoStudy = sections[seccion].months - timeStudied;
    return timetoStudy;
}
function getPeriod(date) {
    const month = date.getMonth() + 1;
    if(month === 1 || month === 2 || month === 3 || month === 4) return 4;
    if(month === 5 || month === 6 || month === 7 || month === 8) return 8;
    if(month === 9 || month === 10 || month === 11 || month === 12) return 0;
    
}
function getExpireYear(expireMonth, date) {
    let expireYear = 0;
    if(expireMonth === "AGO" && (getPeriod(date) === 4 || getPeriod(date) === 8)) expireYear = date.getFullYear();
    if(expireMonth === "AGO" && getPeriod(date) === 0) expireYear = date.getFullYear() + 1;
    if(expireMonth === "DIC") expireYear = date.getFullYear();
    const comberResult = expireYear.toString();
    return comberResult[2]+comberResult[3];
}
export function getdataExpire(data) {
    const {group_studen, typeClient, seccion} = data;
    if(typeClient !== "student") return "DIC/23";
    if(sections[data.seccion].section === "MA") return "N/P";
    const date = new Date();
    const grade = group_studen.replace(/\D/g,'');
    if(calcTimeToStudy(grade, seccion) >= 12) {
        const yearExpire = date.getFullYear() + 1;
        const monthExpire = date.getMonth() + 1;
        return yearExpire.toString()[2]+yearExpire.toString()[3]+"/"+months[monthExpire.toString()];
    }
    const periodToStudy = sections[seccion].grade - parseInt(grade);
    const expireMonthId = getPeriod(date) + sections[seccion].timesMonths * periodToStudy;
    const calendarMonth = months[expireMonthId.toString()];
    return calendarMonth+"/"+getExpireYear(calendarMonth, date);
}