import { useContext } from "react";
import IdTamplatesContext from "../../../../../../../../context/idTemplates/IdTemplatesContext";
import "./templateReview.css";

const TemplateReview = () => {
    const {studentTemplates} = useContext(IdTamplatesContext);
    
    return (
        <figure className="box-template-review">
            <img src={`data:image/jpeg;base64,${studentTemplates.imgFront}`} alt='Plantilla de credencial' />
            <p className="career-abridging">LICENCIATURA EN DERECHO</p>
        </figure>
    );
}
export default TemplateReview;