import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { statePage, getIdToGenerate, activeAlert } from "../../../redux/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import SearchFor from "../../../components/searchFor/SearchFor";
import ItemInfoExcel from '../../../components/itemInfoExcel/ItemInfoExcel';
import iconGroup from '../../../assets/iconGroup.png';
import './homeIdsStyles.css';
import Identification from "../../../components/identification/Identification";
import { requestHTTP } from "../../../api";
import ModalLoadImage from "../../../components/modalLoadImage/ModalLoadImage";
import iconLoader from '../../../assets/iconLoader.png';
import NotData from "../../../components/notData/NotData";
import { searchFor, checkCamps, select, addProperty } from "../../../functions";
const HomeIds = () => {
    const [ searchName, setSearchName ] = useState('');
    const [ searchFirstname, setSearchFirstname ] = useState('');
    const [ searchLastname, setSearchLastname ] = useState('');
    const [ searchId, setSearchId ] = useState('');
    const [ searchUserName, setSearchUserName ] = useState('');
    const [ isLooking, setIsLooking ] = useState(false);
    const [ selectSearch, setSelectSearch ] = useState('names');
    const [ clients, setClients ] = useState(false);
    const [ isPending, setIsPending ] = useState(false);
    const [ idToSelection, setIdToSelection ] = useState(0);
    const [ count, setCount ] = useState(0);
    const [ modalLoadImage, setModalLoadImage ] = useState({ visible:false, infoStudent:false });
    const [ resultSearch, setResultSearch ] = useState(false);
    const [ listSelected, setListSelected ] = useState(false);
    const [ showBtnClearInputs, setBtnClearInputs ] = useState(1);
    const [ selectMembers, setSelectMembers ] = useState([
        { id:1, active:true, client:"studens" },
        { id:2, active:false, client:"teachers" },
        { id:3, active:false, client:"collaborators" },
    ]);
    const { idToMake } = useSelector(state => state.credenciales);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getIdToGenerate([]));
    },[]);
    useEffect(() => {
        if(resultSearch) {
            const refreshDataSearch = resultSearch.map(value => value.idClient === modalLoadImage.infoStudent.idClient ? modalLoadImage.infoStudent : value);
            setResultSearch(refreshDataSearch);
        }
    },[modalLoadImage]);
    useEffect(() => {
        const getNameList = selectMembers.filter(value => value.active);
        setListSelected(getNameList[0].client);
    },[selectMembers]);
    useEffect(() => {
        const valuesToSearch = {
            searchName:searchName.toUpperCase().replace(/ /g, ''),
            searchFirstname:searchFirstname.toUpperCase().replace(/ /g, ''),
            searchLastname:searchLastname.toUpperCase().replace(/ /g, ''),
            searchId:searchId.replace(/ /g, ''),
            searchUserName:searchUserName.toUpperCase().replace(/ /g, ''),
        }
        setBtnClearInputs(hasDuplicate(Object.values(valuesToSearch)));
        if(clients) {
            const result = searchFor(selectSearch, valuesToSearch, clients, listSelected);
            setResultSearch(result);
        }
        setIsLooking(checkCamps(valuesToSearch));
    }, [selectSearch,searchName,searchFirstname,searchLastname,searchId,searchUserName,listSelected]);
    useEffect(() => {
        clearInputsSearch();
    },[selectSearch]);
    useEffect(() => {
        if(clients) {
            if(Array.isArray(clients.data[selectMembers[idToSelection].client])) {
                setCount(clients.data[selectMembers[idToSelection].client].length);
            } else {
                setCount(0);
            }
        }
    },[clients, idToSelection, selectMembers]);
    useEffect(() => {
        setIsPending(true);
        const getData = async () => {
            const result = await requestHTTP('http://localhost:3000/api/get-studens', 'GET');
            const newObject = {
                studens:addProperty(result.data.studens),
                teachers:addProperty(result.data.teachers),
                collaborators:addProperty(result.data.collaborators)
            }
            setClients({...result, data:newObject});
            setIsPending(false);
        }
        getData();
    },[])
    useEffect(() => {
        dispatch(statePage({ id:2, active:true }));
    },[dispatch]);
    const hasDuplicate = array => new Set(array);
    const selectorMember = (id) => {
        const result = select(selectMembers, id);
        setIdToSelection(id - 1);
        setSelectMembers(result);
    }
    const clearInputsSearch = () => {
        setSearchName('');
        setSearchFirstname('');
        setSearchLastname('');
        setSearchId('');
        setSearchUserName('');
    }
    const deselect = () => {
        const newObject = {
            studens:addProperty(clients.data.studens),
            teachers:addProperty(clients.data.teachers),
            collaborators:addProperty(clients.data.collaborators)
        }
        const resultupdate = resultSearch && addProperty(resultSearch);
        setResultSearch(resultupdate);
        setClients({error:false, data:newObject});
        dispatch(getIdToGenerate([]));
    }
    const goToIdsGenerator = () => {
        if(idToMake.length <= 0) return dispatch(activeAlert({ active:true, icon:'iconError', message:'Tiene que haber almenos un alumno seleccionado para generar credenciales.' }));
        navigate('generate-ids');
    }
    return (
        <div className="content-itecceids">
            {modalLoadImage.infoStudent &&
                <ModalLoadImage 
                    modalLoadImage={modalLoadImage} 
                    setModalLoadImage={setModalLoadImage}
                    setClients={setClients}
                />
            }
            <SearchFor 
                selectSearch={selectSearch}
                setSelectSearch={setSelectSearch}
                searchName={searchName}
                setSearchName={setSearchName}
                searchFirstname={searchFirstname}
                setSearchFirstname={setSearchFirstname}
                searchLastname={searchLastname}
                setSearchLastname={setSearchLastname}
                searchId={searchId}
                setSearchId={setSearchId}
                searchUserName={searchUserName}
                setSearchUserName={setSearchUserName}
                showBtnClearInputs={showBtnClearInputs}
                clearInputsSearch={clearInputsSearch}
            />
            <div className="helpers">
                <div className="box-helpers">
                    <ItemInfoExcel icon={iconGroup} name="Total registrados" value={count} />
                    <button className={`type-id ${selectMembers[0].active && "active-op"}`} onClick={() => selectorMember(1)}>
                        Alumnos
                    </button>
                    <button className={`type-id ${selectMembers[1].active && "active-op"}`} onClick={() => selectorMember(2)}>
                        Profesores
                    </button>
                    <button className={`type-id ${selectMembers[2].active && "active-op"}`} onClick={() => selectorMember(3)}>
                        Colaboradores
                    </button>
                </div>
                <div className="box-btn-generate">
                    {idToMake.length > 0 && <button className="btn-deselect" onClick={() => deselect()}>Deseleccionar todo</button>}
                    <button className="btn-generate" onClick={() => goToIdsGenerator()}>Generar credenciales {idToMake.length}/10</button>
                </div>
            </div>
            {isLooking ? 
                <div className="identifications">
                    {resultSearch ?
                        resultSearch.map(client => {
                            return (
                                <Identification 
                                    key={client.idClient} 
                                    data={client}
                                    setModalLoadImage={setModalLoadImage}
                                    clients={clients} 
                                    setClients={setClients}
                                />
                            )
                        })
                        :
                        <NotData value="No hay registros en donde buscar"/>
                    }
                    {resultSearch.length === 0 && 
                        <NotData value="Ningun registro coincide con lo que estas buscando"/>
                    }                    
                </div>
                :
                <div className="identifications">
                    {clients && !isPending ?
                        Array.isArray(clients.data[selectMembers[idToSelection].client]) ?
                            clients.data[selectMembers[idToSelection].client].map(client => {
                                return (
                                    <Identification 
                                        key={client.idClient} 
                                        data={client}
                                        modalLoadImage={modalLoadImage} 
                                        setModalLoadImage={setModalLoadImage}
                                        clients={clients} 
                                        setClients={setClients}
                                    />
                                )
                            })
                            :
                            <NotData value={clients.data[selectMembers[idToSelection].client]}/>
                        :
                        <div className="isLoading">
                            <img src={iconLoader} alt="icon loader" />
                        </div>
                    }
                </div>
            }
        </div>
    );
}

export default HomeIds;