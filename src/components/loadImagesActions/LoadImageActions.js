import { useContext } from 'react';
import Button from '../button/Button';
import GenerateIdsContext from '../../context/generateIds/GenerateIdsContext';
import './loadImagesActions.css';

const LoadImageActions = () => {
    const { isLoading, saveImages, clear } = useContext(GenerateIdsContext);
    return (
        <div className="load-images-actions">
            <Button
                value='Siguiente'
                btnStyle='btn-load-images-save'
                action={saveImages}
                isLoading={isLoading}
            />
            <Button
                value='Cancelar'
                btnStyle='btn-load-images-cancel'
                action={clear}
            />
        </div>
    );
}

export default LoadImageActions;