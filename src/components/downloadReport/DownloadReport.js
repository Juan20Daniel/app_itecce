import { useContext, useState } from 'react';
import { donwload } from '../../functions';
import axiosInstance from '../../data/remote/axios.instance';
import Select from '../select/Select';
import BtnDownLoad from '../btnDownload/BtnDownload';
import './downloadReport.css';
import CentralAlertContext from '../../context/centralAlert/CentralAlertContext';
const options = [
    {id: 1, selected:true, name:'Alumnos'},
    {id: 2, selected:false, name:'Profesores'},
    {id: 3, selected:false, name:'Colaboradores'},
]
const sections = {
    'Alumnos':'STUDENT',
    'Profesores':'TEACHER',
    'Colaboradores':'COLLABORATOR'
}
const DownloadReport = () => {
    const [ section, setSection ] = useState({value:'', camp:'section', error:false, exp:/^[a-zAPCÁÉÍÓÚ]{7,15}$/});
    const [ isLoading, setIsLoading ] = useState(false);
    const { openCentralAlert } = useContext(CentralAlertContext);
    const downloadReport = async () => {
        try {
            setIsLoading(true);
            const {data} = await axiosInstance.get(`/report/${sections[section.value]}`);
            if(!data.length) {
                return openCentralAlert(
                    'Reporte de credenciales',
                    'No se encontraron datos aún para colocar en el reporte',
                    'success'
                );
            }
            const result = data.map(data => [
                data.idPerson,
                data.name,
                data.firstname,
                data.lastname,
                data.printed_at,
                data.delivered_at
            ]);
            result.unshift(['Matrícula', 'Nombre', 'Apellido paterno', 'Apellido materno', 'Fecha de creación', 'Fecha de entrega']);
            donwload(result, `Reporte de credenciales ${section.value}`);
        } catch (error) {
            openCentralAlert(
                'Error',
                error.message,
                'error'
            );
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className='download-report'>
            <div className='box-center'>
                <p className='label'>Selecciona un sección</p>
                <div className='box-select'>
                    <Select
                        state={section}
                        setState={setSection}
                        options={options}
                       
                    />
                    {section.error && 
                        <div className='box-error-message'>
                            <p>Selecciona una carrera</p>
                        </div>
                    }
                </div>
                <BtnDownLoad
                    action={downloadReport}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
}

export default DownloadReport;