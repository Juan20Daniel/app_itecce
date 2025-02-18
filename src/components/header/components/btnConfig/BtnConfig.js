import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { IconConfig } from '../../../../assets/IconConfig';
import './btnConfig.css';
const BtnConfig = () => {
    const { pathname } = useLocation();
    return (
        <li>
            <Link to='/config' className={`btn-config ${pathname==='/config' && 'btn-config-active'}`}>
                <span>Configuración</span>
                <IconConfig size={18} />
            </Link>
        </li>
    );
}
export default BtnConfig;