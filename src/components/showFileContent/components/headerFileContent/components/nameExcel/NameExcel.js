import { useState, useEffect, useContext } from 'react';
import { IconFile } from '../../../../../../assets/IconFile'
import { recordText } from '../../../../../../helpers/recordText';
import './nameExcel.css';
import AddPersonalContext from '../../../../../../context/addPersonal/AddPersonalContext';
const NameExcel = () => {
  const { fileContent, nameExcel } = useContext(AddPersonalContext);
  const [anchoPantalla, setAnchoPantalla] = useState(window.innerWidth);
  const actualizarAnchoPantalla = () => setAnchoPantalla(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', actualizarAnchoPantalla);
    return () => {
      window.removeEventListener('resize', actualizarAnchoPantalla);
    };
  }, []);
  return(
    <div className='file'>
      <div className="box-circle">
        <IconFile />
      </div>
      <div className="info-file">
        <span className='label'>Archivo</span>
        <span className="name" title={recordText(nameExcel, anchoPantalla).length !== nameExcel.length ? nameExcel : ''}>
          {recordText(nameExcel, anchoPantalla)}
        </span>
        <p className='total'>Total de registros: {fileContent.length}</p>
      </div>
    </div>
  );
}

export default NameExcel;