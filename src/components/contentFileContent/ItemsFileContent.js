import ResultFile from '../resultFile/ResultFile';
import { IconPoint } from '../../assets/IconPoint';
import './ItemsFileContent.css';
const ItemsFileContent = ({ listSelected, fileContent, elementRef, data }) => (
    <ul className='items-person'>
        <div className='box-title'>
            <h1>Lista de {listSelected}</h1>
            <IconPoint size={7} />
            <span>{fileContent.length}</span>
        </div>
        {data.map((item, index) => (
            <ResultFile key={index} data={item} />
        ))}
        <div ref={elementRef}/>
    </ul>
)

export default ItemsFileContent;