import { useContext } from "react";
import { useReactToPrint } from "react-to-print";
import GenerateIdContext from "../../../../context/generateId/GenerateIdContext";
import './footer.css';
const Footer = ({ componentRef, promiseResolveRef, hideStyles, showBack, setShowBack, setIsPrinting }) => {
    const { generateIdState } = useContext(GenerateIdContext);
    const { selectedPersons } = generateIdState;

    const print = useReactToPrint({
        content:() => componentRef.current,
        onBeforeGetContent:() => {
            return new Promise((resolve) => {
                hideStyles.current = true;
                promiseResolveRef.current = resolve;
                setIsPrinting(true);
            })
        },
        onAfterPrint: () => {
            hideStyles.current = false;
            promiseResolveRef.current = null;
            setIsPrinting(false);
        }
    });
    return (
        <div className="box-buttons-footer">
            <div className="buttons">
                <button className='btn-footer btn-generate' onClick={() => print()}>Generar credenciales</button>
                {(selectedPersons.length >= 4) &&
                    <>
                        {showBack ? 
                            <button className='btn-footer' onClick={() => setShowBack(false)}>Ver anverso</button>
                        :
                            <button className='btn-footer' onClick={() => setShowBack(true)}>Ver reverso</button>}
                    </>
                }
            </div>
        </div>
    )
}

export default Footer;