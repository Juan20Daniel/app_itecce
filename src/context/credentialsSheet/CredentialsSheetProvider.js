import { useContext, useLayoutEffect, useState } from "react";
import { getLastItems } from "../../helpers/getLastItems";
import CredentialsSheetContext from "./CredentialsSheetContext";
import GenerateIdsContext from "../generateIds/GenerateIdsContext";

const CredentialsSheetProvider = ({children}) => {
    const [ pages, setPages ] = useState([]);
    const [ currentPage, setCurrentPage ] = useState(0);
    const [ showBack, setShowBack ] = useState(false);
    const [ isPrinting, setIsPrinting ] = useState(false);
    const [ offset, setOffset ] = useState(0);
    const { infoIdentityCard } = useContext(GenerateIdsContext);

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
                groupStudent:items[i].groupStudent,
                idClient:items[i].idClient,
                idSectionClients:items[i].idSectionClients,
                duration:items[i].duration,
                idCareer:items[i].idCareer,
                typeCard:'reverse',
            });
        }
        return result;
    }
    return (
        <CredentialsSheetContext.Provider value={{
            pages,
            currentPage,
            showBack,
            isPrinting,
            setIsPrinting,
            setShowBack,
            setCurrentPage,
            setPages
        }}>
            {children}
        </CredentialsSheetContext.Provider>
    );
}

export default CredentialsSheetProvider;