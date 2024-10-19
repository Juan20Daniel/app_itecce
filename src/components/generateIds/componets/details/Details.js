import { useContext } from "react";
import BtnAction from "../../../btnAction/BtnAction";
import LoadImagesContext from "../../../../context/loadImages/LoadImageContext";
import './details.css';
const Details = () => {
    const { clear } = useContext(LoadImagesContext);
    return (
        <div className="details">
            <p className="title">Detalles</p>
            <ul className="list-items">
                <li className="item">Cantidad de credenciales: 20</li>
                <li className="item">Páginas: 2</li>
                <li className="item">Página actual: 1</li>
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
export default Details;