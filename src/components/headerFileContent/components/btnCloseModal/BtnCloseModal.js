import { IconX } from "../../../../assets/iconX";
import './btnCloseModal.css';
const BtnCloseModal = ({action}) => (
    <button className="btn-close-modal" onClick={() => action()}>
        <IconX size={20} />
    </button>
);

export default BtnCloseModal;