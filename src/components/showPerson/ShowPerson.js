import PersonInfo from './components/personInfo/PersonInfo';
import LoadImage from './components/loadImage/LoadImage';
import './showPerson.css';
const ShowPerson = ({personInfo, setShowPerson}) => {
    return (
        <div className='show-person'>
            <PersonInfo 
                personInfo={personInfo}
                setShowPerson={setShowPerson} 
            />
            <LoadImage 
                personInfo={personInfo} 
            />
        </div>
    );
}

export default ShowPerson;