import { useNavigate } from 'react-router-dom';
import iconSuccess from '../../assets/iconSuccess.png';
import { downloadExcel } from "../../functions";
import './footerFileContent.css';
const FooterFileContent = ({uploadedFile, nameExcel, inserts, updates, faileds,section, loadFile, close, isLoading}) => {
    const navigate = useNavigate();
    const goToGenerate = () => {
        close();
        navigate('/')
    }
    return (
        <div className='footer'>
            {uploadedFile && <img className='image' src={iconSuccess} alt='Icono' />}
            <p className={`title ${uploadedFile && 'enlargeText'}`}>{!uploadedFile ? `¿Guardar esta lista: ${nameExcel}?` : 'La lista se ha cargado.' }</p>
            {uploadedFile && 
                <div className='box-results'>
                    <div className='db-results'>
                        <p>Registrados: <span className='amount'>{inserts}</span></p>
                        <span>|</span>
                        <p>Actualizados: <span className='amount'>{updates}</span></p>
                    </div>
                    {faileds.length > 0 && <div className='failed-results'>
                        <p>En el excel se encontraron matrículas que ya está registradas en otra sección, los cuales no se podrán registrar o actualizar en la base de datos. Para verlos, podrás descargar la lista en el botón de abajo.</p>
                        <button type='button' onClick={() => downloadExcel(section,faileds,'No registrados')}>Descargar lista</button>
                    </div>}
                </div>
            }
            <div className='box-btns'>
                {!uploadedFile ? 
                    <>
                        <button onClick={() => close()}>No</button>
                        <button className='footer-btn' onClick={() => loadFile()}>
                            {isLoading ? "Cargando..." : 'Si'}
                        </button>
                    </>
                    :
                    <>
                        <button onClick={() => close()}>Cerrar</button>
                        <button className='footer-btn' onClick={() => goToGenerate()}>Generar credenciales</button>
                    </>
                }
            </div>
        </div>
    )
}
export default FooterFileContent;