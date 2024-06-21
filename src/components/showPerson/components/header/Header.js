import { useState } from 'react';
import { IconX } from '../../../../assets/iconX';
import { IconCopy } from '../../../../assets/IconCopy';
import { IconDobbleCheck } from '../../../../assets/IconDobbleCheck';
import './header.css';
const Header = ({idPerson, setShowPerson}) => {
    const [ isCopying, setIsCopying ] = useState(false);
    const copyId = () => {
        navigator.clipboard.writeText(idPerson);
        setIsCopying(true);
        setTimeout(() => {
            setIsCopying(false);
        },1000)
    }
    return (
        <div className='header'>
            <div className='box-id'>
                <p className='label'>Matrícula</p>
                <p className='value'>{idPerson}</p>
                <button className={`btn-copy ${isCopying && "id-copied"}`} onClick={() => copyId()}>
                    <span>Copiar</span>
                    {isCopying ? <IconDobbleCheck /> : <IconCopy />}
                </button>
            </div>
            <button className='btn-close' onClick={() => setShowPerson(false)} title='Cerrar'>
                <IconX size={20} />
            </button>
        </div>
    )
}

export default Header;