import { useContext } from "react";
import IdTamplatesContext from "../../../../../../context/idTemplates/IdTemplatesContext";
import TemplateReview from "./components/templateReview/TemplateReview";
import NotFoundTemplate from "../../../../../notFoundTemplate/NotFoundTemplate";
import SubTitleCareerSetting from "../subTitleCareerSetting/SubTitleCareerSetting";
import "./review.css";

const Review = () => {
    const {studentTemplates} = useContext(IdTamplatesContext);
    return (
        <div className="review">
            <div className="box-review">
                <SubTitleCareerSetting value='Abreviatura en credencial' />
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