import { useContext, useState } from 'react';
import { expretions } from '../../../../../../../../helpers/expretions';
import { IconSave } from '../../../../../../../../assets/IconSave';
import { IconRemove } from '../../../../../../../../assets/IconRemove';
import axiosInstance from '../../../../../../../../data/remote/axios.instance';
import CareerSelectedContext from '../../../../../../../../context/careerSelected/CareerSelectedContext';
import CentralAlertContext from '../../../../../../../../context/centralAlert/CentralAlertContext';
import CareersContext from '../../../../../../../../context/careers/CareersContext';
import Button from '../../../../../../../button/Button';
import Spin from '../../../../../../../spin/Spin';
import BtnSelecter from './components/btnSelecter/BtnSelecter';
import InputGroupCareer from './components/inputGroupCareer/InputGroupCareer';
import CareerName from './components/careerName/CareerName';
import './career.css';

const Career = ({id, fullname, abridging, duration, active}) => {
    const [ isUpdating, setIsUpdating ] = useState(false);
    const [ isRemoving, setIsRemoving ] = useState(false);
    const { updateCareer, removeCareer, selectCareer } = useContext(CareersContext);
    const { openCentralAlert } = useContext(CentralAlertContext);
    const { 
        careerAbridging, 
        careerDuration,
        lastAbridging,
        lastDuration,
        setCareerAbridging, 
        setCareerDuration 
    } = useContext(CareerSelectedContext);
    const fetchUpdate = async (data) => {
        try {
            setIsUpdating(true);
            const response = await axiosInstance.patch('/careers',data);
            return response.data;
        } catch (error) {
            throw new Error(error.message);
        } finally {
            setIsUpdating(false);
        }
    }
    const selectOther = () => {
        selectCareer(id);
    }
    const discardChanges = () => {
        if(careerAbridging !== lastAbridging || careerDuration !== lastDuration) {
            return openCentralAlert(
                'Actualización de carrera',
                'No se guardarán los cambios hechos en la carrera seleccionada actualmente, ¿seguro que quieres salir?',
                'confirm',
                selectOther
            );
        }
        selectOther();
    }
    const handleSudmit = async (e) => {
        try {
            e.preventDefault();
            if(abridging === careerAbridging && duration === careerDuration) {
                return openCentralAlert(
                    'Actualización de carrera',
                    'No se encontraron cambios para actualizar',
                    'success'
                );
            }
            const transformAbridging = careerAbridging.toUpperCase();
            if(!expretions.careerAbridging.test(transformAbridging)) {
                throw new Error('La abreviación del nombre de la carrera, no es válida');
            }
            if(!expretions.careerDuration.test(careerDuration)) {
                throw new Error('La duración de la carrera, no es válida');
            }
            const data = {
                id,
                abridging:careerAbridging.toUpperCase(),
                duration:parseInt(careerDuration)
            }
            const result = await fetchUpdate(data);
            updateCareer(result);
            openCentralAlert('Actualización de abreviatura','La abreviatura se actualizo de forma correcta.','success');
        } catch (error) {
            openCentralAlert('Actualización de carrera',error.message, 'error');
        }
    }
    const fetchRemove = async () => {
        try {
            setIsRemoving(true);
            await axiosInstance.delete(`/careers/${id}`);
            removeCareer(id);
            openCentralAlert('Eliminación de carrera','La carrera se eliminó de forma correcta.','success');
        } catch (error) {
            openCentralAlert('Eliminación de carrera',error.message,'error');
        } finally {
            setIsRemoving(false);
        }
    }
    const confirmDeletion = () => {
        openCentralAlert('Eliminar carrera','¿Se borraran los estudiantes relacionados a esta carrera, seguro que quieres continuar?','confirm',fetchRemove);
    }
    return (
        <li className='career'>
            <form onSubmit={handleSudmit} className='box-career'>
                <div className='box-top'>
                    <CareerName fullname={fullname}/>
                    <BtnSelecter 
                        active={active}
                        action={discardChanges}
                    />
                </div>
                <InputGroupCareer
                    id='abridging'
                    label='Abreviatura'
                    type='text'
                    active={active}
                    valueInput={careerAbridging}
                    setValue={setCareerAbridging}
                    spanValue={abridging}
                />
                <InputGroupCareer
                    id='duration'
                    label='Duración en cuatrimestres'
                    type='number'
                    active={active}
                    valueInput={careerDuration}
                    setValue={setCareerDuration}
                    spanValue={duration}
                />
                {active && 
                    <div className='box-btns'>
                        <Button
                            btnStyle='career-btn career-btn-remove'
                            type='button'
                            action={confirmDeletion}
                            isLoading={isRemoving}
                        >
                            <span>Borrar</span>
                            <IconRemove />
                        </Button>
                        <Button 
                            btnStyle='career-btn career-btn-save'
                            type='submit'
                        >
                            {isUpdating
                                ?   <Spin size={16} />
                                :   <span>Guardar</span>
                            }
                            <IconSave size={16} />
                        </Button>
                    </div>
                }
            </form>
        </li>
    );
}

export default Career;