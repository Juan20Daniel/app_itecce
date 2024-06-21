import { useState, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import './itemBox.css';
import MenuPoint from '../menuPoint/MenuPoint';

const ItemBox = ({ item, section, setPersonInfo, setShowPerson }) => {
    const [ personImage, setPersonImage ] = useState('');
    const { idPerson, name, firstname, lastname, avatar } = item;
    const { images } = useSelector(state => state.credenciales);
    useLayoutEffect(() => {
        const getImage = images.find(item => item.idPerson === idPerson);
        setPersonImage(getImage ? getImage.personImage : avatar);
    },[idPerson, images, avatar]);
    const action = () => {
        setPersonInfo(item);
        setShowPerson(true);
    }
    return (
        <div className='home-item'>
            <div className='card'>
                <div className="menu">
                    <MenuPoint options={[
                        {name:'see', value:'Ver', title:false, action:action},
                        {name:'select', value:'Seleccionar', title:false, action:action},
                        {name:'delete', value:'Eliminar', title:false, action:action}]}
                    />
                </div>
                <div className="box-avatar">
                    {personImage.length === 7 ?
                        <div className="avatar" style={{background:avatar}}>
                            <span>E</span>
                        </div>
                        :
                        <figure className='box-img'>
                            <img src={personImage} alt='Img para credencial' className='img' />
                        </figure>
                    }
                </div>
                <div className="type">
                    <span>{section}</span>
                </div>
            </div>
            <div className="info">
                <p>{name} {firstname} {lastname}</p>
                <span>{idPerson}</span>
            </div>
        </div>
    );
}
export default ItemBox;