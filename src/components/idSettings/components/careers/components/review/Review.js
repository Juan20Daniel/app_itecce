import { useContext } from "react";
import IdTamplatesContext from "../../../../../../context/idTemplates/IdTemplatesContext";
import TemplateReview from "./components/templateReview/TemplateReview";
import NotFoundTemplate from "../../../../../notFoundTemplate/NotFoundTemplate";
import SubTitleSetting from "../subTitleSetting/SubTitleSetting";
import "./review.css";

const Review = () => {
    const {studentTemplates} = useContext(IdTamplatesContext);
    return (
        <div className="review">
            <div className="box-review">
                <SubTitleSetting value='Abreviatura en credencial' />
                {!studentTemplates.imgFront
                    ?   <div className="box-Not-found-template">
                            <NotFoundTemplate />
                        </div>
                    :   <TemplateReview />
                }
            </div>
        </div>
    );
}
export default Review;