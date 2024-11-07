import { useState, useContext } from 'react';
import axiosInstance from '../../../../data/remote/axios.instance';
import ShowPersonContext from '../../../../context/showPerson/ShowPersonContext';
import CentralAlertContext from '../../../../context/centralAlert/CentralAlertContext';
import BtnAction from '../../../btnAction/BtnAction';
import './modalEditdate.css';
const ModalEditDate = ({title, date, idPerson, camp, action, setDate, visible}) => {
    const [ newDate, setNewDate ] = useState(date);
    const { setDelivaryDate } = useContext(ShowPersonContext);
    const { openCentralAlert } = useContext(CentralAlertContext);
    const updateDate = async () => {
        let response = {}
        try {//Agregar en caso de que no haya hora registrada.
            if(action === 'update') response = await axiosInstance.put(`/schoolIdentityCard/${idPerson}`,{date:newDate, fieldToUpdate:camp});
            else {
                response = await axiosInstance.post('/schoolIdentityCard',{id:idPerson, date:newDate});
            }
            setDate(newDate);
            visible(false); 
            openCentralAlert('Guardar fecha',response.message,'success');
            //igualamos a null setDelivaryDate para ocultar la fecha de entrega.
            if(camp === 'printed_at') setDelivaryDate(null);
        } catch (error) {
            console.log(error)
            openCentralAlert( 
                'Error al guardar la fecha', 
                'No se logro guardar la fecha problemas de conexión del servidor.',
                'error'
            );
        }
    }
    return (
        <div className='modal-edit-date'>
            <h3 className='title-edit'>{title}</h3>
            <input 
                className='input-date' 
                type='date'
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)} 
            />
            <div className='btns'>
                <BtnAction
                    value='Cerrar'
                    color='gray'
                    action={() => visible(false)}
                />
                <BtnAction
                    value='Guardar'
                    color='blue'
                    action={() => updateDate()}
                />
            </div>
        </div>
    );
}

export default ModalEditDate;


