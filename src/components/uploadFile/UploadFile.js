import BtnUploadFile from './components/btnUploadFile/BtnUploadFile';
import './uploadFile.css';
const UploadFile = () => (
    <div className="upload-file">
        <h2>Selecciona la lista a cargar</h2>
        <p>Selecciona la lista de alumnos, profesores o colaboradores en Excel, haciendo clic en el botón azul.</p>
        <BtnUploadFile />
    </div>
);

export default UploadFile;