import { IconCount } from '../../assets/IconCount';
import './btnConfig.css';
const BtnConfig = ({ showCount, setShowCount }) => {
    return (
        <button className="btn-config" type='button' onClick={() => setShowCount(!showCount)}>
            <span>Cuenta</span>
            <IconCount size={24} />
        </button>
    );
}
export default BtnConfig;