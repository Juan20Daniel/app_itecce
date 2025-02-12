import { useReactToPrint } from "react-to-print";
import Pagination from "./components/pagination/Pagination";
import OptionsId from "./components/optionsId/OptionsId";
import './actionsPage.css';
const ActionsPage = ({ componentRef, promiseResolveRef, showBack, hideStyles, setShowBack, setIsPrinting, currentPage, setCurrentPage, pages, setPages }) => {
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
            <Pagination 
                setCurrentPage={setCurrentPage}
                totalPages={pages.length}
            />
            <OptionsId 
                print={print}
                currentPage={currentPage}
                pages={pages}
                setPages={setPages}
                showBack={showBack}
                setShowBack={setShowBack}
            />
        </div>
    );
}

export default ActionsPage;