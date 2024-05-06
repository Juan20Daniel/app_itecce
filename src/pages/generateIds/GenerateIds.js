import TitleSection from "../../components/titleSection/TitleSection";
import SearchFor from "../../components/searchFor/SearchFor";
import Section from "../../components/section/Section";
import SelectType from "../../components/selectType/SelectType";
import { IconPoint } from "../../assets/IconPoint";
import Actions from "../../components/actions/Actions";
import HomeItem from "../../components/homeItem/HomeItem";
import SectionNote from "../../components/sectionNote/SectionNote";
import './generateIds.css';
const Home = () => (
    <Section>
        <TitleSection value="Generar Credenciales" />
        <SectionNote value="Selecciona a los alumnos a quienes se les va a generar la credencial, maximo 10." />
        <div className='box-sticky'>
            <SearchFor />
            <div className="box-options">
                <div className="box-select-type">
                    <SelectType />
                    <IconPoint size={5} />
                    <p>500 de 2540</p>
                </div>
                <Actions />
            </div>
        </div>
        <div className="home-content-items">
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
        </div>
    </Section>
)

export default Home;