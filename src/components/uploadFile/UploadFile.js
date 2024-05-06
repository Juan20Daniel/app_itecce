import { useContext } from 'react';
import './uploadFile.css';
import AddPersonalContext from '../../context/addPersonal/AddPersonalContext';
const UploadFile = () => {
    const { inputValue, setInputValue, handleFile } = useContext(AddPersonalContext);
    return (
        <div className="upload-file">
            <h2>Selecciona la lista a cargar</h2>
            <p>Selecciona la lista de alumnos, profesores o colaboradores en excel, haciendo clic en el botón azul.</p>
            <button onClick={() => setInputValue('')}>
                <input 
                    type="file" 
                    accept=".XLSX" 
                    onChange={handleFile}
                    value={inputValue}
                />
                <span>Seleccionar lista</span>
            </button>
        </div>
    );
}

export default UploadFile;