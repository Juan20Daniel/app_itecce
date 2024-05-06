import { NavLink } from 'react-router-dom';
import { IconConfig } from '../../assets/IconConfig';
import './btnConfig.css';
const BtnConfig = () => (
    <NavLink to="/config" className={({isActive}) => isActive ? "btn-config btn-config-active" : "btn-config"}>
        {({isActive}) => (
            <>
                <span>Configuración</span>
                <IconConfig size={15} color={isActive ? "#ffffff" : "rgb(168, 168, 168)"} /> 
            </>
        )}
    </NavLink>
);
export default BtnConfig;