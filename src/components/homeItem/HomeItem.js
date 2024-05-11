import './homeItem.css';
import MenuPoint from '../menuPoint/MenuPoint';

const HomeItem = () => {
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
                    <div className="avatar">
                        <span>E</span>
                    </div>
                </div>
                <div className="type">
                    <span>Alumno</span>
                </div>
            </div>
            <div className="info">
                <p>ALEXANDER HERNADEZ GONZALEZ</p>
                <span>1610334</span>
            </div>
        </div>
    );
}
export default HomeItem;