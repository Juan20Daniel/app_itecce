import { useContext } from 'react';
import logoItecce from '../../assets/logoItecce.png';
import Login from './components/login/Login';
import RecoverPass from './components/recoverPass/RecoverPass';
import ChangeFormAuthContext from '../../context/changeFormAuth/ChangeFormAuthContext';
import './formAuth.css';

const FormAuth = () => {
    const {showLogin} = useContext(ChangeFormAuthContext);
    return (
        <div className="box-form-auth">
            <img src={logoItecce} alt="Logo universidad itecce" />
            {showLogin 
                ?   <Login />
                :   <RecoverPass />}
        </div>
    );
}
export default FormAuth;