import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logoItecce from '../../assets/logoItecce.png';
import './navbarStyles.css';
import IconsSvg from '../../assets/IconsSvg';
const Navbar = () => {
    const [ showMenu, setShowMwnu ] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const goTo = (link) => {
        navigate(link);
        setShowMwnu(false)
    }
    return (
        <>
            <nav>
                <img src={logoItecce} className="logiItecce" alt="Logo Itecce" />
                <button className='btn-show-menu' onClick={() => setShowMwnu(!showMenu)}>
                    <IconsSvg type={showMenu ? "x" : "menu"} width={20} height={20} color="#585858" />
                </button>
            </nav>
            <ul className={`links ${showMenu && "showMenu"}`}>
                <li>
                    <button onClick={() => goTo("/")} className={`link ${location.pathname === "/" && "active"}`}>
                        Inicio
                    </button>
                </li>
                <li>
                    <button onClick={() => goTo("/page")} className={`link ${location.pathname === "/page" && "active"}`}>
                        Itecce credenciales
                    </button>
                </li>
                <li>
                    <button onClick={() => goTo("")} className='link'>
                        Enviar mensage
                    </button>
                </li>
                <li>
                    <button onClick={() => goTo("/page/register-individual")} className={`link ${location.pathname === "/page/register-individual" && "active"}`}>
                        Registro individual
                    </button>
                </li>
                <li>
                    <button onClick={() => goTo("/page/load-excel")} className={`link ${location.pathname === "/page/load-excel" && "active"}`}>
                        Cargar lista
                    </button>
                </li>
                <li>
                    <button onClick={() => goTo("")} className={`link ${location.pathname === "/page/generate-report" && "active"}`}>
                        Generar reporte
                    </button>
                </li>
            </ul>
        </>
    );
}
export default Navbar;