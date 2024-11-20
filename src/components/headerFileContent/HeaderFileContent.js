import { IconX } from '../../assets/iconX';
import NameExcel from '../nameExcel/NameExcel';
import './headerFileContent.css';
const HeaderFileContent = ({fileContent, nameExcel, close}) => (
    <div className='header'>
        <NameExcel totalItems={fileContent.length} nameExcel={nameExcel} />
        <button className="btn-close-modal" onClick={() => close()}>
            <IconX size={20} />
        </button>
    </div>
);
export default HeaderFileContent;