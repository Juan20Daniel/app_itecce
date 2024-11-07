import ItemBox from '../itemBox/ItemBox';
import './homeItems.css';
const HomeItems = () => {
    return (
        <div className='home-items'>
            <ItemBox 
                item={{
                    idPerson:1612334, 
                    name:'CARLOS ALFREDO', 
                    firstname:'CHAVEZ', 
                    lastname:'MOLINA', 
                    typePerson:'STUDENT', 
                    avatar:'#000000'
                }}
                remove={() => console.log('removing...')}
            />
             <ItemBox 
                item={{
                    idPerson:1612334, 
                    name:'CARLOS ALFREDO', 
                    firstname:'CHAVEZ', 
                    lastname:'MOLINA', 
                    typePerson:'STUDENT', 
                    avatar:'#000000'
                }}
                remove={() => console.log('removing...')}
            />
             <ItemBox 
                item={{
                    idPerson:1612334, 
                    name:'CARLOS ALFREDO', 
                    firstname:'CHAVEZ', 
                    lastname:'MOLINA', 
                    typePerson:'STUDENT', 
                    avatar:'#000000'
                }}
                remove={() => console.log('removing...')}
            />
             <ItemBox 
                item={{
                    idPerson:1612334, 
                    name:'CARLOS ALFREDO', 
                    firstname:'CHAVEZ', 
                    lastname:'MOLINA', 
                    typePerson:'STUDENT', 
                    avatar:'#000000'
                }}
                remove={() => console.log('removing...')}
            />
             <ItemBox 
                item={{
                    idPerson:1612334, 
                    name:'CARLOS ALFREDO', 
                    firstname:'CHAVEZ', 
                    lastname:'MOLINA', 
                    typePerson:'STUDENT', 
                    avatar:'#000000'
                }}
                remove={() => console.log('removing...')}
            />
             <ItemBox 
                item={{
                    idPerson:1612334, 
                    name:'CARLOS ALFREDO', 
                    firstname:'CHAVEZ', 
                    lastname:'MOLINA', 
                    typePerson:'STUDENT', 
                    avatar:'#000000'
                }}
                remove={() => console.log('removing...')}
            />
        </div>
    )
}

export default HomeItems;