import { useContext } from "react";
import PageDetails from "./components/pageDetails/PageDetails";
import NotFounds from "./components/notFounds/NotFounds";
import GenerateIdsContext from "../../../../context/generateIds/GenerateIdsContext";
import './boxDetails.css';
const BoxDetails = () => {
    const { infoIdentityCardNotFound } = useContext(GenerateIdsContext);
    return (
        <div className="box-details">
            <PageDetails />
            {infoIdentityCardNotFound.length > 0 && <NotFounds />}
        </div>
    );
}
export default BoxDetails;