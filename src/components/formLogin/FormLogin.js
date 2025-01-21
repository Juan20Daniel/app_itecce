import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { check } from '../../helpers/check';
import { saveTokenLocalStorage } from '../../data/local/localStorage';
import { IconUser } from '../../assets/IconUser';
import { IconPassword } from '../../assets/IconPassword';
import axiosInstance from '../../data/remote/axios.instance';
import logoItecce from '../../assets/logoItecce.png';
import InputGroup from '../inputGroup/InputGroup';
import Button from '../button/Button';
import CentralAlertContext from '../../context/centralAlert/CentralAlertContext';
import './formLogin.css';
const errorMesages = {
    user:'El usuario no es válido, favor de verificar que solo contenga entre 6 y 20 números o letras solamente.',
    password:'La contraseña no es válida, favor de verificar que solo contenga entre 8 y 20 caracteres.',
    userAndPass:`El usuario y la contraseña no son válidos, favor de verificar que el usuario solo contenga entre 6 y 20 números o letras solamente y 
    la contraseña entre 8 y 20 caracteres.`
}
const FormLogin = () => {
    const [ username, setUsername ] = useState({ value:'', name:'username', state:'normal'});
    const [ password, setPassword ] = useState({ value:'', name:'password', state:'normal'});
    const [ isLoading, setIsLoading ] = useState(false);
    const { openCentralAlert } = useContext(CentralAlertContext);
    const navigate = useNavigate();
    const login = async e => {
        e.preventDefault();
        if(!verifyUserData()) return;
        try {
            setIsLoading(true);
            const result = await axiosInstance.get(`/auth`, {
                params: {
                    username:username.value,
                    password:password.value
                }
            });
            saveTokenLocalStorage(result.token);
            setIsLoading(false);
            navigate('/', {replace:true});
        } catch (error) {
            setIsLoading(false);
            openCentralAlert(
                'Error de acceso', 
                error.message,
                'error',
            );
        }
    }
    const verifyUserData = () => {
        let resultUser = check(username.name, username.value);
        let resultPass = check(password.name, password.value);
        setUsername({...username, state:resultUser ? 'normal' : 'error'});
        setPassword({...password, state:resultPass ? 'normal' : 'error'});
        if(!resultUser || !resultPass) {
            openCentralAlert(
                'Error en uno de los campos', 
                !resultUser && !resultPass 
                    ? errorMesages.userAndPass 
                    : !resultUser 
                        ? errorMesages.user 
                        : errorMesages.password,
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
                    id='user'
                    inputStyle='input-group-login'
                    placeholder='USUARIO'
                    camp={username}
                    type='text'
                    setValue={setUsername}
                >
                    <IconUser
                        type='user'
                        width={16}
                        height={16}
                        size={16}
                        color={username.state === 'normal' ? '#979797' : '#AC3636'}
                    />
                </InputGroup>
                <InputGroup
                    id='pass'
                    inputStyle='input-group-login'
                    placeholder='CONTRASEÑA'
                    camp={password}
                    type='password'
                    setValue={setPassword}
                >
                    <IconPassword 
                        size={20} 
                        color={password.state === 'normal' ? '#979797' : '#AC3636'}
                    />
                </InputGroup>
                <div className='box-btn-login'>
                    <Button
                        value='ENTRAR'
                        type='submit'
                        btnStyle='btn-login'
                        isLoading={isLoading}
                    />
                </div>
                <Link to="/" className='recover-pass'>Recuperar contraseña</Link>
            </form>
        </div>
    );
}
export default FormLogin;