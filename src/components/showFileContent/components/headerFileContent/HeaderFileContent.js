import NameExcel from './components/nameExcel/NameExcel';
import BtnCloseModal from './components/btnCloseModal/BtnCloseModal';
import './headerFileContent.css';
const HeaderFileContent = () => (
    <div className='header'>
        <NameExcel />
        <BtnCloseModal />
    </div>
);
export default HeaderFileContent;