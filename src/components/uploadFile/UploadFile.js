import { useContext, useLayoutEffect, useState } from 'react';
import BtnUploadFile from './components/btnUploadFile/BtnUploadFile';
import SectionOptionsContext from '../../context/sectionOptions/SectionOptionsContext';
import './uploadFile.css';

const fileStructures = {
    "Estudiantes": 'Sección | Grupo | Matrícula | Nombre | Apellido paterno | Apellido materno',
    "Profesores": 'Matrícula | Nombre | Apellido paterno | Apellido materno',
    "Colaboradores": 'Matrícula | Nombre | Apellido paterno | Apellido materno'
}

const UploadFile = () => {
    const [ typeFile, setTypeFile ] = useState('');
    const { options } = useContext(SectionOptionsContext);
    useLayoutEffect(() => {
        const optionSelected = options.find(option => option.active);
        setTypeFile(optionSelected.name);
    },[options]);
    return (
        <div className="upload-file">
            <h2>Selecciona la lista a cargar</h2>
            <div className='box-note'>
                <p className='note'>Verifica que la lista de <b>"{typeFile}"</b> cumpla con la siguiente estructura:</p>
                <p className='note'>{fileStructures[typeFile]}</p>
            </div>
            <BtnUploadFile />
        </div>
    )
};

export default UploadFile;