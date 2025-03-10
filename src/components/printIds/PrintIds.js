import { useContext } from "react";
import BoxDetails from "./componets/boxDetails/BoxDetails";
import Page from "./componets/page/Page";
import ActionsPage from "./componets/actionsPage/ActionsPage";
import PrintProvider from "../../context/print/PrintProvider";
import CredentialsSheetContext from "../../context/credentialsSheet/CredentialsSheetContext";
import './printIds.css';
const PrintIds = () => {
    const { pages } = useContext(CredentialsSheetContext);
    return (
        <PrintProvider>
            <div className="generate-ids">
                <BoxDetails />
                <div className="box-pages">
                    <Page />
                </div>
                {pages[0]?.page.length !== 0 &&
                    <ActionsPage />
                }
            </div>
        </PrintProvider>
    );
}

export default PrintIds;