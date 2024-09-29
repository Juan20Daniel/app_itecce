import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { check } from '../../helpers/helpers';
import { saveTokenLocalStorage } from '../../data/local/localStorage';
import axiosInstance from '../../data/remote/axios.instance';
import logoItecce from '../../assets/logoItecce.png';
import InputGroup from '../inputGroup/InputGroup';
import BtnLogin from '../btnLogin/BtnLogin';
import IconsSvg from '../../assets/IconsSvg';
import CentralAlertContext from '../../context/centralAlert/CentralAlertContext';
import './formLogin.css';
const errorMesages = {
    user:'El usuario no es válido, favor de verificar que solo contenga entre 6 y 20 números o letras solamente.',
    password:'La contraseña no es válida, favor de verificar que solo contenga entre 8 y 20 caracteres.',
    userAndPass:`El usuario y la contraseña no son válidos, favor de verificar que el usuario solo contenga entre 6 y 20 números o letras solamente y 
    la contraseña entre 8 y 20 caracteres.`
}
const FormLogin = () => {
    const [ userCamp, setUserCamp ] = useState({ value:'', name:'user', state:'normal'});
    const [ password, setPassword ] = useState({ value:'', name:'password', state:'normal'});
    const [ isLoading, setIsLoading ] = useState(false);
    const { openCentralAlert } = useContext(CentralAlertContext);
    const navigate = useNavigate();
    const login = async e => {
        e.preventDefault();
        if(!verifyInfo()) return;
        try {
            setIsLoading(true);
            const result = await axiosInstance.get(`/auth/${userCamp.value}/${password.value}`);
            saveTokenLocalStorage(result.token);
            setIsLoading(false);
            navigate('/', {replace:true});

        } catch (error) {
            setIsLoading(false);
            openCentralAlert(
                'Error de acceso', 
                error.message,
                'success',
            );
        }
    }
    const verifyInfo = () => {
        let resultUser = check(userCamp.name, userCamp.value);
        let resultPass = check(password.name, password.value);
        setUserCamp({...userCamp, state:resultUser ? 'normal' : 'error'});
        setPassword({...password, state:resultPass ? 'normal' : 'error'});
        if(!resultUser || !resultPass) {
            openCentralAlert(
                'Error en uno de los campos', 
                !resultUser && !resultPass ? errorMesages.userAndPass : !resultUser ? errorMesages.user : errorMesages.password,
                'error',
            );
            return false;
        }
        return true;
    }
    return (
        <div className="box-form">
            <img src={logoItecce} alt="Logo universidad itecce" />
            <form onSubmit={login}>
                <h1>INICIAR SESIÓN</h1>
                <InputGroup 
                    placeholder="USUARIO"
                    camp={userCamp}
                    type="text"
                    setValue={setUserCamp}
                >
                    <IconsSvg 
                        type="user" 
                        size={16} 
                        color={userCamp.state === 'normal' ? '#979797' : '#AC3636'}
                    />
                </InputGroup>
                <InputGroup 
                    placeholder="CONTRASEÑA"
                    camp={password}
                    type="password"
                    setValue={setPassword}
                >
                    <IconsSvg 
                        type="password" 
                        size={16} 
                        color={password.state === 'normal' ? '#979797' : '#AC3636'}
                    />
                </InputGroup>
                <BtnLogin isLoading={isLoading} />
                <Link to="/" className='recover-pass'>Recuperar contraseña</Link>
            </form>
        </div>
    );
}
export default FormLogin;