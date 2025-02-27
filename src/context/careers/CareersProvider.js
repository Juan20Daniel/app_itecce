import { useState, useLayoutEffect } from "react";
import axiosInstance from '../../data/remote/axios.instance';
import CareersContext from "./CareersContext";
import { select } from "../../helpers/select";
const CareersProvider = ({children}) => {
    const [ careers, setCareers ] = useState([]);
    const [ error, setError ] = useState(null);
    const [ isLoadingCarrers, setIsLoadingCarrers ] = useState(true);
    const getCareers = async () => {
        try {
            setIsLoadingCarrers(true);
            setError(null);
            const response = await axiosInstance.get('/careers');
            if(response.data.length) {
                const addSelector = response.data.map((career, index) => ({...career, active:!index}));
                setCareers(addSelector);
            } else {
                setCareers(response.data);
            }
        } catch (error) {
            console.log(error);
            setError(true);
        } finally {
            setIsLoadingCarrers(false);
        }
    }
    useLayoutEffect(() => {
        getCareers();
    },[]);
    const updateCareer = (newCareer) => {
        const result = careers.map(career => {
            if(career.idCareer === newCareer.id) {
                return {
                    ...career, 
                    abridging:newCareer.abridging,
                    duration:newCareer.duration
                }
            } else return career;
        });
        setCareers(result);
    }
    const removeCareer = (id) => {
        const result = careers.filter(career => career.idCareer !== id);
        if(result.length) {
            console.log('ezce')
            result[0].active = true;
        }
        setCareers(result);

    }
    const selectCareer = (id) => {
        setCareers(select(careers, id, 'idCareer'));
    }
    return (
        <CareersContext.Provider value={{
            careers,
            error,
            isLoadingCarrers,
            getCareers,
            updateCareer,
            selectCareer,
            removeCareer
        }}>
            {children}
        </CareersContext.Provider>
    )
};

export default CareersProvider;