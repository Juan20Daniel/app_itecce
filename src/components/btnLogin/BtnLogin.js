import './btnLogin.css';
import Spin from '../spin/Spin';
const BtnLogin = ({ isLoading }) => (
    <div className="box-btn-login">
        <button type="submit" className="btn-login">
            {isLoading ? <Spin /> : 'ENTRAR'}
        </button>
    </div>
);
export default BtnLogin;