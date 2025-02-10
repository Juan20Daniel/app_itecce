import { useContext, useLayoutEffect, useState } from "react";
import CareerSelectedContext from "./CareerSelectedContext";
import CareersContext from "../careers/CareersContext";
const CareerSelectedProvider = ({children}) => {
    const [ careerAbridging, setCareerAbridging ] = useState('');
    const { careers } = useContext(CareersContext);
    useLayoutEffect(() => {
        if(!careers) return;
        const careerSelected = careers.find(career => career.active);
        setCareerAbridging(careerSelected.abridging);
    },[careers]);
    return (
        <CareerSelectedContext.Provider value={{
            careerAbridging,
            setCareerAbridging
        }}>
            {children}
        </CareerSelectedContext.Provider>
    );
}

export default CareerSelectedProvider;