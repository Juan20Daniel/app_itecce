import { useContext } from "react";
import IdTamplatesContext from "../../../../../../../../context/idTemplates/IdTemplatesContext";
import CareerSelectedContext from "../../../../../../../../context/careerSelected/CareerSelectedContext";
import "./templateReview.css";

const TemplateReview = () => {
    const {studentTemplates} = useContext(IdTamplatesContext);
    const { careerAbridging } = useContext(CareerSelectedContext);
    return (
        <figure className="box-template-review">
            <img src={`data:image/jpeg;base64,${studentTemplates.imgFront}`} alt='Plantilla de credencial' />
            <p className="career-abridging">{careerAbridging}</p>
        </figure>
    );
}
export default TemplateReview;