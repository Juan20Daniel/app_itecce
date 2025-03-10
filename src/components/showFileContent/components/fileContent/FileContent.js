import { IconPoint } from '../../../../assets/IconPoint';
import { useContext } from 'react';
import ResultFile from './components/resultFile/ResultFile';
import AddPersonalContext from '../../../../context/addPersonal/AddPersonalContext';
import FileContenContext from '../../../../context/fileContent/FileContenContext';
import './fileContent.css';
const ItemsFileContent = () => {
    const { listSelected, elementRef, data } = useContext(FileContenContext);
    const { fileContent } = useContext(AddPersonalContext);
    return (
        <ul className='items-person'>
            <div className='box-title'>
                <h1>Lista de {listSelected}</h1>
                <IconPoint size={7} />
                <span>{fileContent.length}</span>
            </div>
            {data.map((item, index) => (
                <ResultFile 
                    key={index} 
                    data={item} 
                />
            ))}
            <div ref={elementRef}/>
        </ul>
    );
}

export default ItemsFileContent;