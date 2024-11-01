import { useContext } from "react";
import TitleSection from "../../components/titleSection/TitleSection";
import Section from "../../components/section/Section";
import SectionNote from "../../components/sectionNote/SectionNote";
import ShowPerson from '../../components/showPerson/ShowPerson';
import ModalShowPersonContext from "../../context/modalShowPerson/ModalShowPersonContext";
import FormaAddPerson from "../../components/formAddPerson/FormAddPerson";
import HomeOptions from "../../components/homeOptions/HomeOptions";
import HomeContext from "../../context/home/HomeContext";
import './home.css';

const Home = () => {
    // const [notData, setNotData] = useState(true);
    // const [total, setTotal] = useState(0);
    const {showPerson} = useContext(ModalShowPersonContext);
    const {homeState} = useContext(HomeContext);
    const {showFormAddPerson} = homeState;
    // const notDataRef = useRef(null);
    // useEffect(() => {
    //     if(notDataRef.current) setNotData(notDataRef.current.children.length > 0);
    // },[isLoadingPersons]);
    //En caso de que cambiemos de sección, podamos pintar los datos
    // useEffect(() => {
    //     setNotData(true);
    // },[sectionSelected]);
    // useEffect(() => {
    //     const getNumTotal = async () => {
    //         const response = await axiosInstance.get(`/${selectSection}/num-total`);
    //         setTotal(response.total);
    //     }
    //     getNumTotal();
    // },[selectSection]);
    return (
        <Section>
            <TitleSection value="Inicio" />
            <SectionNote 
                value={"Presiona en ver para revisas la información del alumno, así como el estado de la credencial."} 
                maxWidth={500}
            />
            <HomeOptions />
            {/* {notData ? 
                <div className="home-content-items" ref={notDataRef}>
                    {data.map(item => (
                        <ItemBox
                            key={item.idPerson}
                            item={item}
                            remove={remove}
                        />
                    ))} */}
                    {/* Para cargar datos bajo demanda */}
                    {/* {hasMorePersons.current && <ColumnsInterseptor elementRef={renderPersons} isLoading={isLoadingPersons} />}
                </div> */}
            
                {/* <NotData>
                    <p className="message">
                        No se encontraron {typeSections[selectSection]} registrados por el momento,
                        agrega alguno en el botón de <b>Agregar {typeSections[selectSection]}</b> o en la sección de <b>Cargar lista</b> en el botón de abajo.
                    </p>
                    <Link to='/add-personal' className="btn-go">
                        <span>Agregar</span>
                        <IconGo />
                    </Link>
                </NotData> */
            }
            {showPerson && <ShowPerson /> }
            {showFormAddPerson && <FormaAddPerson />}
        </Section>
    );
}

export default Home;