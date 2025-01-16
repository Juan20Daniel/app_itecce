import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { removeTokenLocalStorage } from "../../data/local/localStorage";
import { useContext, useState } from "react";
import { IconUser } from "../../assets/IconUser";
import { IconEmail } from "../../assets/IconEmail";
import { IconPassword } from "../../assets/IconPassword";
import { IconSave } from "../../assets/IconSave";
import { check } from '../../helpers/check';
import { tokenDecoded } from "../../helpers/jwt";
import { IconLogout } from "../../assets/IconLogout";
import SettingBox from "../settingBox/SettingBox";
import InputGroup from "../inputGroup/InputGroup";
import ErrorMessage from "./components/customError/ErrorMessage";
import Button from '../button/Button';
import CentralAlertContext from "../../context/centralAlert/CentralAlertContext";
import './countSettings.css';

const CountSettings = () => {
    const [ email, setEmail ] = useState({ value:'asistentesistemas@itecce.edu.mx', name:'email', state:'normal'});
    const [ user, setUser ] = useState({ value:'Sistemas', name:'user', state:'normal'});
    const [ password, setPassword ] = useState({ value:'', name:'password', state:'normal'});
    const [ confirmPass, setConfirmPass ] = useState({ value:'', name:'password', state:'normal'});
    const { openCentralAlert } = useContext(CentralAlertContext);
    const navigate = useNavigate();
    useLayoutEffect(() => {
        tokenDecoded();
    },[]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!verifyCountData()) return;
        console.log('guardando...')
    }
    const verifyCountData = () => {
        let checkResults = [];
        let resultEmail = check(email.name, email.value);
        let resultUser = check(user.name, user.value);
        setEmail({...email, state:resultEmail ? 'normal' : 'error'});
        setUser({...user, state:resultUser ? 'normal' : 'error'});
        checkResults = [resultEmail, resultUser];
        if(password.value !== '') {
            let resultPass = check(password.name, password.value);
            checkResults.push(resultPass);
            setPassword({...password, state:resultPass ? 'normal' : 'error'});
            const comparePasswords = password.value === confirmPass.value;
            checkResults.push(comparePasswords);
            setConfirmPass({...confirmPass, state:comparePasswords ? 'normal' : 'error'});
        }
        if(checkResults.includes(false)) return false;
        return true;
    }
    const closeSession = () => {
        removeTokenLocalStorage();
        navigate('/login', {replace:true});
    }
    return (
        <SettingBox title='Cuenta'>
            <form onSubmit={handleSubmit}>
                <InputGroup
                    id='email'
                    inputStyle='input-group-setting'
                    placeholder='Correo'
                    camp={email}
                    type='email'
                    setValue={setEmail}
                >
                    <IconEmail size={20} color={email.state === 'normal' ? '#5C5C5C' : '#AC3636'} />
                    <label htmlFor='email' style={{color:email.state === 'normal' ? '#5C5C5C' : '#AC3636'}}>
                        Correo:
                    </label>
                    {email.state === 'error' && <ErrorMessage message='El correo no es válido' />}
                </InputGroup>
                <InputGroup
                    id='new-user'
                    inputStyle='input-group-setting'
                    placeholder='Usuario'
                    camp={user}
                    type='text'
                    setValue={setUser}
                >
                    <IconUser width={16} height={17} color={user.state === 'normal' ? '#5C5C5C' : '#AC3636'} />
                    <label htmlFor='new-user' style={{color:user.state === 'normal' ? '#5C5C5C' : '#AC3636'}}>
                        Usuario:
                    </label>
                   {user.state === 'error' && <ErrorMessage message='El usuario no es válido' />}
                </InputGroup>
                <InputGroup
                    id='new-pass'
                    inputStyle='input-group-setting-pass'
                    placeholder='Cambiar contraseña'
                    camp={password}
                    type='password'
                    setValue={setPassword}
                >   
                    <IconPassword size={22} color={password.state === 'normal' ? '#5C5C5C' : '#AC3636'} />
                    {password.state === 'error' && <ErrorMessage message='La contraseña no es válida' />}
                </InputGroup>
                <InputGroup
                    id='confirm-new-pass'
                    inputStyle='input-group-setting-pass'
                    placeholder='Confirmar contraseña'
                    camp={confirmPass}
                    type='password'
                    setValue={setConfirmPass}
                >   
                    <IconPassword size={22} color={confirmPass.state === 'normal' ? '#5C5C5C' : '#AC3636'} />
                    {confirmPass.state === 'error' && <ErrorMessage message='Las contraseñas no coinciden' />}
                </InputGroup>
                <div className="btns-settings">
                    <div className="box-btn-settings">
                        <Button 
                            value='Guardar'
                            type="submit"
                            btnStyle='btn-with-icon'
                        >
                            <IconSave size={20} color="#000000" />
                        </Button>
                    </div>
                    <div className="box-btn-settings">
                        <Button 
                            value='Cerrar sesión'
                            type="button"
                            btnStyle='btn-with-icon'
                            action={closeSession}
                        >
                            <IconLogout size={20} color="#000000" />
                        </Button>
                    </div>
                </div>
            </form>
        </SettingBox>
    )
}

export default CountSettings;