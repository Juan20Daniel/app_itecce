import { useContext } from "react";
import GenerateIdContext from "../../../../context/generateId/GenerateIdContext";
import './notFounds.css';
const NotFounds = () => {
    const { generateIdState } = useContext(GenerateIdContext);
    const { infoIdentityCardNotFound } = generateIdState;
    console.log(infoIdentityCardNotFound);
    return (
        <div className="not-founds">
            <p className="title">No disponibles para hacer credencial</p>
            <div className="scroll">
                {infoIdentityCardNotFound.map((item, index) => (
                    <span key={item.idPerson}>
                        <b>{index+1}: </b>
                        {item.idPerson}
                    </span>
                ))}
            </div>
        </div>
    )
}
export default NotFounds;