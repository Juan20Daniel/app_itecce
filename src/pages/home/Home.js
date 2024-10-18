import { useState, useEffect, useRef, useContext } from "react";
import { usePersonsDB } from "../../hooks/usePersonsDB";
import { useSearchPersons } from "../../hooks/useSearchPersons";
import { Link } from "react-router-dom";
import { IconGo } from "../../assets/IconGo";
import axiosInstance from "../../data/remote/axios.instance";
import TitleSection from "../../components/titleSection/TitleSection";
import SearchFor from "../../components/searchFor/SearchFor";
import Section from "../../components/section/Section";
import SelectSection from "../../components/selectSection/SelectSection";
import ActionButtonsGroup from "../../components/actions/ActionButtonsGroup";
import ItemBox from "../../components/itemBox/ItemBox";
import SectionNote from "../../components/sectionNote/SectionNote";
import ColumnsInterseptor from "../../components/columnsInterseptor/ColumnsInterseptor";
import ShowPerson from '../../components/showPerson/ShowPerson';
import NotData from "../../components/notData/NotData";
import Spin from "../../components/spin/Spin";
import ShowSelectedPersons from "../../components/showSelectedPersons/ShowSelectedPersons";
import GenerateIdContext from "../../context/generateId/GenerateIdContext";
import ModalShowPersonContext from "../../context/modalShowPerson/ModalShowPersonContext";
import FormaAddPerson from "../../components/formAddPerson/FormAddPerson";
import BoxSticky from "../../components/boxSticky/BoxSticky";
import BoxOptions from "../../components/boxOptions/BoxOptions";
import './home.css';
const typeSections = {
    students:'alumnos',
    teachers:'profesores',
    collaborators:'colaboradores'
}
const Home = () => {
    const [selectSection, setSelectSection] = useState('students');
    const [idToSearch, setIdToSearch] = useState('');
    const [nameToSearch, setNameToSearch] = useState('');
    const [firstnameToSearch, setFirstnameToSearch] = useState('');
    const [lastnameToSearch, setLastnameToSearch] = useState('');
    const [searchBy, setSearchBy] = useState('search-by-id');
    const [isSearching, setIsSearching] = useState(false);
    const [notData, setNotData] = useState(true);
    const [total, setTotal] = useState(0);
    const {showPerson} = useContext(ModalShowPersonContext);
    const {renderPersons,data,hasMorePersons,isLoadingPersons, remove} = usePersonsDB(selectSection);
    const {generateIdState} = useContext(GenerateIdContext);
    const {showSelectedPersons, showFormAddPerson} = generateIdState;
    const {
        searchResult,
        isLoadingResults,
        interseptorSearch,
        showMoreResults,
        removeItemSerach
    } = useSearchPersons(selectSection,searchBy,idToSearch,nameToSearch,firstnameToSearch,lastnameToSearch);
    const notDataRef = useRef(null);
    useEffect(() => {
        if(idToSearch !== '' || nameToSearch !== '' || firstnameToSearch !== '' || lastnameToSearch !== '') {
            setIsSearching(true);
        } else {
            setIsSearching(false);
        }
    },[idToSearch,nameToSearch,firstnameToSearch,lastnameToSearch]);
    useEffect(() => {
        if(notDataRef.current) setNotData(notDataRef.current.children.length > 0);
    },[isLoadingPersons]);
    //En caso de que cambiemos de sección, podamos pintar los datos
    useEffect(() => {
        setNotData(true);
    },[selectSection]);
    useEffect(() => {
        const getNumTotal = async () => {
            const response = await axiosInstance.get(`/${selectSection}/num-total`);
            setTotal(response.total);
        }
        getNumTotal();
    },[selectSection]);
    const clearSearchInputs = () => {
        setIdToSearch('');
        setNameToSearch('');
        setFirstnameToSearch('');
        setLastnameToSearch('');
    }
    return (
        <Section>
            <TitleSection value="Generar Credenciales" />
            <SectionNote 
                value={"Selecciona a los estudiantes a quienes se les va a generar la credencial, maximo 10."} 
                maxWidth={400}
            />
            <BoxSticky>
                <SearchFor
                    idToSearch={idToSearch}
                    nameToSearch={nameToSearch}
                    firstnameToSearch={firstnameToSearch}
                    lastnameToSearch={lastnameToSearch}
                    searchBy={searchBy}
                    isSearching={isSearching}
                    setSearchBy={setSearchBy}
                    setIdToSearch={setIdToSearch}
                    setNameToSearch={setNameToSearch}
                    setFirstnameToSearch={setFirstnameToSearch}
                    setLastnameToSearch={setLastnameToSearch}
                    clearSearchInputs={clearSearchInputs}
                >
                    {/* Para pintar el resultado de la búsqueda de forma horizontal */}
                    <div className='horizontal-scroll'>
                        {!(searchResult.length === 0 && !isLoadingResults) ?
                            <div className='box-results'>
                                {searchResult.map(item => (
                                    <ItemBox
                                        key={item.idPerson} 
                                        item={item}
                                        remove={removeItemSerach}
                                    />
                                ))}
                                {/* Para pintar un spinner cuando se carga por primera vez */}
                                {(!showMoreResults.current && isLoadingResults) && 
                                    <div className='render'>
                                        <Spin size={30} />
                                    </div>
                                }
                                {/* Para que no haya error cuando carge por primera ves y se puedan mostrar bajo demanda */}
                                {showMoreResults.current &&
                                    <div ref={interseptorSearch} className='render'>
                                        {isLoadingResults && <Spin size={30} />}
                                    </div>
                                }
                            </div>
                        :
                            <NotData>
                                <p className="message">
                                    No se encontro ningún registro que conincida con tu búsqueda en la seccion de <b>{typeSections[selectSection]}.</b>
                                </p>
                            </NotData>
                        }
                    </div>
                </SearchFor>
                <BoxOptions>
                    <SelectSection
                        data={data}
                        total={total}
                        selectSection={selectSection} 
                        setSelectSection={setSelectSection} 
                    />
                    <ActionButtonsGroup section={selectSection} />
                </BoxOptions>
            </BoxSticky>
            {notData ? 
                <div className="home-content-items" ref={notDataRef}>
                    {data.map(item => (
                        <ItemBox
                            key={item.idPerson}
                            item={item}
                            remove={remove}
                        />
                    ))}
                    {/* Para cargar datos bajo demanda */}
                    {hasMorePersons.current && <ColumnsInterseptor elementRef={renderPersons} isLoading={isLoadingPersons} />}
                </div>
            :
                <NotData>
                    <p className="message">
                        No se encontraron {typeSections[selectSection]} registrados por el momento,
                        agrega alguno en el botón de <b>Agregar {typeSections[selectSection]}</b> o en la sección de <b>Cargar lista</b> en el botón de abajo.
                    </p>
                    <Link to='/add-personal' className="btn-go">
                        <span>Agregar</span>
                        <IconGo />
                    </Link>
                </NotData>
            }
            {showPerson && <ShowPerson section={selectSection} /> }
            {showFormAddPerson && <FormaAddPerson section={selectSection} />}
            {showSelectedPersons && <ShowSelectedPersons />}
        </Section>
    );
}

export default Home;