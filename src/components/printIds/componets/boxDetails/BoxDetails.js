import { useContext } from "react";
import PageDetails from "../pageDetails/PageDetails";
import NotFounds from "../notFounds/NotFounds";
import GenerateIdsContext from "../../../../context/generateIds/GenerateIdsContext";
import './boxDetails.css';
const BoxDetails = ({totalIds, pages, currentPage}) => {
    const { infoIdentityCardNotFound } = useContext(GenerateIdsContext);
    return (
        <div className="box-details">
            <PageDetails 
                totalIds={totalIds}
                pages={pages}
                currentPage={currentPage}
            />
            {infoIdentityCardNotFound.length > 0 && <NotFounds />}
        </div>
    );
}
export default BoxDetails;