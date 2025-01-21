import './modalTitle.css';

const ModalTitle = ({uploadedFile, nameExcel}) => (
    <p className={`modal-title ${uploadedFile && 'enlargeText'}`}>
        {!uploadedFile ? `¿Guardar esta lista: ${nameExcel}?` : 'La lista se ha cargado.' }
    </p>
);

export default ModalTitle;