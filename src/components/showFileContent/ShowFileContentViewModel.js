import { useContext, useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setModalShowFile, setCentralAlert } from "../../redux/dataSlice";
import { downloadExcel } from "../../functions";
import AddPersonalContext from "../../context/addPersonal/AddPersonalContext";
import axiosInstance from "../../data/remote/axios.instance";
export const ShowFileContentViewModel = () => {
    const [ offset, setOffset ] = useState(0);
    const [ data, setData ] = useState([]);
    const [ listSelected, setListSelected ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const [ uploadedFile, setUploadedFile ] = useState(false);
    const [ inserts, setInserts ] = useState(0);
    const [ updates, setUpdates ] = useState(0);
    const [ faileds, setFaileds ] = useState([]);
    const [ section, setSection ] = useState('')
    const elementRef = useRef();
    const { fileContent, nameExcel, options, fileToLoad } = useContext(AddPersonalContext);
    const dispatch = useDispatch();
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
        setUploadedFile(false);
        dispatch(setModalShowFile(false));
    }
    const loadFile = async () => {
        if(isLoading) return;
        setIsLoading(true);
        const formData = new FormData();
        formData.append('excel', fileToLoad);
        formData.append('section', section)
        try {
            const result = await axiosInstance.post(`/${section}`, formData);
            console.log(result);
            setInserts(result.registered);
            setUpdates(result.updateds);
            setFaileds(result.inOtherSection);
            setIsLoading(false);
            setUploadedFile(true);
        } catch (error) {
            console.log(error);
            dispatch(setCentralAlert({
                visible:true, 
                title:'Error al cargar el archivo', 
                message:error.message, 
                type:'error'
            }));
            setIsLoading(false);
        }
    }
    return {fileContent, data, elementRef, nameExcel, listSelected, isLoading, uploadedFile, inserts, updates, faileds,section, close, loadFile, downloadExcel}
}