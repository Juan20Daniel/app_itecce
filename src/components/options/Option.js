import './optionStyles.css';
import { Link } from 'react-router-dom';
const Optionds = ({ to, icon, active, value}) => {
    return (
        <Link to={to} className={`option ${active && "optionActive"}`}>
           <div className='boxOption'>
                <img className='iconOption' src={icon} alt="icono de optión" />
                <p className='valueOption'>{value}</p>
           </div>
        </Link>
    );
}
export default Optionds;