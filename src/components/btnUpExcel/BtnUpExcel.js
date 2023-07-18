import './btnUpExcel.css';
const BtnUpExcel = ({ handleFile, inputFile }) => {
    return (
        <div className="load-excel--content">
            <h1 className="load-excel--content__title">Cargar lista de alumnos</h1>
            <p className="load-excel--content__text-info">
                Selecciona la lista de alumnos en excel, 
                haciendo clic en el botón azul.
            </p>
            <div className="load-excel--box-input-file">
                <input type="file" className="input-file" value={inputFile} id="loadExcel" onChange={handleFile} />
                <label htmlFor="loadExcel" className="label-input-file">Cargar lista</label>
            </div>
        </div>
    );
}

export default BtnUpExcel;