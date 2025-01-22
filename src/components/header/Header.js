import logoItecce from '../../assets/logoItecce.png';
import NavLink from '../navLink/NavLink';
import BtnConfig from './components/btnConfig/BtnConfig';
import './header.css';

const Header = () => (
    <header>
        <img src={logoItecce} className="logiItecce" alt="Logo Itecce" />
        <nav>
            <ul className="links">
                <li>
                    <NavLink to="/" value="Generar credenciales" />
                </li>
                <li>
                    <NavLink to="/add-personal" value="Agregar personal" />
                </li>
                <li>
                    <BtnConfig />
                </li>
            </ul>
        </nav>
    </header>
);

export default Header;