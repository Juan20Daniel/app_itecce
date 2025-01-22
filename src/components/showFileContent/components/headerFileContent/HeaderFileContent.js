import NameExcel from './components/nameExcel/NameExcel';
import BtnCloseModal from './components/btnCloseModal/BtnCloseModal';
import './headerFileContent.css';
const HeaderFileContent = ({close}) => (
    <div className='header'>
        <NameExcel />
        <BtnCloseModal action={close} />
    </div>
);
export default HeaderFileContent;