import { useEffect } from 'react';
import './login.css';
import Intro from '../../components/intro/Intro';
import FormLogin from '../../components/formLogin/FormLogin';
import { LoginViewModel } from './LoginViewModel';
const Login = () => {
    const { verifyUser } = LoginViewModel();
    useEffect(() => {
        verifyUser();
    },[verifyUser]);
    return (
        <section className="login">
            <div className="box-login">
               <Intro />
               <FormLogin />
            </div>
        </section>
    )
}

export default Login;