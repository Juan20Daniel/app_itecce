import { useState, useRef, useEffect } from 'react';
import { IconNext } from '../../../../../../assets/IconNext';
import Button from '../../../../../button/Button';
import './pagination.css';
const Pagination = ({setCurrentPage, totalPages}) => {
    const [ btnBack, setBtnBack ] = useState(false);
    const [ btnNext, setBtnNext ] = useState(false);
    const counter = useRef(0);
    useEffect(() => {
        if(totalPages > 1) setBtnNext(true);
    },[totalPages]);
    const decrement = () => {
        if(!btnBack) return;
        setBtnNext(true);
        counter.current = counter.current-1;
        setCurrentPage(counter.current);
        if(counter.current === 0) return setBtnBack(false);
    }
    const increment = () => {
        if(!btnNext) return;
        setBtnBack(true);
        counter.current = counter.current+1;
        setCurrentPage(counter.current);
        if(counter.current === totalPages-1) return setBtnNext(false);
    }
    return (
        <div className='pagination'>
            <p>Página {counter.current+1}/{totalPages}</p>
            <Button 
                btnStyle={`btn-pagination btn-back ${!btnBack && 'btn-disable'}`} 
                type='button' 
                action={decrement}
            >
                <IconNext size={9} />
                <span>Átras</span>
            </Button>
            <Button 
                btnStyle={`btn-pagination btn-next ${!btnNext && 'btn-disable'}`} 
                type='button' 
                action={increment}
            >
                <span>Siguiente</span>
                <IconNext size={9} />
            </Button>
        </div>
    );
}
export default Pagination;