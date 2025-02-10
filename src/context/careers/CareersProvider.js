import { useState, useLayoutEffect } from "react";
import axiosInstance from '../../data/remote/axios.instance';
import CareersContext from "./CareersContext";
import { select } from "../../helpers/select";
const CareersProvider = ({children}) => {
    const [ careers, setCareers ] = useState(null);
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
                return {...career, abridging:newCareer.abridging}
            } else return career;
        });
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
        }}>
            {children}
        </CareersContext.Provider>
    )
};

export default CareersProvider;