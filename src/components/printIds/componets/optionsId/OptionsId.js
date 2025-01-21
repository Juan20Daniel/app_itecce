import { useContext } from 'react';
import Button from '../../../button/Button';
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
            <Button 
                value='Registrar impresión de hoja'
                btnStyle='btn-add-date'
                type='button'
                action={printedSheet}
            />
            <Button
                value={showBack ? 'Ver anverso' : 'Ver reverso'}
                type='button'
                btnStyle={`btn-show-reverse ${!pages[currentPage]?.reverse && 'disable-btn-reverse'}`} 
                action={showReverse}
            />
            <Button
                value='Imprimir'
                type='button'
                btnStyle='btn-print'
                action={print}
            />
        </div>
    );
}
export default OptionsId;