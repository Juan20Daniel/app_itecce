import SubTitleSetting from "../../../subTitleSetting/SubTitleSetting";
import ListCareers from "./components/listCareers/ListCareers";
import Review from "./components/review/Review";
// import { generateExpireDate } from "../../../../helpers/getGeneralExpireDate";
import './careers.css';
const Careers = () => {
    // const generate = () => {
    //     const data = {
    //         groupStudent:'9LCSM-A',
    //         duration:9,
    //         idSectionClients:1
    //     }
    //     console.log(generateExpireDate(data, 'FEB/26'));
    // }
    return (
        <div className="careers">
            <SubTitleSetting value='Carreras' />
            <div className="box-careers">
                <Review />
                <ListCareers />
            </div>
        </div>
    );
}
export default Careers;