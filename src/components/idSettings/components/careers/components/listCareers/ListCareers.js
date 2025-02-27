import { useContext, memo } from "react";
import CareersContext from "../../../../../../context/careers/CareersContext";
import Career from "./components/career/Career";
import "./listCareers.css";

const ListCareers = () => {
    const {careers} = useContext(CareersContext);
    return (
        <div className="list-careers">
            <ul className="box-list-careers">
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
        </div>
    );
}
export default memo(ListCareers);