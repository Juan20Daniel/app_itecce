import { useContext, useRef, useState } from "react";
import GenerateIdContext from "../../context/generateId/GenerateIdContext";
import Details from "./componets/details/Details";
import Page from "./componets/page/Page";
import ActionsPage from "./componets/actionsPage/ActionsPage";
import './generateIds.css';
const GenerateIds = () => {
    const { generateIdState } = useContext(GenerateIdContext);
    const { images } = generateIdState;
    console.log(images);

    const [ showBack, setShowBack ] = useState(false);
    const [ isPrinting, setIsPrinting ] = useState(false);
    const componentRef = useRef();
    const promiseResolveRef = useRef(null);
    const hideStyles = useRef(false);
    return (
        <div className="generate-ids">
            <Details />
            <div className="box-pages">
                <Page
                    ref={componentRef}
                    showBack={showBack}
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
                setShowBack={setShowBack}
                setIsPrinting={setIsPrinting}
            />
        </div>
    );
}

export default GenerateIds;