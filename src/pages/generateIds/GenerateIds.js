import TitleSection from "../../components/titleSection/TitleSection";
import SearchFor from "../../components/searchFor/SearchFor";
import Section from "../../components/section/Section";
import SelectSection from "../../components/selectSection/SelectSection";
import Actions from "../../components/actions/Actions";
import HomeItem from "../../components/homeItem/HomeItem";
import SectionNote from "../../components/sectionNote/SectionNote";
import Interseptor from "../../components/interseptor/Interseptor";
import NotData from "../../components/notData/NotData";
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
        elementRef,
        data, 
        hasMore,
        isLoading,
        notdataRef,
        notData,
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
                    setSearchBy={setSearchBy}
                    setIdToSearch={setIdToSearch}
                    setNameToSearch={setNameToSearch}
                    setFirstnameToSearch={setFirstnameToSearch}
                    setLastnameToSearch={setLastnameToSearch}
                    clearSearchInputs={clearSearchInputs}
                />
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
            <div className="home-content-items" ref={notdataRef}>
                {data.map(item => (
                    <HomeItem 
                        key={item.idPerson} 
                        item={item} 
                        section={sections[selectSection].one} 
                    />
                ))}
                {hasMore.current && <Interseptor elementRef={elementRef} isLoading={isLoading} />}
                {notData && <NotData>
                    <p className="message">
                        No se encontraron {sections[selectSection].all} registrados por el momento, 
                        agrega alguno en el botón de <b>Agregar {sections[selectSection].one}</b> o en la sección de <b>Cargar lista</b> en el botón de abajo.
                    </p>
                    <Link to='/add-personal' className="btn-go">
                        <span>Agregar</span>
                        <IconGo />
                    </Link>
                </NotData>}
            </div>
        </Section>
    )
}

export default Home;