import { useContext } from "react";
import { IconPoint } from "../../../../assets/IconPoint";
import { IconRefresh } from "../../../../assets/IconRefresh";
import SubTitleSetting from "../../../subTitleSetting/SubTitleSetting";
import Spin from "../../../spin/Spin";
import CareersContext from "../../../../context/careers/CareersContext";
import ListCareers from "./components/listCareers/ListCareers";
import LoaderMessage from "../loaderMessage/LoaderMessage";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Review from "./components/review/Review";
import Button from "../../../button/Button";
import './careers.css';
const Careers = () => {
    const { careers, isLoadingCarrers, error, getCareers } = useContext(CareersContext);
    return (
        <div className="careers">
            <div className="box-subtitle-career">
                <SubTitleSetting value='Carreras' />
                <IconPoint size={6} />
                <span className="cant-careers">{careers.length}</span>
                <div className="box-refresh-careers">
                    <span>Recargar</span>
                    <Button
                        type="button"
                        action={getCareers}
                        btnStyle='btn-refresh-careers'
                    >
                        {isLoadingCarrers
                            ? <Spin size={15} />
                            : <IconRefresh size={20} />
                        }
                    </Button>
                </div>
            </div>

            {isLoadingCarrers 
                ?   <LoaderMessage value='Cargando carreras...' />
                :   error 
                        ?   <ErrorMessage value='No fue posible cargar las carreras.' />
                        :   !careers.length
                                ?   <div className="not-found-careers">
                                        <p>No se encontraron carreras registradas.</p>
                                        <p className="note">Las carreras se registran de forma automática al cargar el archivo Excel con la información de los alumnos.</p>
                                    </div>
                                :   <div className="box-careers">
                                        <Review />
                                        <ListCareers />
                                    </div>
            }
        </div>
    );
}
export default Careers;