import { useContext } from "react";
import AddPersonalContext from "../../../../context/addPersonal/AddPersonalContext";
import './btnUploadFile.css';
const BtnUploadFile = () => {
    const { inputValue, handleFile } = useContext(AddPersonalContext);
    return (
        <button className='box-upload-file'>
            <label htmlFor='file'>Seleccionar lista</label>
            <input 
                id='file'
                type="file" 
                accept=".XLSX" 
                onChange={handleFile}
                value={inputValue}
            />
        </button>
    )
}

export default BtnUploadFile;