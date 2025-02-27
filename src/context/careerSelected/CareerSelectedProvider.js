import { useContext, useLayoutEffect, useState } from "react";
import CareerSelectedContext from "./CareerSelectedContext";
import CareersContext from "../careers/CareersContext";
const CareerSelectedProvider = ({children}) => {
    const [ careerAbridging, setCareerAbridging ] = useState('');
    const [ careerDuration, setCareerDuration ] = useState(9);
    const { careers } = useContext(CareersContext);
    useLayoutEffect(() => {
        if(!careers.length) return;
        const careerSelected = careers.find(career => career.active);
        setCareerAbridging(careerSelected.abridging);
        setCareerDuration(careerSelected.duration??0);
    },[careers]);
    return (
        <CareerSelectedContext.Provider value={{
            careerAbridging,
            careerDuration,
            setCareerAbridging,
            setCareerDuration
        }}>
            {children}
        </CareerSelectedContext.Provider>
    );
}

export default CareerSelectedProvider;