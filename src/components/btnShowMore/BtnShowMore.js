import './btnShowMore.css';
const BtnShowMore = ({ action }) => {
    return (
        <>
            <div className='box-btn-show-more'>
                <button type="button" className='btn-show-more' onClick={() => action()}>
                    Mostrar más
                </button>
            </div>
        </>
    );
}

export default BtnShowMore;