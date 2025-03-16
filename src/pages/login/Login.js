import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { check } from '../../helpers/check';
import { saveTokenLocalStorage } from '../../data/local/localStorage';
import { IconUser } from '../../assets/IconUser';
import { IconPassword } from '../../assets/IconPassword';
import axiosInstance from '../../data/remote/axios.instance';
import CentralAlertContext from '../../context/centralAlert/CentralAlertContext';
import InputGroup from '../../components/inputGroup/InputGroup';
import TitleAuth from '../../components/titleAuth/TitleAuth';
import BtnRedirect from '../../components/btnRedirect/BtnRedirect';
import BtnAuth from '../../components/btnAuth/BtnAuth';

const errorMesages = {
    user:'El usuario no es válido, favor de verificar que solo contenga entre 6 y 20 números o letras solamente.',
    password:'La contraseña no es válida, favor de verificar que solo contenga entre 8 y 20 caracteres.',
    userAndPass:`El usuario y la contraseña no son válidos, favor de verificar que el usuario solo contenga entre 6 y 20 números o letras solamente y 
    la contraseña entre 8 y 20 caracteres.`
}
const Login = () => {
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
        <form onSubmit={login}>
            <TitleAuth value='INICIAR SESIÓN' />
            <InputGroup
                id='user'
                inputStyle='input-group-auth'
                placeholder='USUARIO'
                camp={username}
                type='text'
                setValue={setUsername}
            >
                <IconUser
                    width={16}
                    height={16}
                    color={username.state === 'normal' 
                        ? '#979797' 
                        : '#AC3636'
                    }
                />
            </InputGroup>
            <InputGroup
                id='pass'
                inputStyle='input-group-auth'
                placeholder='CONTRASEÑA'
                camp={password}
                type='password'
                setValue={setPassword}
            >
                <IconPassword
                    size={20} 
                    color={password.state === 'normal' 
                        ? '#979797' 
                        : '#AC3636'
                    }
                />
            </InputGroup>
            <BtnAuth
                value='ENTRAR'
                isLoading={isLoading}
            />
            <BtnRedirect
                value='Recuperar contraseña'
                action={() => navigate('/auth/recover-pass')}
            />
        </form>
    );
}
export default Login;