import { IconDownload } from "../../assets/IconDownLoad";
import Spin from "../spin/Spin";
import './btnDownload.css';
const BtnDownLoad = ({ action, isLoading=false }) => {
    return (
        <button type='button' className="btn-download" onClick={() => action()}>
            {!isLoading ?
                <>
                    <span>Descargar</span>
                    <IconDownload 
                        size={24}
                        color="white"
                    />
                </>
                :
                <>
                    <span>Descargando...</span>
                    <Spin color="white" />
                </>
            }
        </button>
    );
}
export default BtnDownLoad;