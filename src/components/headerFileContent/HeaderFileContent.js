import iconX from '../../assets/iconX.png';
import NameExcel from '../nameExcel/NameExcel';
import './headerFileContent.css';
const HeaderFileContent = ({fileContent, nameExcel, close}) => (
    <div className='header'>
        <NameExcel totalItems={fileContent.length} nameExcel={nameExcel} />
        <button className="btn-close-modal" onClick={() => close()}>
            <img src={iconX} alt="Icon close" className="icon-close" />
        </button>
    </div>
);
export default HeaderFileContent;