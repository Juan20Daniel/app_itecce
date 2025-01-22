import { useState, useContext } from "react";
import { verifyCamps } from '../../helpers/verifyCamps';
import { transformExcel } from '../../helpers/excel';
import { addTempAvatar } from '../../helpers/addTempAvatar';
import AddPersonalContext from "./AddPersonalContext";
import CentralAlertContext from "../centralAlert/CentralAlertContext";
import SectionOptionsContext from "../sectionOptions/SectionOptionsContext";
import { expretions } from "../../helpers/expretions"; 
const AddPersonalProvider = ({ children }) => {
    const [ nameExcel, setNameExcel ] = useState('');
    const [ inputValue, setInputValue ] = useState('');
    const [ fileContent, setFileContent ] = useState([]);
    const [ fileToLoad, setFileToLoad ] = useState(null);
    const {openCentralAlert} = useContext(CentralAlertContext);
    const { options } = useContext(SectionOptionsContext);
    const readExcel = (excel) => {
        const data = transformExcel(excel);
        const listSelected = options.find(option => option.active);
        if(data.length === 0) {
            setInputValue('');
            return openCentralAlert(
                'Error al cargar el archivo',
                `No hay registros en el archivo de (${listSelected.name}) que se está intentando cargar.`,
                'error'
            );
        }
        const requiredFields = verifyCamps(data, listSelected.value);
        if(requiredFields) {
            setInputValue('');
            return openCentralAlert(
                'Error al cargar el archivo',
                `Faltan campos en el archivo de (${listSelected.name}) que intenta cargar: `+requiredFields+".",
                'error'
            );
        }
        setFileContent(addTempAvatar(data));
    }
    const handleFile = async e => {
        const file = e.target.files[0];
        setNameExcel(file.name);
        setInputValue(e.target.value);
        setFileToLoad(file);
        if(!expretions.validExtentionFile.test(file.name)) {
            setInputValue('');
            return openCentralAlert('Error al cargar el archivo','El archivo cargado no es el correcto.','error');
        }
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = async () => readExcel(reader.result);
    }
    let data = {
        nameExcel, 
        inputValue,
        fileContent,
        fileToLoad,
        setFileContent,
        setInputValue, 
        handleFile
    }
    return (
        <AddPersonalContext.Provider value={data}>
            {children}
        </AddPersonalContext.Provider>
    )
}

export default AddPersonalProvider;