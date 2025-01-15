import * as XLSX from 'xlsx';
import { typeSections } from './utils';

export function transformExcel(excel) {
    const workbook = XLSX.read(excel,{type:"buffer"});
    const workSheetName = workbook.SheetNames[0];
    const workSheet = workbook.Sheets[workSheetName];
    const data = XLSX.utils.sheet_to_json(workSheet);
    return data;
}
export const downloadExcel = (section, data, nameFile) => {
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