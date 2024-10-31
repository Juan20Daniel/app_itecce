import './boxModalLeft.css';
const BoxModalLeft = ({children}) => {
    return (
        <div className='box-modal-left'>
            <div className='left-box'>
                {children}
            </div>
        </div>
    );
}

export default BoxModalLeft;