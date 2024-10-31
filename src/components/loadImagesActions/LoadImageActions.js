import { useContext } from 'react';
import BtnAction from '../btnAction/BtnAction';
import GenerateIdsContext from '../../context/generateIds/GenerateIdsContext';
import './loadImagesActions.css';

const LoadImageActions = () => {
    const { isLoading, saveImages, clear } = useContext(GenerateIdsContext);
    return (
        <div className="load-images-actions">
            <div className='btn-load-images-save'>
                <BtnAction
                    value='Siguiente'
                    color='blue'
                    action={() => saveImages()}
                    isLoading={isLoading}
                />
            </div>
            <div className='btn-load-images-cancel'>
                <BtnAction
                    value='Cancelar'
                    color='gray'
                    action={() => clear()}
                />
            </div>
        </div>
    );
}

export default LoadImageActions;