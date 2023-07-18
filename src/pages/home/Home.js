import './homeStyles.css';
import backImage from '../../assets/backImage.png';
import office_work from '../../assets/Office_work.png';
import Optionds from '../../components/options/Option';
import iconItecceIds from '../../assets/itecceIds.png';
import iconSendMS from '../../assets/iconSendMS.png';
import iconRegister from '../../assets/iconRegister.png';
import iconUpExcel from '../../assets/iconUpExcel.png';
import iconReport from '../../assets/iconReport.png';
const Home = () => {
    return (
        <div className="home">
            <div className="content-home">
                <div className='box-title-home'>
                    <h1 className='title-home'>Credenciales Itecce</h1>
                </div>
                <div className='boxImage'>
                    <img src={backImage} className="imgBack" alt="img bde fondo" />
                </div>
                <div className='menu'> 
                    <div className='boxOptions'>
                        <Optionds
                            to="/page"
                            icon={iconItecceIds}
                            active={true}
                            value="Itecce credenciales"
                        />
                        <Optionds
                            to="/send-message"
                            icon={iconSendMS}
                            active={false}
                            value="Enviar mensages"
                        />
                        <Optionds
                            to="/page/register-individual"
                            icon={iconRegister}
                            active={false}
                            value="Registro individual"
                        />
                        <Optionds
                            to="/page/load-excel"
                            icon={iconUpExcel}
                            active={false}
                            value="Cargar lista de alumnos"
                        />
                        <Optionds
                            to="/generate-report"
                            icon={iconReport}
                            active={false}
                            value="Generar reporte"
                        />
                    </div> 
                </div>
                <img src={office_work} alt="ilustration bottom" className='officeWork' />
            </div>
        </div>
    );
}

export default Home;