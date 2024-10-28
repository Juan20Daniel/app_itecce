import { useContext, useRef, useState, useLayoutEffect } from "react";
import { getLastItems } from "../../helpers/helpers";
import GenerateIdContext from "../../context/generateId/GenerateIdContext";
import BoxDetails from "./componets/boxDetails/BoxDetails";
import Page from "./componets/page/Page";
import ActionsPage from "./componets/actionsPage/ActionsPage";
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
        let resultLastItems = getLastItems(infoIdentityCard, offset);
        let resultLastItemsCopy = [...resultLastItems];
        //Verificamos si hay más páginas con el último ítem, y después lo eliminamos para que no sobre en la página actual. 
        if(resultLastItems.length > 10) resultLastItemsCopy.pop();
        let LastItemsWithTypeCard = addTypeCard(resultLastItemsCopy);
        setPages(lastPages => ([
            ...lastPages,
            {
                page:[...LastItemsWithTypeCard],
                reverse:resultLastItems.length >= 5 ? true : false,
                printedFrondPage:false,
                printedBackPage:false
            }
        ]));
        if(resultLastItems.length > 10) setOffset(count => count + 10);
    },[infoIdentityCard, offset]);
    const addTypeCard = (items) => {
        if(items.length >= 5) return items;
        let result = [...items];
        for(let i=0; i<=items.length-1; i++) {
            result.push({
                name:items[i].name,
                firstname:items[i].firstname,
                lastname:items[i].lastname,
                group_student:items[i].group_student,
                idPerson:items[i].idPerson,
                typeCard:'REVERSE',
            });
        }
        return result;
    }
    return (
        <div className="generate-ids">
            <BoxDetails 
                totalIds={infoIdentityCard.length}
                pages={pages}
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
                    showBack={showBack}
                />
            </div>
            <ActionsPage
                componentRef={componentRef}
                promiseResolveRef={promiseResolveRef}
                showBack={showBack}
                hideStyles={hideStyles}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pages={pages}
                setPages={setPages}
                setShowBack={setShowBack}
                setIsPrinting={setIsPrinting}
            />
        </div>
    );
}

export default GenerateIds;