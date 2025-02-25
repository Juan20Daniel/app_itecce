import { useContext, memo } from "react";
import Career from "./components/career/Career";
import CareersContext from "../../../../../../context/careers/CareersContext";
import LoaderMessage from "../../../loaderMessage/LoaderMessage";
import BtnTryAgain from "../../../../../btnTryAgain/BtnTryAgain";
import ErrorMessage from "../../../errorMessage/ErrorMessage";
import "./listCareers.css";

const ListCareers = () => {
    const {isLoadingCarrers, error, careers, getCareers } = useContext(CareersContext);
    return (
        <div className="list-careers">
            {isLoadingCarrers
                ?   <LoaderMessage value='Cargando carreras...' />
                :   error
                        ?    <div className='box-reposition'>
                                <ErrorMessage value='No fue posible cargar las carreras.' />
                                <BtnTryAgain action={getCareers} />
                            </div>
                        :   <ul className="box-list-careers">
                                {careers.map(career => (
                                    <Career
                                        key={career.idCareer}
                                        id={career.idCareer}
                                        fullname={career.fullname}
                                        abridging={career.abridging}
                                        duration={career.duration??0}
                                        active={career.active}
                                    />
                                ))}
                            </ul>
            }
        </div>
    );
}
export default memo(ListCareers);