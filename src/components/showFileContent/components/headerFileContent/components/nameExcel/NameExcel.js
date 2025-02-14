import { useContext } from 'react';
import { IconFile } from '../../../../../../assets/IconFile'
import AddPersonalContext from '../../../../../../context/addPersonal/AddPersonalContext';
import './nameExcel.css';
const NameExcel = () => {
  const { fileContent, nameExcel } = useContext(AddPersonalContext);
  return(
    <div className='name-excel'>
      <div className="box-circle">
        <IconFile />
      </div>
      <div className="info-excel">
        <span className='label'>Archivo</span>
        <span className="name">
          {nameExcel}
        </span>
        <p className='total'>Total de registros: {fileContent.length}</p>
      </div>
    </div>
  );
}

export default NameExcel;