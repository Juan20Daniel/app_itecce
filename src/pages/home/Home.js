import { useState, useEffect, useRef, useContext } from "react";
import { usePersonsDB } from "../../hooks/usePersonsDB";
import { Link } from "react-router-dom";
import { IconGo } from "../../assets/IconGo";
import axiosInstance from "../../data/remote/axios.instance";
import TitleSection from "../../components/titleSection/TitleSection";
import SearchFor from "../../components/searchFor/SearchFor";
import Section from "../../components/section/Section";
import SelectSection from "../../components/selectSection/SelectSection";
import ItemBox from "../../components/itemBox/ItemBox";
import SectionNote from "../../components/sectionNote/SectionNote";
import ColumnsInterseptor from "../../components/columnsInterseptor/ColumnsInterseptor";
import ShowPerson from '../../components/showPerson/ShowPerson';
import NotData from "../../components/notData/NotData";
import GenerateIdContext from "../../context/generateId/GenerateIdContext";
import ModalShowPersonContext from "../../context/modalShowPerson/ModalShowPersonContext";
import FormaAddPerson from "../../components/formAddPerson/FormAddPerson";
import BoxSticky from "../../components/boxSticky/BoxSticky";
import BoxOptions from "../../components/boxOptions/BoxOptions";
import BtnAction from "../../components/btnAction/BtnAction";
import './home.css';
const typeSections = {
    students:'alumnos',
    teachers:'profesores',
    collaborators:'colaboradores'
}
const Home = () => {
    const [selectSection, setSelectSection] = useState('students');
    const [notData, setNotData] = useState(true);
    const [total, setTotal] = useState(0);
    const {showPerson} = useContext(ModalShowPersonContext);
    const {renderPersons,data,hasMorePersons,isLoadingPersons, remove} = usePersonsDB(selectSection);
    const {generateIdState, formAddPerson} = useContext(GenerateIdContext);
    const {showFormAddPerson} = generateIdState;
    const notDataRef = useRef(null);
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
    return (
        <Section>
            <TitleSection value="Inicio" />
            <SectionNote 
                value={"Presiona en ver para revisas la información del alumno, así como el estado de la credencial."} 
                maxWidth={500}
            />
            <BoxSticky>
                <SearchFor />
                <BoxOptions>
                    <SelectSection
                        data={data}
                        total={total}
                        selectSection={selectSection} 
                        setSelectSection={setSelectSection} 
                    />
                    <div className="box-btn-add">
                        <BtnAction 
                            value='Agregar' 
                            color='white' 
                            action={() => formAddPerson(true)} 
                        />
                    </div>
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
        </Section>
    );
}

export default Home;