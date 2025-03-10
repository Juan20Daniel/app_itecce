import { useContext } from "react";
import { IconX } from "../../../../../../assets/iconX";
import FileContenContext from "../../../../../../context/fileContent/FileContenContext";
import './btnCloseModal.css';
const BtnCloseModal = () => {
    const { close } = useContext(FileContenContext);
    return (
        <button className="btn-close-modal" onClick={() => close()}>
            <IconX size={20} />
        </button>
    )
}

export default BtnCloseModal;