import { useEffect } from 'react';
import { getUser } from "../../helpers/helpers";
import { useNavigate } from "react-router-dom";
import Intro from '../../components/intro/Intro';
import FormLogin from '../../components/formLogin/FormLogin';
import './login.css';
const Login = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const verifyUser = () => {
            const user = getUser();
            if(user) navigate('/', {replace:true});
        }
        verifyUser();
    },[navigate]);
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