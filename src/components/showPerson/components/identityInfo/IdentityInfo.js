import { useContext, useEffect, useState } from 'react';
import { getDate } from '../../../../helpers/helpers';
import ItemDate from '../itemDate/ItemDate';
import ModalEditDate from '../modalEditDate/ModalEditDate';
import axiosInstance from '../../../../data/remote/axios.instance';
import ModalShowPersonContext from '../../../../context/modalShowPerson/ModalShowPersonContext';
import CentralAlertContext from '../../../../context/centralAlert/CentralAlertContext';
import './showPrintDate.css';
const IdentityInfo = ({idPerson}) => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ editPrintDate, setEditPrintDate ] = useState(false);
    const { openCentralAlert } = useContext(CentralAlertContext);
    const { year, month, day } = getDate();
    const { priningDate, setPriningDate } = useContext(ModalShowPersonContext);
    useEffect(() => {
        const getIdentityInfo = async () => {
            try {
                setIsLoading(true);
                const response = await axiosInstance.get(`/schoolIdentityCard/${idPerson}`);
                setPriningDate(response.data.printed_at);
            } catch (error) {
                openCentralAlert('Error',error.message,'error');
            } finally {
                setIsLoading(false);
            }
        }
        getIdentityInfo();
    },[idPerson, setPriningDate, openCentralAlert]);
    return (
        <>
            <h2 className='identity-sub-title'>Información de credencial</h2>
            {!isLoading ?
                <>
                    <ItemDate
                        title='Estado de creación'
                        value={priningDate ? 'Impresa:' : 'No se ha impreso'}
                        date={priningDate}
                        openModal={setEditPrintDate}
                        note='Presiona en agregar para registrar la fecha de impresión de la credencial'
                    >
                        {editPrintDate &&
                            <ModalEditDate
                                title='Fecha de creación'
                                idPerson={idPerson}
                                camp='printed_at'
                                action={priningDate ? 'update' : 'insert'}
                                date={priningDate??`${year}-${month}-${day}`}
                                setDate={setPriningDate}
                                visible={setEditPrintDate}
                            />
                        }
                    </ItemDate>
                </>
                :
                <p className='loading-identity-info'>Cargando...</p>
            }
        </>
    );
}

export default IdentityInfo;