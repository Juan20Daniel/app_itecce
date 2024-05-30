import TitleSection from "../../components/titleSection/TitleSection";
import SearchFor from "../../components/searchFor/SearchFor";
import Section from "../../components/section/Section";
import SelectSection from "../../components/selectSection/SelectSection";
import Actions from "../../components/actions/Actions";
import HomeItem from "../../components/homeItem/HomeItem";
import SectionNote from "../../components/sectionNote/SectionNote";
import Interseptor from "../../components/interseptor/Interseptor";
import { GenerateIdsViewModel } from './GenerateIdsViewModel';
import { IconPoint } from "../../assets/IconPoint";

import './generateIds.css';
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
        isLoading,
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
            <SectionNote value="Selecciona a los alumnos a quienes se les va a generar la credencial, maximo 10." />
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
                    <Actions />
                </div>
            </div>
            <div className="home-content-items">
                {data.map(item => (
                    <HomeItem key={item.idPerson} item={item} selectSection={selectSection} />
                ))}
                <Interseptor elementRef={elementRef} isLoading={isLoading} />
            </div>
        </Section>
    )
}

export default Home;