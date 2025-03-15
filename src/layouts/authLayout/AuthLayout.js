import { Outlet } from 'react-router-dom';
import Intro from '../../components/intro/Intro';
import logoItecce from '../../assets/logoItecce.png';
import './authLayout.css';
const AuthLayout = () => (
    <section className="auth-layout">
        <div className="box-auth-layout">
            <Intro />
            <div className="box-form-auth">
                <img src={logoItecce} alt="Logo universidad itecce" />
                <Outlet />
            </div>
        </div>
    </section>
);

export default AuthLayout;