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
    const { updateCareer } = useContext(CareersContext);
    const { careerAbridging, careerDuration, setCareerAbridging, setCareerDuration } = useContext(CareerSelectedContext);
    const { openCentralAlert } = useContext(CentralAlertContext);
    const fetch = async (data) => {
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
    const handleSudmit = async (e) => {
        try {
            e.preventDefault();
            if(abridging === careerAbridging && duration === careerDuration) {
                throw new Error('No se encontraron cambios para actualizar');
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
            const result = await fetch(data);
            updateCareer(result);
            openCentralAlert('Actualización de abreviatura','La abreviatura se actualizo de forma correcta.','success');
        } catch (error) {
            openCentralAlert('Actualización de carrera',error.message, 'error');
        }
    }
    const removeCareer = () => {
        console.log('Eliminando carrera...');
    }
    return (
        <li className='career'>
            <form onSubmit={handleSudmit} className='box-career'>
                <div className='box-top'>
                    <CareerName fullname={fullname}/>
                    <BtnSelecter idInput={id} active={active} />
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
                            action={removeCareer}
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