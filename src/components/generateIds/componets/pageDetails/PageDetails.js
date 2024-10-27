import { useContext } from "react";
import BtnAction from "../../../btnAction/BtnAction";
import LoadImagesContext from "../../../../context/loadImages/LoadImageContext";
import './pageDetails.css';
const PageDetails = ({totalIds, pages, currentPage}) => {
    const { clear } = useContext(LoadImagesContext);
    return (
        <div className="page-details">
            <p className="title">Detalles</p>
            <ul className="list-items">
                <li className="item">Cantidad de credenciales: {totalIds}</li>
                <li className="item">Páginas: {pages.length}</li>
                <li className="item">Página actual: {currentPage+1}</li>
                {pages[currentPage]?.reverse
                    ?   <>
                            <li className="item">
                                Estado de la página frontal: {pages[currentPage]?.printedFrondPage ? 'Impresa' : 'Sin imprimir'}
                            </li>
                            <li className="item">
                                Estado de la página tracera: {pages[currentPage]?.printedBackPage ? 'Impresa' : 'Sin imprimir'}
                            </li>
                        </>
                    : <li className="item">Estado de la página: {pages[currentPage]?.printedFrondPage ? 'Impresa' : 'Sin imprimir'}</li>
                }
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