import { useContext } from "react";
import BtnAction from "../../../btnAction/BtnAction";
import LoadImagesContext from "../../../../context/loadImages/LoadImageContext";
import './pageDetails.css';
const PageDetails = ({totalIds, totalPages, currentPage}) => {
    const { clear } = useContext(LoadImagesContext);
    return (
        <div className="page-details">
            <p className="title">Detalles</p>
            <ul className="list-items">
                <li className="item">Cantidad de credenciales: {totalIds}</li>
                <li className="item">Páginas: {totalPages}</li>
                <li className="item">Página actual: {currentPage+1}</li>
                <li className="item">Estado de la página: Sin imprimir</li>
                <div className='box-btn-out'>
                    <BtnAction
                        value='Salir'
                        color='gray'
                        action={() => clear()}
                    />
                </div>
            </ul>
        </div>
    );
}
export default PageDetails;