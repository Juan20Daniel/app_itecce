import { useContext } from "react";
import GenerateIdsContext from "../../../../context/generateIds/GenerateIdsContext";
import './notFounds.css';
const NotFounds = () => {
    const { infoIdentityCardNotFound } = useContext(GenerateIdsContext);

    return (
        <div className="not-founds">
            <p className="title">No disponibles para hacer credencial</p>
            <div className="scroll">
                {infoIdentityCardNotFound.map((item, index) => (
                    <span key={item.idClient}>
                        <b>{index+1}: </b>
                        {item.idClient}
                    </span>
                ))}
            </div>
        </div>
    )
}
export default NotFounds;