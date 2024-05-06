import ilustrationTop from '../../assets/ilustrationTop.png';
import ilustrationBottom from '../../assets/ilustrationBottom.png';
import './intro.css';
const Intro = () => (
    <div className="intro">
        <img src={ilustrationTop} alt='imgs credenciales' className='ilustrationTop' />
        <p>Biendenido al generador de credenciales de la universidad ITECCE.</p>
        <img src={ilustrationBottom} alt='imgs credenciales' className='ilustrationBottom' />
    </div>
);
export default Intro