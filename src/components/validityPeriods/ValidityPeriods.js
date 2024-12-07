import { useContext, useState } from 'react';
import axiosInstance from '../../data/remote/axios.instance';
import BtnAction from '../btnAction/BtnAction';
import Period from './components/period/Period';
import BtnSavePeriod from './components/btnSavePeriod/BtnSavePeriod';
import ValidityPeriodsContext from '../../context/validityPeriods/ValidityPeriodsContext';
import CentralAlertContext from '../../context/centralAlert/CentralAlertContext';
import './validityPeriods.css';
const expretion = /^[a-zA-Z]{3}\/[0-9]{2}$/;
const ValidityPeriods = () => {
    const {
        students,
        teachers,
        collaborators,
        error:errorPeriods,
        isLoading:isLoadingPeriods,
        setStudents,
        setTeachers,
        setCollaborators,
        validityPeriods
    } = useContext(ValidityPeriodsContext);
    const { openCentralAlert } = useContext(CentralAlertContext);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ validPeriods, setValidPeriods ] = useState({
        'Alumnos':true,
        'Profesores':true,
        'Colaboradores':true
    });
    const verifyPeriods = () => {
        const verifyStudents = expretion.test(students);
        const verifyTeachers = expretion.test(teachers);
        const verifyCollaborators = expretion.test(collaborators);
        setValidPeriods({
            'Alumnos':verifyStudents,
            'Profesores':verifyTeachers,
            'Colaboradores':verifyCollaborators
        });
        if(!verifyStudents || !verifyTeachers || !verifyCollaborators) return false;
        return true;
    }
    const updateValidityPeriods = async (values) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.put('/validityPeriods',values);
            openCentralAlert('Actualización de vigencia', response.message, 'success');
        } catch (error) {
            openCentralAlert('Error', error.message, 'error');
        } finally {
            setIsLoading(false);
        }
    }
    const handleSubmit = e => {
        e.preventDefault();
        if(!verifyPeriods()) return openCentralAlert('Error', 'Hay campos inválidos al colocar la fecha de vencimiento', 'error');
        const newValidityPeriods = {
            students:students.toUpperCase(),
            teachers:teachers.toUpperCase(),
            collaborators:collaborators.toUpperCase()
        }
        updateValidityPeriods(newValidityPeriods);
    }
    return (
        <form className='validity-periods' onSubmit={handleSubmit}>
            <span className="sub-title">Vigencia general</span>
            <Period 
                label='Alumnos'
                value={students}
                onChange={setStudents}
                isLoading={isLoadingPeriods}
                validPeriods={validPeriods}
            />
            <Period
                label='Profesores'
                value={teachers}
                onChange={setTeachers}
                isLoading={isLoadingPeriods}
                validPeriods={validPeriods}
            />
            <Period
                label='Colaboradores'
                value={collaborators}
                onChange={setCollaborators}
                isLoading={isLoadingPeriods}
                validPeriods={validPeriods}
            />
            <div className='box-buttons'>
                <BtnSavePeriod isLoading={isLoading}/>
                {errorPeriods && <div className='box-btn-try-again'>
                    <BtnAction
                        value='Volver a intentar'
                        color='gray'
                        action={validityPeriods}
                    />
                </div>}
            </div>
        </form>
    );
}

export default ValidityPeriods;