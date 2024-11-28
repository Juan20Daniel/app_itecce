import { useContext, useState } from "react";
import ValidityPeriodsContext from "../../../../../../context/validityPeriods/ValidityPeriodsContext";
import './inputExpireDate.css';
const typeClients = {
    "STUDENT":'students',
    "TEACHER":'teachers',
    "COLABORATOR":'collaborators'
}
const InputExpireDate = ({item, hideStyles}) => {
    const validityPeriods  = useContext(ValidityPeriodsContext);
    const [ expireDate, setExpireDate ] = useState(validityPeriods[typeClients[item.typePerson]]);
    const expiryDateEdited = (e) => {
        setExpireDate(e.target.value)
    }
    return (
        <input
            className={`expireId ${!hideStyles.current && 'input-edit-expire-date'}`} 
            value={expireDate}
            onChange={(e) => expiryDateEdited(e)}
            title={`Editar fecha de expiración ${expireDate}`}
        />
    );
}

export default InputExpireDate;