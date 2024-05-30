import './homeItem.css';
import MenuPoint from '../menuPoint/MenuPoint';

const sections = {
    students:'Alumno',
    teachers:'Profesor',
    collaborators:'Colaborador'
}

const HomeItem = ({ item, selectSection }) => {
    const { idPerson, name, firstname, lastname, avatar } = item;
    const action = () => {
        console.log("action")
    }
    return (
        <div className='home-item'>
            <div className='card'>
                <div className="menu">
                    <MenuPoint options={[
                        {name:'see', value:'Ver', title:false, action:action},
                        {name:'delete', value:'Eliminar', title:false, action:action}]} 
                    />
                </div>
                <div className="box-avatar">
                    <div className="avatar" style={{background:avatar}}>
                        <span>E</span>
                    </div>
                </div>
                <div className="type">
                    <span>{sections[selectSection]}</span>
                </div>
            </div>
            <div className="info">
                <p>{name} {firstname} {lastname}</p>
                <span>{idPerson}</span>
            </div>
        </div>
    );
}
export default HomeItem;