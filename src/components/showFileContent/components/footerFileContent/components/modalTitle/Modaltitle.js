import { useContext } from 'react';
import AddPersonalContext from '../../../../../../context/addPersonal/AddPersonalContext';
import FileContenContext from '../../../../../../context/fileContent/FileContenContext';
import './modalTitle.css';
const ModalTitle = () => {
    const { uploadedFile } = useContext(FileContenContext);
    const { nameExcel } = useContext(AddPersonalContext);
    return (
        <p className={`modal-title ${uploadedFile && 'enlargeText'}`}>
            {!uploadedFile ? `¿Guardar esta lista: ${nameExcel}?` : 'La lista se ha cargado.' }
        </p>
    );
}

export default ModalTitle;