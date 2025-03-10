import HeaderFileContent from './components/headerFileContent/HeaderFileContent';
import FileContent from './components/fileContent/FileContent';
import FooterFileContent from './components/footerFileContent/FooterFileContent';
import FileContenProvider from "../../context/fileContent/FileContenProvider";
import './showFileContent.css';
const ShowFileContent = () => (
    <FileContenProvider>
        <div className='file-content'>
            <HeaderFileContent />
            <FileContent />
            <FooterFileContent />
        </div>
    </FileContenProvider>
);

export default ShowFileContent;