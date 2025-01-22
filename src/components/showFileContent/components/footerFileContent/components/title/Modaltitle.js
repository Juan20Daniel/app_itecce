import { useContext } from 'react';
import './modalTitle.css';
import AddPersonalContext from '../../../../../../context/addPersonal/AddPersonalContext';
const ModalTitle = ({uploadedFile}) => {
    const { nameExcel } = useContext(AddPersonalContext);
    return (
        <p className={`modal-title ${uploadedFile && 'enlargeText'}`}>
            {!uploadedFile ? `¿Guardar esta lista: ${nameExcel}?` : 'La lista se ha cargado.' }
        </p>
    );
}

export default ModalTitle;