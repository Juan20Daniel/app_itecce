import TitleSection from "../../components/titleSection/TitleSection";
import SearchFor from "../../components/searchFor/SearchFor";
import Section from "../../components/section/Section";
import SelectSection from "../../components/selectSection/SelectSection";
import Actions from "../../components/actions/Actions";
import ItemBox from "../../components/itemBox/ItemBox";
import SectionNote from "../../components/sectionNote/SectionNote";
import ColumnsInterseptor from "../../components/columnsInterseptor/ColumnsInterseptor";
import ShowPerson from '../../components/showPerson/ShowPerson';
import NotData from "../../components/notData/NotData";
import Spin from "../../components/spin/Spin";
import { Link } from "react-router-dom";
import { IconGo } from "../../assets/IconGo";
import { GenerateIdsViewModel } from './GenerateIdsViewModel';
import { IconPoint } from "../../assets/IconPoint";
import './generateIds.css';
const sections = {
    students:{
        one:'alumno',
        all:'alumnos'
    },
    teachers:{
        one:'profesor',
        all:'profesores',
    },
    collaborators:{
        one:'colaborador',
        all:'colaboradores'
    }
}
const Home = () => {
    const {
        selectSection,
        idToSearch,
        nameToSearch,
        firstnameToSearch,
        lastnameToSearch,
        searchBy,
        renderPersons,
        data,
        hasMorePersons,
        isSearching,
        isLoadingPersons,
        notDataRef,
        notData,
        searchResult, 
        isLoadingResults, 
        interseptorSearch, 
        showMoreResults,
        showPerson,
        personInfo,
        setPersonInfo,
        setShowPerson,
        setSearchBy,
        setIdToSearch,
        setNameToSearch,
        setFirstnameToSearch,
        setLastnameToSearch,
        setSelectSection,
        clearSearchInputs
    } = GenerateIdsViewModel();
    return (
        <Section>
            <TitleSection value="Generar Credenciales" />
            <SectionNote value={`Selecciona a los ${sections[selectSection].all} a quienes se les va a generar la credencial, maximo 10.`} />
            <div className='box-sticky'>
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
                                        section='Alumnos'
                                        setPersonInfo={setPersonInfo}
                                        setShowPerson={setShowPerson}
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
                                    No se encontro ningún registro que conincida con tu búsqueda en la seccion de <b>{sections[selectSection].all}.</b>
                                </p>
                            </NotData> 
                        }
                    </div>
                </SearchFor>
                <div className="box-options">
                    <div className="box-select-type">
                        <SelectSection 
                            selectSection={selectSection} 
                            setSelectSection={setSelectSection} 
                        />
                        <IconPoint size={5} />
                        <p>500 de 2540</p>
                    </div>
                    <Actions section={sections[selectSection]} />
                </div>
            </div>
            {notData ? 
                <div className="home-content-items" ref={notDataRef}>
                    {data.map(item => (
                        <ItemBox
                            key={item.idPerson}
                            item={item}
                            section={sections[selectSection].one}
                            setPersonInfo={setPersonInfo}
                            setShowPerson={setShowPerson}
                        />
                    ))}
                    {/* Para cargar datos bajo demanda */}
                    {hasMorePersons.current && <ColumnsInterseptor elementRef={renderPersons} isLoading={isLoadingPersons} />}
                </div>
            :
                <NotData>
                    <p className="message">
                        No se encontraron {sections[selectSection].all} registrados por el momento,
                        agrega alguno en el botón de <b>Agregar {sections[selectSection].one}</b> o en la sección de <b>Cargar lista</b> en el botón de abajo.
                    </p>
                    <Link to='/add-personal' className="btn-go">
                        <span>Agregar</span>
                        <IconGo />
                    </Link>
                </NotData>
            }
            {showPerson && <ShowPerson setShowPerson={setShowPerson} personInfo={personInfo} />}
        </Section>
    );
}

export default Home;