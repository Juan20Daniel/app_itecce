import { useContext } from "react";
import SubTitleSetting from "../../../subTitleSetting/SubTitleSetting";
import ListCareers from "./components/listCareers/ListCareers";
import Review from "./components/review/Review";
import IdTamplatesContext from "../../../../context/idTemplates/IdTemplatesContext";
import CareersContext from "../../../../context/careers/CareersContext";
import LoaderMessage from "../loaderMessage/LoaderMessage";
import ErrorMessage from "../errorMessage/ErrorMessage";
import BtnTryAgain from "../../../btnTryAgain/BtnTryAgain";
import './careers.css';
const Careers = () => {
    const { studentTemplates, getTemplates, loadingTemplates } = useContext(IdTamplatesContext);
    const { isLoadingCarrers, error, getCareers } = useContext(CareersContext);
    return (
        <div className="careers">
            <SubTitleSetting value='Carreras' />
            <div className="box-careers">
                {loadingTemplates
                    ?   <div className='box-reposition-rigth'>
                            <LoaderMessage value='Cargando plantilla...' />
                        </div>
                    :   !studentTemplates
                            ?   <div className="error-load-tamplate">
                                    <ErrorMessage value='No fue posible cargar la plantilla.' />
                                    <BtnTryAgain action={getTemplates} />
                                </div>
                            :   <Review />
                }
                {isLoadingCarrers
                    ?   <div className='box-reposition'>
                            <LoaderMessage value='Cargando carreras...' />
                        </div>
                    : error 
                        ?   <div className='box-reposition'>
                                <ErrorMessage value='No fue posible cargar las carreras.' />
                                <BtnTryAgain action={getCareers} />
                            </div>
                        : <ListCareers />
                }
            </div>
        </div>
    );
}
export default Careers;