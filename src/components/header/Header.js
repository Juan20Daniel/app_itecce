import logoItecce from '../../assets/logoItecce.png';
import NavLink from '../navLink/NavLink';
import BtnConfig from '../btnConfig/BtnConfig';
import './header.css';
const Navbar = () => (
    <header>
        <img src={logoItecce} className="logiItecce" alt="Logo Itecce" />
        <nav>
            <ul className="links">
                <li>
                    <NavLink to="/" value="Generar credenciales" />
                </li>
                <li>
                    <NavLink to="/load-images" value="Subir imagenes" />
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
                    <BtnConfig />
                </li>
            </ul>
        </nav>
    </header>
);
export default Navbar;