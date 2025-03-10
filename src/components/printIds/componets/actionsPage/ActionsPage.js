import { useContext } from "react";
import { useReactToPrint } from "react-to-print";
import Pagination from "./components/pagination/Pagination";
import OptionsId from "./components/optionsId/OptionsId";
import PrintContext from "../../../../context/print/PrintContext";
import './actionsPage.css';
import CredentialsSheetContext from "../../../../context/credentialsSheet/CredentialsSheetContext";
const ActionsPage = () => {
    const { componentRef, promiseResolveRef, hideStyles } = useContext(PrintContext);
    const { 
        pages, 
        currentPage, 
        showBack, 
        setIsPrinting, 
        setShowBack, 
        setCurrentPage,
        setPages
    } = useContext(CredentialsSheetContext);
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