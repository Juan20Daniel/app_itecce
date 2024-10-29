import { useContext } from 'react';
import axiosInstance from '../../../../data/remote/axios.instance';
import BtnAction from '../../../btnAction/BtnAction';
import CentralAlertContext from '../../../../context/centralAlert/CentralAlertContext';
import './optionsId.css';

const OptionsId = ({print, currentPage, pages, setPages, showBack, setShowBack}) => {
    const { openCentralAlert } = useContext(CentralAlertContext);
    const showReverse = () => {
        if(!pages[currentPage].reverse) return;
        setShowBack(!showBack);
    }
    const printedSheet = () => {
        let printedPage = null;
        let pagesCopy = [...pages];
        if(showBack && pages[currentPage].reverse) printedPage = {...pages[currentPage], printedBackPage:true };
        else printedPage = {...pages[currentPage], printedFrondPage:true }
        pagesCopy[currentPage] = printedPage;
        setPages(pagesCopy);
        if(showBack && pages[currentPage].reverse) return;
        const getIds = pagesCopy[currentPage].page.filter(item => item.typeCard !== 'REVERSE').map(item => item.idPerson)
        registerDate(getIds)
        
    }
    const registerDate = async (ids) => {
        try {
            const response = await axiosInstance.post('/schoolIdentityCard/process-print-date',ids);
            openCentralAlert('Registro de fecha', response.message,'success');
        } catch (error) {
            openCentralAlert('Registro de fecha',error.message,'error');
        }
    }
    return (
        <div className='options-id'>
            <button className='btn-add-date' onClick={() => printedSheet()}>
                {showBack && pages[currentPage].reverse
                    ? 'Registrar impresión'
                    : 'Registrar fecha de impresión'
                }
            </button>
            <button className={`btn-show-reverse ${!pages[currentPage]?.reverse && 'disable-btn-reverse'}`} onClick={() => showReverse()}>
                {showBack ? 'Ver anverso' : 'Ver reverso'}
            </button>
            <BtnAction
                value='Imprimir'
                color='blue'
                action={print}
            />
        </div>
    );
}
export default OptionsId;


// import { useContext } from 'react';
// import axiosInstance from '../../../../data/remote/axios.instance';
// import GenerateIdContext from '../../../../context/generateId/GenerateIdContext';
// import CentralAlertContext from '../../../../context/centralAlert/CentralAlertContext';
// import './btnRegisterDate.css';
// const BtnRegisterDate = () => {
//     const { generateIdState } = useContext(GenerateIdContext);
//     const { selectedPersons } = generateIdState;
//     const { openCentralAlert } = useContext(CentralAlertContext);
//     const registerDate = async () => {
//         const ids = selectedPersons.map(item => item.idPerson);
//         try {
//             const response = await axiosInstance.post('/schoolIdentityCard/process-print-date',ids);
//             openCentralAlert('Registro de fecha', response.message,'success');
//         } catch (error) {
//             openCentralAlert('Registro de fecha',error.message,'error');
//         }
//     }
//     return (
//         <button className='btn-printedSheet-date' title='Capturar fecha de impreción' onClick={() => registerDate()}>
//             Registrar impreción
//         </button>
//     );
// }

// export default BtnRegisterDate;