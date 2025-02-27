import { useContext } from "react";
import IdTamplatesContext from "../../../../../../context/idTemplates/IdTemplatesContext";
import TemplateReview from "./components/templateReview/TemplateReview";
import NotFoundTemplate from "../../../../../notFoundTemplate/NotFoundTemplate";
import SubTitleCareerSetting from "../subTitleCareerSetting/SubTitleCareerSetting";
import LoaderMessage from "../../../loaderMessage/LoaderMessage";
import ErrorMessage from "../../../errorMessage/ErrorMessage";
import BtnTryAgain from "../../../../../btnTryAgain/BtnTryAgain";
import "./review.css";

const Review = () => {
    const {loadingTemplates, getTemplates, studentTemplates} = useContext(IdTamplatesContext);
    return (
        <div className="review">
            {loadingTemplates
                ?   <LoaderMessage value='Cargando plantilla...' />
                :  !studentTemplates
                        ?   <>
                                <ErrorMessage value='No fue posible cargar la plantilla.' />
                                <BtnTryAgain action={getTemplates} />
                            </>
                        :
                            <div className="box-review">
                                <SubTitleCareerSetting value='Abreviatura en credencial' />
                                {!studentTemplates.imgFront
                                    ?   <div className="box-Not-found-template">
                                            <NotFoundTemplate />
                                        </div>
                                    :   <TemplateReview />
                                }
                            </div>
            }
        </div>
    );
}
export default Review;