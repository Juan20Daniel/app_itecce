import { useContext } from 'react';
import iconError from '../../assets/iconError.png';
import iconConfirm from '../../assets/iconConfirm.png';
import iconSuccess from '../../assets/iconSuccess.png';
import BtnAction from '../btnAction/BtnAction';
import CentralAlertContext from "../../context/centralAlert/CentralAlertContext";
import './centralAlert.css';
const icons = {
    error:iconError,
    confirm:iconConfirm,
    success:iconSuccess
}
const CentralAlert = () => {
    const { centralAlert, closeCentralAlert } = useContext(CentralAlertContext);
    const { title, message, type, action } = centralAlert;
    const stopClic = e => {
        e.stopPropagation();
    }
    return (
        <article className='central-alert' onClick={() => closeCentralAlert()}>
            <div className='box-content' onClick={stopClic}>
                <img src={icons[type]} alt="icon del alerta" className='header-icon' />
                <h1 className='message-alert'>{title}</h1>
                <p>{message}</p>
                {!action ?
                    <div className='btn-ok'>
                        <BtnAction 
                            value="OK" 
                            color={type} 
                            action={closeCentralAlert}
                        />
                    </div>
                    :
                    <div className='box-btns-confirm'>
                        <div className='btn-yes'>
                            <BtnAction 
                                value="Si" 
                                color={type} 
                                action={action}
                            />
                        </div>
                        <div className='btn-not'>
                            <BtnAction 
                                value="No" 
                                color="gray" 
                                action={closeCentralAlert}
                            />
                        </div>
                    </div>
                }
            </div>
        </article>
    );
}
export default CentralAlert;