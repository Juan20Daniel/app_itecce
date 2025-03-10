import { useContext, useState } from 'react';
import { IconSave } from '../../../../assets/IconSave';
import { expretions } from '../../../../helpers/expretions';
import axiosInstance from '../../../../data/remote/axios.instance';
import BtnTryAgain from '../../../btnTryAgain/BtnTryAgain';
import Period from './components/period/Period';
import ValidityPeriodsContext from '../../../../context/validityPeriods/ValidityPeriodsContext';
import CentralAlertContext from '../../../../context/centralAlert/CentralAlertContext';
import BtnSetting from '../../../btnSetting/BtnSetting';
import SubTitleSetting from "../../../subTitleSetting/SubTitleSetting";
import ErrorMessage from '../errorMessage/ErrorMessage';
import BoxFormSettings from '../boxFormSettings/BoxFormSettings';
import './validityPeriods.css';

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
        const {periods} = expretions;
        const verifyStudents = periods.test(students);
        const verifyTeachers = periods.test(teachers);
        const verifyCollaborators = periods.test(collaborators);
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
            openCentralAlert('Error al actualizar la vigencia', error.message, 'error');
        } finally {
            setIsLoading(false);
        }
    }
    const handleSubmit = e => {
        e.preventDefault();
        if(!verifyPeriods()) return openCentralAlert('Error al actualizar la vigencia', 'Hay campos inválidos al colocar la fecha de vencimiento', 'error');
        const newValidityPeriods = {
            students:students.toUpperCase(),
            teachers:teachers.toUpperCase(),
            collaborators:collaborators.toUpperCase()
        }
        updateValidityPeriods(newValidityPeriods);
    }
    return (
        <BoxFormSettings submit={handleSubmit}>
            <SubTitleSetting value='Vigencia general' />
            {errorPeriods 
                ?   <>
                        <ErrorMessage value='Error al obtener las vigencias de credenciales.' />   
                        <BtnTryAgain action={validityPeriods} />
                    </>
                :   <>
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
                        {!isLoadingPeriods && 
                            <div className='box-buttons'>
                                <BtnSetting
                                    value='Guardar'
                                    type="submit"
                                    isLoading={isLoading}
                                >
                                    <IconSave size={20} color='#000000' />
                                </BtnSetting>
                            </div>
                        }
                    </>
            }
        </BoxFormSettings>
    );
}

export default ValidityPeriods;