import { useContext } from "react";
import Button from '../../../../../button/Button';
import GenerateIdsContext from "../../../../../../context/generateIds/GenerateIdsContext";
import CentralAlertContext from "../../../../../../context/centralAlert/CentralAlertContext";
import ItemDetail from "./components/itemDetail/ItemDetail";
import './pageDetails.css';

const PageDetails = ({totalIds, pages, currentPage}) => {
    const { openCentralAlert } = useContext(CentralAlertContext);
    const { clear } = useContext(GenerateIdsContext);
    const exit = () => {
        openCentralAlert('Salir del generador', '¿Seguro que quieres salir del generador de credenciales?', 'confirm', clear)
    }
    return (
        <div className="page-details">
            <p className="title">Detalles</p>
            <ul className="list-items-details">
                <ItemDetail 
                    label='Cantidad de credenciales'
                    value={totalIds}
                />
                <ItemDetail 
                    label='Páginas'
                    value={pages.length}
                />
                <ItemDetail 
                    label='Página actual'
                    value={currentPage+1}
                />
                {pages[currentPage]?.reverse
                    ?   <>
                            <ItemDetail 
                                label='Estado de la página frontal'
                                value={pages[currentPage]?.printedFrondPage ? 'Impresa' : 'Sin imprimir'}
                            />
                            <ItemDetail 
                                label='Estado de la página tracera'
                                value={pages[currentPage]?.printedBackPage ? 'Impresa' : 'Sin imprimir'}
                            />
                        </>
                    :  <ItemDetail 
                            label='Estado de la página'
                            value={pages[currentPage]?.printedFrondPage ? 'Impresa' : 'Sin imprimir'}
                        />
                }
                <div className='box-btn-out-generator'>
                    <Button
                        value='Salir'
                        type='button'
                        btnStyle='btn-out-generator'
                        action={exit}
                    />
                </div>
            </ul>
        </div>
    );
}
export default PageDetails;