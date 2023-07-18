import React, { useState, useEffect, useRef } from "react"; 
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactToPrint from "react-to-print";
import PageToPrint from "../../../components/pageToPrint/PageToPrint";
import icontry from '../../../assets/iconTry.png';
import ModalAlert from "../../../components/modalAlert/ModalAlert";
import { setEditExpireDate } from "../../../redux/dataSlice";
import './generateIdsStyles.css';
const GenerateIds = () => {
    const [ joinRverse, setJoinReverse ] = useState(false);
    const [ modalAlert, setModalAlert ] = useState({
        state:false,
        icon:'',
        message:'',
    })
    const [ reverse, setReverse ] = useState(false);
    const { idToMake, editExpireDate } = useSelector(state => state.credenciales);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if(idToMake.length <= 0) navigate('/page/itecce-ids');
        if(idToMake.length > 0 && idToMake.length <= 4) {
            setModalAlert({
                state:true, 
                icon:'ilistrationAdition', 
                message:'Hay espacio suficiente para colocar el reverso en la misma hoja ¿Quieres colocarlo?',
            })
        }
    },[idToMake]);
    useEffect(() => {
        if(!joinRverse) {
            dispatch(setEditExpireDate(false));
        }
    },[joinRverse]);
    const join = () => {
        setJoinReverse(true);
        setModalAlert({
            state:false, 
            icon:'', 
            message:'', 
            actionOK:''
        })
    }
    const componentRef = useRef();
    return (
        <div className="generateIds">
            <div className="page">
                <div className="border-page">
                    <PageToPrint
                        ref={componentRef}
                        data={idToMake}
                        reverse={reverse}
                        joinRverse={joinRverse}
                    />
                </div>
            </div>
            <div className="box-actions">
                <div className="box-btn-goBack">
                    <button className="btn-goBack" onClick={() => navigate('/page/itecce-ids')}>
                        <img src={icontry} alt="icon try" />
                        <span>Volver</span>
                    </button>
                </div>
                <div className="btn-actions">
                    {(reverse || joinRverse) &&
                        <button className="btn-action-print" onClick={() => dispatch(setEditExpireDate(!editExpireDate))}>
                            {editExpireDate ? "Listo" : "Editar vencimiento"}
                        </button>
                    }
                    {(idToMake.length > 0 && idToMake.length <= 4) &&
                        <button className="btn-action-print" onClick={() => setJoinReverse(!joinRverse)}>
                            {!joinRverse ? "Juntar" : "Quitar"} reverso
                        </button>
                    }
                    {!joinRverse &&
                        <button className="btn-action-print" onClick={() => setReverse(!reverse)}>
                            Ver {reverse ? "anverso" : "reverso" }
                        </button>
                    }
                    {!editExpireDate && 
                        <ReactToPrint
                            trigger={() => <button className="btn-action-print btn-print">Imprimir</button>}
                            content={() => componentRef.current}
                        />
                    }
                </div>
            </div>
            <ModalAlert modalAlert={modalAlert}>
                <div className='modal-alert__content--btns'>
                    <button className='modal-alert__not' onClick={() => setModalAlert({state:false, icon:'', message:'', actionOK:''})}>
                        No
                    </button>
                    <button onClick={() => join()}>Si</button>
                </div>
            </ModalAlert>
        </div>
    );
}

export default GenerateIds;