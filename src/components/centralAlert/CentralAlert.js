import './centralAlert.css';
import iconError from '../../assets/iconError.png';
import BtnAction from '../btnAction/BtnAction';
import { CentralAlertViewModel } from './CentralAlertViewModel';
const icons = {
    error:iconError
}
const CentralAlert = () => {
    const {centralAlert, stopClic, closeAlert} = CentralAlertViewModel();
    
    return (
        <article className={`central-alert ${centralAlert.visible && "show-central-alert"}`} onClick={() => closeAlert()}>
            <div className='box-content' onClick={stopClic}>
                <img src={icons[centralAlert.type]} alt="icon del alerta" className='header-icon' />
                <h1 className='message-alert'>{centralAlert.title}</h1>
                <p>{centralAlert.message}</p>
                <div className='btn-ok'>
                    <BtnAction 
                        value="OK" 
                        color={centralAlert.type} 
                        action={() => closeAlert()}
                    />
                </div>
            </div>
        </article>
    );
}
export default CentralAlert;