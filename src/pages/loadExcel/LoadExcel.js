import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getBreadCrumbs, statePage, activeAlert } from '../../redux/dataSlice';
import * as XLSX from 'xlsx';
import './loadExcelStyles.css';
import ilustrationOpStudend from '../../assets/ilustrationOpStudend.png';
import ilustrationOpTeacher from '../../assets/ilustrationOpTeacher.png';
import ilustrationOpCollaborators from '../../assets/ilustrationOpCollaborators.png';
import OptionLoadExcel from "../../components/optionLoadExcel/OptionLoadExcel";
import ModalAlert from '../../components/modalAlert/ModalAlert';
// import BtnUpExcel from "../../components/btnUpExcel/BtnUpExcel";
// import BtnAction from "../../components/btnAction/BtnAction";
// import ItemInfoExcel from "../../components/itemInfoExcel/ItemInfoExcel";
// import iconDoc from '../../assets/iconDoc.png';
// import iconGroup from '../../assets/iconGroup.png';
// import Student from "../../components/student/Student";
import { verifyCamps } from '../../functions';
import { sendExcel } from '../../api';
// import Spinner from "../../components/spinner/Spinner";
// import { Link } from 'react-router-dom';
// import { sendArrayLotes } from "../../api";
const breadCrumbs = [
    {rute:'/', page:'Inicio', },
    {rute:'/page/load-excel', page:'Cargar lista', }
]
const LoadExcel = () => {
    const [ studens, setStudens ] = useState([]);
    const [ fileContent, setFileContent ] = useState(null);

    const [ inputFile, setInputFile ] = useState('');
    const [ nameFile, setNameFile ] = useState('');
    const [ confirm, setConfirm ] = useState({active:false, message:''});
    const [ isLoading, setIsLoading ] = useState(false);
    const [ options, setOptions ] = useState({ show:false, message:'', status:null});
    const [ typeListSelected, setTypeListSelected ] = useState([
        { id:1, active:true, value:"studens" },
        { id:2, active:false, value:"teachers" },
        { id:3, active:false, value:"collaborators" }
    ])
    const [ modalAlert, setModalAlert ] = useState({
        state:false,
        icon:'',
        message:'',
    })
    const dispatch = useDispatch();
    useEffect(() => {
        if(studens.length > 0) {
            setConfirm({active:true, message:'¿Quieres guardar esta lista?'});
        }
    },[studens]);
    useEffect(() => {
        dispatch(statePage({ id:5, active:true }));
    },[dispatch]);
    useEffect(() => {
        dispatch(getBreadCrumbs(breadCrumbs))
    },[dispatch]);

    const handleFile = async e => {
        setInputFile(e.target.value);
        const expretion = /^.+[.xls XLS xlsx XLSX]{4}$/
        const file = e.target.files[0];
        setFileContent(e.target.files[0]);
        if(expretion.test(file.name)) {
            console.log("Archivo cargado")
            setNameFile(file.name);
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = async () => {
                readExcel(reader.result);
            }
        } else {
            setModalAlert({
                state:true,
                icon:'incorrectDoc',
                message:'El archivo cargado, no es el correcto.',
            })
        }
    }
    const readExcel = excel => {
        const workbook = XLSX.read(excel,{type:"buffer"});
        const workSheetName = workbook.SheetNames[0];
        const workSheet = workbook.Sheets[workSheetName];
        const data = XLSX.utils.sheet_to_json(workSheet);
        if(data.length === 0) {
            dispatch(activeAlert({
                active:true,
                icon:'iconError',
                message:'No hay registros en el Excel que se está intentando cargar.'
            }));
            cancel();
            return false;
        }
        const resultCampsNecessaries = verifyCamps(data);
        if(resultCampsNecessaries.length === 0) {
            setStudens(data);
            return true;
        }
        var campsNecessaries = '';
        for(let i=0; i<=resultCampsNecessaries.length - 1; i++) {
            campsNecessaries = campsNecessaries+", "+resultCampsNecessaries[i];
        }
        dispatch(activeAlert({
            active:true,
            icon:'iconError',
            message:'Faltan algunos campos necesarios en el archivo a cargar'+campsNecessaries+"."
        }));
        cancel();
    }
    const cancel = () => {
        setInputFile('');
        setStudens([]);
        setConfirm({active:false, message:''});
        setOptions({ show:false, message:'', status:null});
    }
    const saveStudens = async () => {
        setIsLoading(true);
        sendExcel("http://localhost:3000/api/load-excel", fileContent);
    }
    return (
        <section className={`loadexcel ${confirm.active && "showData"}`}>
            <h1 className="loadexcel-title">Selecciona el tipo de lista a cargar</h1>
            <ul className="loadexcel-options">
                <OptionLoadExcel
                    type="Estudiante"
                    ilustration={ilustrationOpStudend}
                    id={typeListSelected[0].id}
                    active={typeListSelected[0].active}
                    typeListSelected={typeListSelected}
                    setTypeListSelected={setTypeListSelected}
                />
                <OptionLoadExcel
                    type="Profesor"
                    ilustration={ilustrationOpTeacher}
                    id={typeListSelected[1].id}
                    active={typeListSelected[1].active}
                    typeListSelected={typeListSelected}
                    setTypeListSelected={setTypeListSelected}
                />
                <OptionLoadExcel
                    type="Colaborador"
                    ilustration={ilustrationOpCollaborators}
                    id={typeListSelected[2].id}
                    active={typeListSelected[2].active}
                    typeListSelected={typeListSelected}
                    setTypeListSelected={setTypeListSelected}
                />
            </ul>
            <div className="upload-file">
                <h2>Selecciona la lista a cargar</h2>
                <p>Selecciona la lista de alumnos, profesores o colaboradores en excel, haciendo clic en el botón azul.</p>
                <button className="btn--load-excel">
                    <input type="file" className="input-load-excel" accept=".XLSX" onChange={handleFile}/>
                    <span>Seleccionar lista</span>
                </button>
            </div>
            <ModalAlert modalAlert={modalAlert}>
                
            </ModalAlert>
        </section>
    );
}

export default LoadExcel;