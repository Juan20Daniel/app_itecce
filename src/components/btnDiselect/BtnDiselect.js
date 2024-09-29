import { useContext } from 'react';
import './btnDiselect.css';
import CentralAlertContext from '../../context/centralAlert/CentralAlertContext';
import GenerateIdContext from '../../context/generateId/GenerateIdContext';
const BtnDiselect = ({value}) => {
    const { removeSelectedPerson } = useContext(GenerateIdContext);
    const { openCentralAlert, closeCentralAlert } = useContext(CentralAlertContext);
    const confirmAction = () => {
        openCentralAlert(
            'Deseleccionar todo', 
            '¿Seguro que quieres deseleccionar todos los registros seleccionados para la creación de credencial?', 
            'confirm', 
            remove
        );
    }
    const remove = () => {
        removeSelectedPerson([]);
        closeCentralAlert();
    }
    return (
        <button className='btn-diselect' onClick={() => confirmAction()}>
            {value}
        </button>
    );
}

export default BtnDiselect;