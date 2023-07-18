import './modalAlert.css';
const icons = {
    ilistrationAdition:require('../../assets/ilustrationAdition.png'),
    ilistrationLoader:require('../../assets/ilustrationLoading.png'),
    incorrectDoc:require('../../assets/incorrectDoc.png'),
}
const ModalAlert = ({modalAlert, children}) => {
    return (
        <div className={`modal-alert ${modalAlert.state && "show-modal-alert"}`}>
            <div className='modal-alert__content'>
                <img src={icons[modalAlert.icon]} alt="ilustration" />
                <span>
                    {modalAlert.message}
                </span>
                {children}
            </div>
        </div>
    );
}

export default ModalAlert;