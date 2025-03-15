import { useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { removeTokenLocalStorage, saveTokenLocalStorage } from "../../data/local/localStorage";
import { useContext, useState } from "react";
import { IconUser } from "../../assets/IconUser";
import { IconEmail } from "../../assets/IconEmail";
import { IconPassword } from "../../assets/IconPassword";
import { IconSave } from "../../assets/IconSave";
import { check } from '../../helpers/check';
import { tokenDecoded } from "../../helpers/jwt";
import { IconLogout } from "../../assets/IconLogout";
import axiosInstance from "../../data/remote/axios.instance";
import SettingBox from "../settingBox/SettingBox";
import InputGroup from "../inputGroup/InputGroup";
import ErrorMessage from "./components/customError/ErrorMessage";
import BtnSetting from "../btnSetting/BtnSetting";
import CentralAlertContext from "../../context/centralAlert/CentralAlertContext";
import './countSettings.css';

const CountSettings = () => {
    const [ email, setEmail ] = useState({ value:'', name:'email', state:'normal'});
    const [ username, setUsername ] = useState({ value:'', name:'username', state:'normal'});
    const [ password, setPassword ] = useState({ value:'', name:'password', state:'normal'});
    const [ confirmPass, setConfirmPass ] = useState({ value:'', name:'password', state:'normal'});
    const [ isLoading, setIsLoading ] = useState(false);
    const { openCentralAlert } = useContext(CentralAlertContext);
    const initializeUser = useRef(tokenDecoded());
    const navigate = useNavigate();
    useLayoutEffect(() => {
        setEmail(preState => ({...preState, value:initializeUser.current.email}));
        setUsername(preState => ({...preState, value:initializeUser.current.username}));
    },[]);
    const clearInputs = () => {
        setPassword({ value:'', name:'password', state:'normal'});
        setConfirmPass({ value:'', name:'password', state:'normal'});
    }
    const updateInfo = async (data) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.patch('/users', data);
            if(response.hasOwnProperty('token')) saveTokenLocalStorage(response.token);
            
            openCentralAlert('Modificación de datos', 'Los datos se actualizaron de forma correcta.','success');
            clearInputs();
        } catch (error) {
            console.log(error);
            openCentralAlert('Modificación de datos', 'No se encontraron cambios para actualizar','error');
        } finally {
            setIsLoading(false);
        }
    }
    const verifyCountData = () => {
        let checkResults = [];
        let resultEmail = check(email.name, email.value);
        let resultUser = check(username.name, username.value);
        setEmail({...email, state:resultEmail ? 'normal' : 'error'});
        setUsername({...username, state:resultUser ? 'normal' : 'error'});
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
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!verifyCountData()) return;
        let data = {}
        const {email:initialEmail, username:initialUsername} = initializeUser.current;
        if(initialEmail !== email.value) data.email = email.value;
        if(initialUsername !== username.value) data.username = username.value;
        if(password.value !== '') data.password = password.value;
        if(!Object.keys(data).length) {
            return openCentralAlert('Modificación de datos', 'No se encontraron cambios para actualizar','success');
        }
        updateInfo(data);
    }
    const closeSession = () => {
        removeTokenLocalStorage();
        navigate('/auth', {replace:true});
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
                    camp={username}
                    type='text'
                    setValue={setUsername}
                >
                    <IconUser width={16} height={17} color={username.state === 'normal' ? '#5C5C5C' : '#AC3636'} />
                    <label htmlFor='new-user' style={{color:username.state === 'normal' ? '#5C5C5C' : '#AC3636'}}>
                        Usuario:
                    </label>
                   {username.state === 'error' && <ErrorMessage message='El usuario no es válido' />}
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
                    <BtnSetting
                        value='Guardar'
                        type="submit"
                        isLoading={isLoading}
                    >
                        <IconSave size={20} color="#000000" />
                    </BtnSetting>
                    <BtnSetting
                        value='Cerrar sesión'
                        type="button"
                        action={closeSession}
                    >
                        <IconLogout size={20} color="#000000" />
                    </BtnSetting>
                </div>
            </form>
        </SettingBox>
    );
}

export default CountSettings;