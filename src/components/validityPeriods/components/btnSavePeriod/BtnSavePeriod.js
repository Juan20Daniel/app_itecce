import React from "react";
import { IconSave } from "../../../../assets/IconSave";
import Spin from "../../../spin/Spin";
import './btnSavePeriod.css';
const BtnSavePeriod = ({isLoading}) => {
    return (
        <button type='submit' className="btn-save-period">
            {isLoading 
                ? <Spin size={17} />
                : <span>Guardar</span>
            }
            <IconSave size={20} color="#000000" />
        </button>
    );
}

export default React.memo(BtnSavePeriod);