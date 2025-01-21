import iconSuccess from '../../assets/iconSuccess.png';
import ModalTitle from './components/title/Modaltitle';
import FileUploadResult from './components/fileUploadResult/FileUploadResult';
import Actions from './components/actions/Actions';
import './footerFileContent.css';
const FooterFileContent = ({uploadedFile, nameExcel, inserts, updates, faileds,section, loadFile, close, isLoading}) => {
    return (
        <div className='footer'>
            {uploadedFile && <img className='image' src={iconSuccess} alt='Icono' />}
            <ModalTitle 
                uploadedFile={uploadedFile}
                nameExcel={nameExcel}
            />
            {uploadedFile && 
                <FileUploadResult
                    inserts={inserts}
                    updates={updates}
                    faileds={faileds}
                    section={section}
                />
            }
            <Actions
                uploadedFile={uploadedFile}
                close={close}
                loadFile={loadFile}
                isLoading={isLoading}
            />
        </div>
    )
}
export default FooterFileContent;