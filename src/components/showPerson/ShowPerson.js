import PersonInfo from './components/personInfo/PersonInfo';
import LoadImage from './components/loadImage/LoadImage';
import './showPerson.css';
const ShowPerson = ({section}) => {
    return (
        <div className='show-person'>
            <PersonInfo section={section}/>
            <LoadImage />
        </div>
    );
}

export default ShowPerson;