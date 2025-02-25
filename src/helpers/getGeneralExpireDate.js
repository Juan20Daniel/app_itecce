const periods = [["ENE","FEB","MAR","ABR"],["MAY","JUN","JUL","AGO"],["SEP","OCT","NOV","DIC"]];
const months = periods.flat();
const date = new Date();

export const getGeneralExpireDate = () => {
    const date = new Date();
    const nextYear = date.getFullYear()+1;
    const getExpireYear = nextYear.toString().replace(/^[0-9]{2}/,'');
    return months[date.getMonth()]+'/'+getExpireYear;
}
const getMonth = () => {
    return months[date.getMonth()];
}
const getYear = () => {
    const nextYear = date.getFullYear();
    const getExpireYear = nextYear.toString().replace(/^[0-9]{2}/,'');
    return getExpireYear;
}
const getGrade = (groupStudent) => {
    return groupStudent.split(/\D/).shift();
}
const calcRemainingTime = (grade, careerDuration) => {
    return grade+2 >= careerDuration;
}
const calcExpireMonth = (periodPosition, restTime) => {
    let counter = periodPosition;
    let result = null;
    let i=0;
    while(i<=restTime) {
        if(i === restTime) {
            result = periods[counter];
        }
        if(counter === periods.length-1) {
            counter=0;
        } else counter++;
        i++;
    }
    return result;
}
const calcExpireYear = (actualMonth, expireMonth) => {
    if(months.indexOf(expireMonth) >= months.indexOf(actualMonth) ) {
        return getYear();
    }
    const year = parseInt(getYear())+1
    return `${year}`;
}
export function generateExpireDate(data, defaultExpireDate) {
    const { groupStudent, duration, idSectionClients } = data;
    if(idSectionClients > 1) return defaultExpireDate;
    const grade = getGrade(groupStudent.replace(/\s/g, ''));
    if(!calcRemainingTime(parseInt(grade), duration)) return defaultExpireDate;

    const restTime = duration-grade;
    const actualMonth = getMonth();
    
    let result = null;
    //Para sacar el mes en el que saldria de la escuela.
    for(let i=0; i<=periods.length-1; i++) {
        if(periods[i].includes(actualMonth)) {
            result = calcExpireMonth(i, restTime);
            break;
        }
    }
    const expireMonth = result[3];
    const expireYear = calcExpireYear(actualMonth, expireMonth);
    return expireMonth+'/'+expireYear;
}