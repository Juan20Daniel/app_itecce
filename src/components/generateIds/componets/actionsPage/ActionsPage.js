import { useReactToPrint } from "react-to-print";
import Pagination from "../pagination/Pagination";
import OptionsId from "../optionsId/OptionsId";
import './actionsPage.css';
const ActionsPage = ({ componentRef, promiseResolveRef, hideStyles, setIsPrinting }) => {
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
        <div className="actions-page">
            <Pagination />
            <OptionsId print={print} />
        </div>
    );
}

export default ActionsPage;