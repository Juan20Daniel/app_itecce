import { Link } from 'react-router-dom';
import { IconConfig } from '../../assets/IconConfig';
import './btnConfig.css';
const BtnConfig = () => {
    return (
        <Link to='/config' className="btn-config">
            <span>Configuración</span>
            <IconConfig size={18} />
        </Link>
    );
}
export default BtnConfig;