import { useContext, useState } from 'react';
import { expretions } from '../../../../../../../../helpers/expretions';
import axiosInstance from '../../../../../../../../data/remote/axios.instance';
import CareerSelectedContext from '../../../../../../../../context/careerSelected/CareerSelectedContext';
import CentralAlertContext from '../../../../../../../../context/centralAlert/CentralAlertContext';
import CareersContext from '../../../../../../../../context/careers/CareersContext';
import BtnSelecter from './components/btnSelecter/BtnSelecter';
import InputCareer from './components/inputCareer/InputCareer';
import CareerName from './components/careerName/CareerName';
import CareerAbridging from './components/careerAbridging/CareerAbridging';
import './career.css';

const Career = ({id, fullname, abridging, active}) => {
    const [ isLoading, setIsLoading ] = useState(false);
    const { updateCareer } = useContext(CareersContext);
    const { careerAbridging, setCareerAbridging } = useContext(CareerSelectedContext);
    const { openCentralAlert } = useContext(CentralAlertContext);
    const updateAbridgingDB = async (data) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.patch('/careers',data);
            return response.data;
        } catch (error) {
            throw new Error(error.message);
        } finally {
            setIsLoading(false);
        }
    }
    const handleSudmit = async (e) => {
        try {
            e.preventDefault();
            if(abridging === careerAbridging) {
                throw new Error('No se encontraron cambios para actualizar');
            }
            const transformAbridging = careerAbridging.toUpperCase();
            if(!expretions.careerAbridging.test(transformAbridging)) {
                throw new Error('La abreviación del nombre de la carrera, no es válida');
            }
            const data = {
                id,
                abridging:careerAbridging.toUpperCase()
            }
            const result = await updateAbridgingDB(data);
            updateCareer(result);
            openCentralAlert('Actualización de abreviatura','La abreviatura se actualizo de forma correcta.','success');
        } catch (error) {
            openCentralAlert('Actualización de abreviatura',error.message, 'error');
        }
    }
    return (
        <li className='career'>
            <form onSubmit={handleSudmit} className='box-career'>
                <BtnSelecter idInput={id} active={active}  />
                <div className='input-career'>
                    <CareerName
                        id={id}
                        fullname={fullname}
                    />
                    {active
                        ?   <InputCareer
                                id={id}
                                value={careerAbridging}
                                setState={setCareerAbridging}
                                isLoading={isLoading}
                            />
                        :   <CareerAbridging value={abridging} />
                    }
                </div>
            </form>
        </li>
    );
}

export default Career;