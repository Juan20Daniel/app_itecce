import { useContext } from "react";
import GenerateIdContext from "../../context/generateId/GenerateIdContext";

const GenerateIds = () => {
    const { generateIdState } = useContext(GenerateIdContext);
    const { images } = generateIdState;
    console.log(images);
    return (
        <div className="generate-ids">
            <p>Generar credenciales</p>
        </div>
    );
}

export default GenerateIds;