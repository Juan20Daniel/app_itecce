import { NavLink as Link } from "react-router-dom";
import './navLink.css';
const NavLink = ({ to, value }) => (
    <Link to={to} className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
        {value}
    </Link>
);

export default NavLink;