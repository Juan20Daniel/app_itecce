import { downloadExcel } from "../../../../../../helpers/excel";
import Button from '../../../../../button/Button';
import './fileUploadResult.css';

const FileUploadResult = ({inserts, updates, faileds, section}) => {
    const action = () => downloadExcel(section,faileds,'No registrados');
    return (
        <div className='file-upload-result'>
            <div className='db-results'>
                <p>Registrados: <span className='amount'>{inserts}</span></p>
                <span>|</span>
                <p>Actualizados: <span className='amount'>{updates}</span></p>
            </div>
            {faileds.length > 0 && <div className='failed-results'>
                <p>Se encontraron matrículas que ya está registradas en otra sección, los cuales no se podrán registrar o actualizar en la base de datos. 
                Para verlos, podrás descargar la lista en el botón de abajo.</p>
                <div className="box-btn-download">
                    <Button
                        value='Descargar lista'
                        type='button'
                        btnStyle='btn-download'
                        action={action}
                    />
                </div>
            </div>}
        </div>
    );
}

export default FileUploadResult;