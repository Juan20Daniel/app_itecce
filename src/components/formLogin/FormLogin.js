import logoItecce from '../../assets/logoItecce.png';
import './formLogin.css';
import { Link } from 'react-router-dom';
import InputGroup from '../inputGroup/InputGroup';
import {LoginFormViewModel} from './LoginFormViewModel';
import BtnLogin from '../btnLogin/BtnLogin';
import IconsSvg from '../../assets/IconsSvg';
const FormLogin = () => {
    const { userCamp, password, isLoading, setPassword, setUserCamp, login } = LoginFormViewModel();
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