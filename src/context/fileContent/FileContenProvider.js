import { useContext, useEffect, useRef, useState } from "react";
import FileContenContext from "./FileContenContext";
import CentralAlertContext from "../centralAlert/CentralAlertContext";
import AddPersonalContext from "../addPersonal/AddPersonalContext";
import axiosInstance from "../../data/remote/axios.instance";
import SectionOptionsContext from "../sectionOptions/SectionOptionsContext";
const FileContenProvider = ({children}) => {
    const [ offset, setOffset ] = useState(0);
    const [ data, setData ] = useState([]);
    const [ listSelected, setListSelected ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const [ uploadedFile, setUploadedFile ] = useState(false);
    const [ inserts, setInserts ] = useState(0);
    const [ updates, setUpdates ] = useState(0);
    const [ faileds, setFaileds ] = useState([]);
    const [ section, setSection ] = useState('');
    const { options } = useContext(SectionOptionsContext);
    const { openCentralAlert, closeCentralAlert } = useContext(CentralAlertContext);
    const { fileContent, fileToLoad, setFileContent, setInputValue } = useContext(AddPersonalContext);
    const elementRef = useRef();
    useEffect(() => {
        const optionSelected = options.find(option => option.active);
        setSection(optionSelected.value);
        setListSelected(optionSelected.name);
    },[options]);
    useEffect(() => {
        const OnIntersection = (entries, observer) => {
            const firstEntry = entries[0];
            if(!firstEntry.isIntersecting) return;
            let result = fileContent.slice(offset, offset + 30);
            if(result.length === 0) return observer.disconnect();
            setData((data) => [...data, ...result]);
            setOffset((offset) => offset + 30);
        }
        const observer = new IntersectionObserver(OnIntersection);
        observer.observe(elementRef.current);
        return () => {
            if(observer) observer.disconnect();
        }
    },[fileContent, offset]);
    const close = () => {
        setFileContent([]);
        setInputValue('');
        setUploadedFile(false);
        closeCentralAlert();
    }
    const loadFile = async () => {
        if(isLoading) return;
        setIsLoading(true);
        const formData = new FormData();
        formData.append('excel', fileToLoad);
        formData.append('section', section);
        try {
            const result = await axiosInstance.post(`/processExcel`, formData);
            setInserts(result.news);
            setUpdates(result.updateds);
            setFaileds(result.inOtherSection);
            setIsLoading(false);
            setUploadedFile(true);
        } catch (error) {
            openCentralAlert('Error al cargar el archivo',error.message,'error');
            setIsLoading(false);
        }
    }
    return (
        <FileContenContext.Provider value={{
            listSelected,
            elementRef,
            data,
            uploadedFile,
            inserts,
            updates,
            faileds,
            isLoading,
            section,
            loadFile,
            close
        }}>
            {children}
        </FileContenContext.Provider>
    );
}

export default FileContenProvider;