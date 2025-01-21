import { useContext } from 'react';
import iconError from '../../assets/iconError.png';
import iconConfirm from '../../assets/iconConfirm.png';
import iconSuccess from '../../assets/iconSuccess.png';
import Button from '../button/Button';
import CentralAlertContext from "../../context/centralAlert/CentralAlertContext";
import './centralAlert.css';
const icons = {
    error:iconError,
    confirm:iconConfirm,
    success:iconSuccess
}
const btnStyles = {
    error:'btn-error',
    success:'btn-success',
    confirm:'btn-confirm',
}
const CentralAlert = () => {
    const { centralAlert, closeCentralAlert } = useContext(CentralAlertContext);
    const { title, message, type, action } = centralAlert;
    const stopClic = e => e.stopPropagation();
    return (
        <article className='central-alert' onClick={() => closeCentralAlert()}>
            <div className='box-content' onClick={stopClic}>
                <img src={icons[type]} alt="icon del alerta" className='header-icon' />
                <h1 className='message-alert'>{title}</h1>
                <p>{message}</p>
                {!action ?
                    <Button
                        value="OK"
                        btnStyle={btnStyles[type]??'btn-cancel'}
                        action={closeCentralAlert}
                    />
                    :
                    <div className='box-btns-confirm'>
                        <Button
                            value="Si"
                            btnStyle={btnStyles[type]??'btn-cancel'}
                            action={action}
                        />
                        <Button
                            value="No"
                            btnStyle='btn-cancel'
                            action={closeCentralAlert}
                        />
                    </div>
                }
            </div>
        </article>
    );
}
export default CentralAlert;