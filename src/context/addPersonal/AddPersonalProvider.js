import { useState, useContext } from "react";
import { verifyCamps } from '../../helpers/verifyCamps';
import { transformExcel } from '../../helpers/excel';
import { addTempAvatar } from '../../helpers/addTempAvatar';
import AddPersonalContext from "./AddPersonalContext";
import CentralAlertContext from "../centralAlert/CentralAlertContext";
const validExtentionFile = /^.+[.xls XLS xlsx XLSX]{3,4}$/;
const AddPersonalProvider = ({ children }) => {
    const [ nameExcel, setNameExcel ] = useState('');
    const [ inputValue, setInputValue ] = useState('');
    const [ fileContent, setFileContent ] = useState([]);
    const [ fileToLoad, setFileToLoad ] = useState(null);
    const [ options, setOptions ] = useState([
        { id:1, active:true, value:"students", name:'Estudiantes'},
        { id:2, active:false, value:"teachers", name:"Profesores" },
        { id:3, active:false, value:"collaborators", name:"Colaboradores" }
    ]);
    const {openCentralAlert} = useContext(CentralAlertContext);
    const handleFile = async e => {
        const file = e.target.files[0];
        setNameExcel(file.name);
        setInputValue(e.target.value);
        setFileToLoad(file);
        if(!validExtentionFile.test(file.name)) {
            return openCentralAlert('Error al cargar el archivo','El archivo cargado, no es el correcto.','error');
        }
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = async () => readExcel(reader.result);
    }
    const readExcel = (excel) => {
        const data = transformExcel(excel);
        const listSelected = options.find(option => option.active);
        if(data.length === 0) {
            return openCentralAlert(
                'Error al cargar el archivo',
                `No hay registros en el archivo de (${listSelected.name}) que se está intentando cargar.`,
                'error'
            );
        }
        const requiredFields = verifyCamps(data, listSelected.value);
        if(requiredFields) {
            return openCentralAlert(
                'Error al cargar el archivo',
                `Faltan campos en el archivo de (${listSelected.name}) que intenta cargar: `+requiredFields+".",
                'error'
            );
        }
        setFileContent(addTempAvatar(data));
    }
    let data = {
        options, 
        nameExcel, 
        inputValue,
        fileContent,
        fileToLoad,
        setFileContent,
        setInputValue,
        setOptions, 
        handleFile
    }
    return (
        <AddPersonalContext.Provider value={data}>
            {children}
        </AddPersonalContext.Provider>
    )
}

export default AddPersonalProvider;