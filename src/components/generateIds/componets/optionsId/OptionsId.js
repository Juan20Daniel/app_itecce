import BtnAction from '../../../btnAction/BtnAction';
import './optionsId.css';

const OptionsId = ({print, currentPage, pages, setPages, showBack, setShowBack}) => {
    const showReverse = () => {
        if(!pages[currentPage].reverse) return;
        setShowBack(!showBack);
    }
    const register = () => {
        console.log(pages)
        let printedPage = null;
        let pagesCopy = [...pages];
        if(showBack && pages[currentPage].reverse) printedPage = {...pages[currentPage], printedBackPage:true };
        else printedPage = {...pages[currentPage], printedFrondPage:true }
        pagesCopy[currentPage] = printedPage;
        setPages(pagesCopy);
    }
    return (
        <div className='options-id'>
            <button className='btn-add-date' onClick={() => register()}>Registrar fecha de impresión</button>
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