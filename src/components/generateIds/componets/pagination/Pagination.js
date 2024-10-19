import { IconNext } from '../../../../assets/IconNext';
import './pagination.css';

const Pagination = () => {
    return (
        <div className='pagination'>
            <p>Página 1/2</p>
            <button className='btn-pagination btn-back btn-disable' type='button'>
                <IconNext size={9} />
                <span>Átras</span>
            </button>
            <button className='btn-pagination btn-next' type='button'>
                <span>Siguiente</span>
                <IconNext size={9} />
            </button>
        </div>
    );
}
export default Pagination;