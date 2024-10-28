import { IconConfig } from '../../assets/IconConfig';
import './btnConfig.css';
const BtnConfig = () => {
    return (
        <button className="btn-config" type='button'>
            <span>Configuración</span>
            <IconConfig size={18} />
        </button>
    );
}
export default BtnConfig;