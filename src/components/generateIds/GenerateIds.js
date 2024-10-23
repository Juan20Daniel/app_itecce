import { useContext, useRef, useState, useLayoutEffect } from "react";
import GenerateIdContext from "../../context/generateId/GenerateIdContext";
import BoxDetails from "./componets/boxDetails/BoxDetails";
import Page from "./componets/page/Page";
import ActionsPage from "./componets/actionsPage/ActionsPage";
import { getLastItems } from "../../helpers/helpers";
import './generateIds.css';
const GenerateIds = () => {
    const [ pages, setPages ] = useState([]);
    const [ currentPage, setCurrentPage ] = useState(0);
    const [ showBack, setShowBack ] = useState(false);
    const [ isPrinting, setIsPrinting ] = useState(false);
    const [ offset, setOffset ] = useState(0);
    const { generateIdState } = useContext(GenerateIdContext);
    const { infoIdentityCard } = generateIdState;
    const componentRef = useRef();
    const promiseResolveRef = useRef(null);
    const hideStyles = useRef(false);
    useLayoutEffect(() => {
        let result = getLastItems(infoIdentityCard, offset);
        let aux = [...result];
        if(result.length > 10) aux.pop();
        setPages(lastPages => ([...lastPages, [...aux]]));
        if(result.length > 10) setOffset(count => count + 10);
    },[infoIdentityCard, offset]);
    return (
        <div className="generate-ids">
            <BoxDetails 
                totalIds={infoIdentityCard.length}
                totalPages={pages.length}
                currentPage={currentPage}
            />
            <div className="box-pages">
                <Page
                    ref={componentRef}
                    pages={pages}
                    currentPage={currentPage}
                    promiseResolveRef={promiseResolveRef}
                    isPrinting={isPrinting}
                    hideStyles={hideStyles}
                />
            </div>
            <ActionsPage
                componentRef={componentRef}
                promiseResolveRef={promiseResolveRef}
                showBack={showBack}
                hideStyles={hideStyles}
                setCurrentPage={setCurrentPage}
                totalPages={pages.length}
                setShowBack={setShowBack}
                setIsPrinting={setIsPrinting}
            />
        </div>
    );
}

export default GenerateIds;