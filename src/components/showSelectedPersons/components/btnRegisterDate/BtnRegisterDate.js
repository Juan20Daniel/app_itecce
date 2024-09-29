import { useContext } from 'react';
import axiosInstance from '../../../../data/remote/axios.instance';
import GenerateIdContext from '../../../../context/generateId/GenerateIdContext';
import CentralAlertContext from '../../../../context/centralAlert/CentralAlertContext';
import './btnRegisterDate.css';
const BtnRegisterDate = () => {
    const { generateIdState } = useContext(GenerateIdContext);
    const { selectedPersons } = generateIdState;
    const { openCentralAlert } = useContext(CentralAlertContext);
    const registerDate = async () => {
        const ids = selectedPersons.map(item => item.idPerson);
        try {
            const response = await axiosInstance.post('/schoolIdentityCard/process-print-date',ids);
            openCentralAlert('Registro de fecha', response.message,'success');
        } catch (error) {
            openCentralAlert('Registro de fecha',error.message,'error');
        }
    }
    return (
        <button className='btn-register-date' title='Capturar fecha de impreción' onClick={() => registerDate()}>
            Registrar impreción
        </button>
    );
}

export default BtnRegisterDate;