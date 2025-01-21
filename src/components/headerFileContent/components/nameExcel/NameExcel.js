import { useState, useEffect } from 'react';
import { IconFile } from '../../../../assets/IconFile'
import { recordText } from '../../../../helpers/recordText';
import './nameExcel.css';
const NameExcel = ({totalItems, nameExcel}) => {
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
        <p className='total'>Total de registros: {totalItems}</p>
      </div>
    </div>
  );
}

export default NameExcel;