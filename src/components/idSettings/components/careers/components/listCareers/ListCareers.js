import { useContext, memo } from "react";
import SubTitleSetting from "../subTitleSetting/SubTitleSetting";
import Career from "./components/career/Career";
import CareersContext from "../../../../../../context/careers/CareersContext";
import "./listCareers.css";

const ListCareers = () => {
    const { careers } = useContext(CareersContext);
    console.log(careers);
    return (
        <div className="list-careers">
            <SubTitleSetting>
                <p><span>Nombre de  la carrera  - </span> Abreviatura para credencial</p>
            </SubTitleSetting>
            <ul className="box-list-careers">
                {careers.map(career => (
                    <Career
                        key={career.idCareer}
                        id={career.idCareer}
                        fullname={career.fullname}
                        abridging={career.abridging}
                        active={career.active}
                    />
                ))}
            </ul>
        </div>
    );
}
export default memo(ListCareers);