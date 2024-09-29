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
    const [ editDeliveryDate, setEditDeliveryDate ] = useState(false);
    const { openCentralAlert } = useContext(CentralAlertContext);
    const { year, month, day } = getDate();
    const { priningDate, delivaryDate, setPriningDate, setDelivaryDate} = useContext(ModalShowPersonContext);
    useEffect(() => {
        const getIdentityInfo = async () => {
            try {
                setIsLoading(true);
                const response = await axiosInstance.get(`/schoolIdentityCard/${idPerson}`);
                setPriningDate(response.printed_at);
                setDelivaryDate(response.delivered_at);
            } catch (error) {
                openCentralAlert('Error',error.message,'error');
            } finally {
                setIsLoading(false);
            }
        }
        getIdentityInfo();
    },[idPerson, setPriningDate, setDelivaryDate, openCentralAlert]);
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
                    {priningDate &&
                        <ItemDate
                            title='Estado de entrega'
                            value={delivaryDate ? 'Entregada:' : 'Sin entregar'}
                            date={delivaryDate}
                            openModal={setEditDeliveryDate}
                            note='Presiona en agregar para registrar la fecha de entrega de la credencial'
                        >
                            {editDeliveryDate &&
                                <ModalEditDate
                                    title='Fecha de entrega'
                                    idPerson={idPerson}
                                    camp='delivered_at'
                                    action='update'
                                    date={priningDate??`${year}-${month}-${day}`}
                                    setDate={setDelivaryDate}
                                    visible={setEditDeliveryDate}
                                />
                            }
                        </ItemDate>
                    }
                </>
                :
                <p className='loading-identity-info'>Cargando...</p>
            }
        </>
    );
}

export default IdentityInfo;