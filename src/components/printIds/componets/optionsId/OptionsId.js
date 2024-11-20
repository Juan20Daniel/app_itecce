import { useContext } from 'react';
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
        openCentralAlert('Impresión', 'Se marcó la hoja de credenciales como impresa','success');
    }
    return (
        <div className='options-id'>
            <button className='btn-add-date' onClick={() => printedSheet()}>
                Registrar impresión de hoja
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