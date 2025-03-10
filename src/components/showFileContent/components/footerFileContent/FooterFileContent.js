import { useContext } from 'react';
import iconSuccess from '../../../../assets/iconSuccess.png';
import ModalTitle from './components/modalTitle/Modaltitle';
import FileUploadResult from './components/fileUploadResult/FileUploadResult';
import Actions from './components/actions/Actions';
import FileContenContext from '../../../../context/fileContent/FileContenContext';
import './footerFileContent.css';
const FooterFileContent = () => {
    const {uploadedFile} = useContext(FileContenContext);
    return (
        <div className='footer'>
            {uploadedFile && <img className='image' src={iconSuccess} alt='Icono' />}
            <ModalTitle />
            {uploadedFile && <FileUploadResult />}
            <Actions />
        </div>
    )
}

export default FooterFileContent;