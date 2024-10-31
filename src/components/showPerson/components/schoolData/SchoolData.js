import { useEffect, useCallback, useState, useContext } from "react";
import { IconSection } from "../../../../assets/IconSection";
import { IconGroup } from "../../../../assets/IconGroup";
import ItemInfo from "../itemInfo/ItemInfo";
import axiosInstance from "../../../../data/remote/axios.instance";
import HomeContext from "../../../../context/home/HomeContext";
import CentralAlertContext from "../../../../context/centralAlert/CentralAlertContext";
import './schoolData.css';
const SchoolData = ({id}) => {
    const [ schoolsection, setSchoolSection ] = useState('');
    const [ group, setgroup ] = useState('');
    const [ isLoading, setIsLoading ] = useState(true);
    const { openCentralAlert } = useContext(CentralAlertContext);
    const { generateIdState, addInfoSchool } = useContext(HomeContext);
    const { infoSchool } = generateIdState;
    const getInfoschool = useCallback( async () => {
        try {
            const result = await axiosInstance.get(`/students/info-school/${id}`);
            addInfoSchool(result.data);
            setSchoolSection(result.data[0].seccion);
            setgroup(result.data[0].group_student);
            
        } catch (error) {
            openCentralAlert('Error al consultar la información escolar',error.message,'error');
        } finally {
            setIsLoading(false);
        }
    },[id, addInfoSchool, openCentralAlert]);
    useEffect(() => {
        if(infoSchool.length === 0) getInfoschool();
        else {
            const getInfo = infoSchool.filter(item => item.idPerson_info === id);
            if(getInfo.length === 0) {
                getInfoschool();
            } else {
                setSchoolSection(getInfo[0].seccion);
                setgroup(getInfo[0].group_student);
                setIsLoading(false);
            }
        }
    },[getInfoschool, infoSchool, id]);
    return (
        <>
            {!isLoading ?
                <>
                    <ItemInfo
                        title="Carrera"
                        value={schoolsection}
                    >
                    <IconSection />
                    </ItemInfo>
                    <ItemInfo
                        title="Grupo"
                        value={group}
                    >
                        <IconGroup />
                    </ItemInfo>
                </>
                :
                <p className="message-load">Cargando información escolar...</p>
            }
        </>
    );
}

export default SchoolData;