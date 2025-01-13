import Intro from '../../components/intro/Intro';
import FormLogin from '../../components/formLogin/FormLogin';
import './login.css';
const Login = () => {
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