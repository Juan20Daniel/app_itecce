import { useContext, useState, useEffect, useRef } from "react";
import AddPersonalContext from "../../context/addPersonal/AddPersonalContext";
import HeaderFileContent from './components/headerFileContent/HeaderFileContent';
import FileContent from './components/fileContent/FileContent';
import FooterFileContent from './components/footerFileContent/FooterFileContent';
import axiosInstance from "../../data/remote/axios.instance";
import CentralAlertContext from "../../context/centralAlert/CentralAlertContext";
import SectionOptionsContext from "../../context/sectionOptions/SectionOptionsContext";
import './showFileContent.css';
const ShowFileContent = () => {
    const [ offset, setOffset ] = useState(0);
    const [ data, setData ] = useState([]);
    const [ listSelected, setListSelected ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const [ uploadedFile, setUploadedFile ] = useState(false);
    const [ inserts, setInserts ] = useState(0);
    const [ updates, setUpdates ] = useState(0);
    const [ faileds, setFaileds ] = useState([]);
    const [ section, setSection ] = useState('');
    const { openCentralAlert, closeCentralAlert } = useContext(CentralAlertContext);
    const { options } = useContext(SectionOptionsContext);
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
        <div className='file-content'>
            <HeaderFileContent close={close} />
            <FileContent 
                listSelected={listSelected}
                elementRef={elementRef}
                data={data}
            />
            <FooterFileContent 
                uploadedFile={uploadedFile}
                inserts={inserts}
                updates={updates}
                faileds={faileds}
                isLoading={isLoading}
                section={section}
                loadFile={loadFile}
                close={close} 
            />
        </div>
    );
}
export default ShowFileContent;