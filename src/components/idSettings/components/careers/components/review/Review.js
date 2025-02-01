import { useContext } from "react";
import IdTamplatesContext from "../../../../../../context/idTamplates/IdTamplatesContext";
import "./review.css";

const Review = () => {
    const {loadingTemplates, studentTemplates} = useContext(IdTamplatesContext);
    console.log(loadingTemplates);
    return (
        <div className="review">
            <p className="title-review">Abreviatura en credencial</p>
            
        </div>
    );
}
export default Review;