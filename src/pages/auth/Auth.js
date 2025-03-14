import Intro from '../../components/intro/Intro';
import FormAuth from '../../components/formAuth/FormAuth';
import ChangeFormAuthProvider from '../../context/changeFormAuth/ChangeFormAuthProvider';
import './auth.css';
const Auth = () => (
    <section className="login">
        <div className="box-login">
            <Intro />
            <ChangeFormAuthProvider>
                <FormAuth />
            </ChangeFormAuthProvider>
        </div>
    </section>
);

export default Auth;