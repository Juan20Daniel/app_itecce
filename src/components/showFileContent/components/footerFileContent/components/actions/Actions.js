import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FileContenContext from '../../../../../../context/fileContent/FileContenContext';
import Button from '../../../../../button/Button';
import './actions.css';

const Actions = () => {
    const {uploadedFile, close, loadFile, isLoading} = useContext(FileContenContext);
    const navigate = useNavigate();
    const goToGenerate = () => {
        close();
        navigate('/');
    }
    return(
        <div className='box-actions'>
            {!uploadedFile ? 
                <>
                    <Button 
                        value='No'
                        btnStyle='btn-action'
                        action={close}
                    />
                    <Button 
                        value='Si'
                        btnStyle='btn-continue'
                        action={loadFile}
                        isLoading={isLoading}
                    />
                </>
                :
                <>
                    <Button 
                        value='Cerrar'
                        btnStyle='btn-action'
                        action={close}
                    />
                    <Button 
                        value='Generar credenciales'
                        btnStyle='btn-continue'
                        action={goToGenerate}
                    />
                </>
            }
        </div>
    );
}

export default Actions;