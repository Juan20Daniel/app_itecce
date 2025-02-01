import Subtitle from "../subTitle/SubTitle";
import ListCareers from "./components/listCareers/ListCareers";
import Review from "./components/review/Review";
const Careers = () => {
    return (
        <div className="careers">
            <Subtitle value='Carreras' />
            <div className="box-careers">
                <Review />
                <ListCareers />
            </div>
        </div>
    );
}
export default Careers;