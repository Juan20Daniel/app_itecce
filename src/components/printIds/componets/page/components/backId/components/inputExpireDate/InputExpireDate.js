import { useContext, useState, useLayoutEffect } from "react";
import { generateExpireDate } from "../../../../../../../../helpers/generalExpireDate";
import ValidityPeriodsContext from "../../../../../../../../context/validityPeriods/ValidityPeriodsContext";
import './inputExpireDate.css';
const typeClients = {
    1:'students',
    2:'teachers',
    3:'collaborators'
}
const InputExpireDate = ({item, hideStyles}) => {
    const validityPeriods  = useContext(ValidityPeriodsContext);
    const defaultExporeDate = validityPeriods[typeClients[item.idSectionClients]];
    const [ expireDate, setExpireDate ] = useState('');
    const expireDateEdited = (e) => setExpireDate(e.target.value);
    useLayoutEffect(() => {
        let date = generateExpireDate(item, defaultExporeDate);
        setExpireDate(date);
    },[item, defaultExporeDate]);
    return (
        <input
            className={`expireId ${!hideStyles.current && 'input-edit-expire-date'}`} 
            value={expireDate}
            onChange={(e) => expireDateEdited(e)}
            title={`Editar fecha de expiración ${expireDate}`}
        />
    );
}

export default InputExpireDate;