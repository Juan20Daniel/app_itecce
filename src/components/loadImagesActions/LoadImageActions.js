import { useContext } from 'react';
import BtnAction from '../btnAction/BtnAction';
import './loadImagesActions.css';
import LoadImagesContext from '../../context/loadImages/LoadImageContext';

const LoadImageActions = () => {
    const { isLoading, saveImages, cancel } = useContext(LoadImagesContext);
    return (
        <div className="load-images-actions">
            <div className='btn-load-images-save'>
                <BtnAction
                    value='Cargar imagenes'
                    color='blue'
                    action={() => saveImages()}
                    isLoading={isLoading}
                />
            </div>
            <div className='btn-load-images-cancel'>
                <BtnAction
                    value='Cancelar'
                    color='gray'
                    action={() => cancel()}
                />
            </div>
        </div>
    );
}

export default LoadImageActions;