import './alertStyles.css';
import { useDispatch } from 'react-redux';
import { activeAlert } from '../../redux/dataSlice';
import BtnAction from '../btnAction/BtnAction';
const iconsAlert = {
    iconSuccess:require('../../assets/iconSuccess.png'),
    iconError:require('../../assets/iconError.png'),
}
const Alert = ({ alert }) => {
    const dispatch = useDispatch();
    const closeAlert = () => {
        dispatch(activeAlert({ active:false, icon:'', messsage:'' }));
    }
    const stopClick = e => {
        e.stopPropagation();
    }
    return (
        <>
            {alert[0].active &&
                <div className='alert' onClick={() => closeAlert()}>
                    <div className='box-content' onClick={stopClick}>
                        <div className='center-alert'>
                            <div className='header-alert'>
                                <img src={iconsAlert[alert[0].icon]} alt="icon error" className='header-icon' />
                                <p className='message-alert'>{alert[0].message}</p>
                            </div>
                            <div className='btn-ok'>
                                <BtnAction value="OK" color="blue" action={closeAlert} />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Alert;