import { useState } from 'react';
import logoItecce from '../../assets/logoItecce.png';
import NavLink from '../navLink/NavLink';
import BtnConfig from '../btnConfig/BtnConfig';
import Count from '../count/Count';
import './header.css';
const Header = () => {
    const [ showCount, setShowCount ] = useState(false);
    return (
        <header>
            <img src={logoItecce} className="logiItecce" alt="Logo Itecce" />
            <nav>
                <ul className="links">
                    <li>
                        <NavLink to="/" value="Inicio" />
                    </li>
                    <li>
                        <NavLink to="/load-images" value="Generar credenciales" />
                    </li>
                    <li>
                        <NavLink to="/add-personal" value="Agregar personal" />
                    </li>
                    <li>
                        <NavLink to="/generate-report" value="Generar reporte" />
                    </li>
                    <li>
                        <NavLink to="/help" value="Ayuda" />
                    </li>
                    <li>
                        <BtnConfig
                            showCount={showCount}
                            setShowCount={setShowCount}
                        />
                    </li>
                </ul>
            </nav>
            {showCount && <Count />}
        </header>
    )
}
export default Header;