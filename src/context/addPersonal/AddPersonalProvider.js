import { useState, useEffect } from "react";
import AddPersonalContext from "./AddPersonalContext";
import { verifyCamps, transformExcel, addTempAvatar } from '../../functions';
import { useDispatch } from "react-redux";
import { setCentralAlert, setModalShowFile } from "../../redux/dataSlice";
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
    const dispatch = useDispatch();
    useEffect(() => {
        if(fileContent.length !== 0) dispatch(setModalShowFile(true));
    },[fileContent, dispatch]);
    const handleFile = async e => {
        const file = e.target.files[0];
        setNameExcel(file.name);
        setInputValue(e.target.value);
        setFileToLoad(file);
        if(!validExtentionFile.test(file.name)) {
            return dispatch(setCentralAlert({
                visible:true,
                title: 'Error al cargar el archivo',
                message:'El archivo cargado, no es el correcto.',
                type:'error'
            }));
        }
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = async () => readExcel(reader.result);
    }
    const readExcel = (excel) => {
        const data = transformExcel(excel);
        const listSelected = options.find(option => option.active);
        if(data.length === 0) {
            return dispatch(setCentralAlert({
                visible:true,
                title: 'Error al cargar el archivo',
                message:`No hay registros en el archivo de (${listSelected.name}) que se está intentando cargar.`,
                type:'error'
            }));
        }
        const requiredFields = verifyCamps(data, listSelected.value);
        if(requiredFields) {
            return dispatch(setCentralAlert({
                visible:true,
                title: 'Error al cargar el archivo',
                message:`Faltan campos en el archivo de (${listSelected.name}) que intenta cargar: `+requiredFields+".",
                type:'error'
            }));
        }
        setFileContent(addTempAvatar(data));
    }
    let data = {
        options, 
        nameExcel, 
        inputValue,
        fileContent,
        fileToLoad,
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