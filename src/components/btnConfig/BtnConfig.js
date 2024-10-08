import { IconConfig } from '../../assets/IconConfig';
import './btnConfig.css';
const BtnConfig = ({ showCount, setShowCount }) => {
    return (
        <button className="btn-config" type='button' onClick={() => setShowCount(!showCount)}>
            <span>Configuración</span>
            <IconConfig size={18} />
        </button>
    );
}
export default BtnConfig;