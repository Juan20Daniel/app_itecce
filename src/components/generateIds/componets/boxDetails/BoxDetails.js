import { useContext } from "react";
import PageDetails from "../pageDetails/PageDetails";
import NotFounds from "../notFounds/NotFounds";
import GenerateIdContext from "../../../../context/generateId/GenerateIdContext";
import './boxDetails.css';
const BoxDetails = ({totalIds, totalPages, currentPage}) => {
    const { generateIdState } = useContext(GenerateIdContext);
    const { infoIdentityCardNotFound } = generateIdState;
    return (
        <div className="box-details">
            <PageDetails 
                totalIds={totalIds}
                totalPages={totalPages}
                currentPage={currentPage}
            />
            {infoIdentityCardNotFound.length > 0 && <NotFounds />}
        </div>
    );
}
export default BoxDetails;