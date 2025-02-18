import logoItecce from '../../assets/logoItecce.png';
import NavLink from './components/navLink/NavLink';
import BtnConfig from './components/btnConfig/BtnConfig';
import './header.css';

const Header = () => (
    <header>
        <img src={logoItecce} className="logiItecce" alt="Logo Itecce" />
        <nav>
            <ul className="links">
                <NavLink to="/" value="Generar credenciales" />
                <NavLink to="/add-personal" value="Agregar personal" />
                <BtnConfig />
            </ul>
        </nav>
    </header>
);

export default Header;