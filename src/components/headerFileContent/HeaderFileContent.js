import NameExcel from './components/nameExcel/NameExcel';
import BtnCloseModal from './components/btnCloseModal/BtnCloseModal';
import './headerFileContent.css';
const HeaderFileContent = ({fileContent, nameExcel, close}) => (
    <div className='header'>
        <NameExcel totalItems={fileContent.length} nameExcel={nameExcel} />
        <BtnCloseModal action={close} />
    </div>
);
export default HeaderFileContent;