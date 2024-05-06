import './btnShowMore.css';
import { useEffect } from 'react';
var count = 0;
const BtnShowMore = ({ pages, setPages, arrayItems }) => {
    useEffect(() => {
        count = 0;
    },[arrayItems]);
    const showMoreItems = () => {
        count++;
        let array_aux = [...pages];
        array_aux[count] = true;
        setPages(array_aux);
    }
    return (
        <>
            {(pages.length > 1 && count + 1 < pages.length) &&
            <div className='box-btn-show-more'>
                <button type="button" className='btn-show-more' onClick={() => showMoreItems()}>
                    Mostrar más
                </button>
            </div>
        }
        </>
    );
}

export default BtnShowMore;