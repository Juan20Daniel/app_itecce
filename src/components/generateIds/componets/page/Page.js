import React, {  useEffect } from 'react';
import imgId from '../../../../assets/studens.jpg';
// import GenerateIdContext from '../../../../context/generateId/GenerateIdContext';
import './page.css';
const Page = React.forwardRef((props, ref) => {
    // const [ frintIds, setFrontIds ] = useState(null);
    // const [ backIds, setBackIds ] = useState(null);
    // const { generateIdState } = useContext(GenerateIdContext);
    // const { selectedPersons } = generateIdState;
    const { promiseResolveRef, isPrinting } = props;
    // useLayoutEffect(() => {
    //     if(selectedPersons.length <= 4) {
    //         let addReverse = [];
    //         for(let i=0; i<=selectedPersons.length-1; i++) {
    //             addReverse.push({idPerson:selectedPersons[i].idPerson, typePerson:'REVERSE'});
    //         }
    //         setFrontIds([...selectedPersons, ...addReverse]);
    //     } else {
    //         setFrontIds(selectedPersons);
    //         const getBackIds = selectedPersons.map(item => {
    //             return {idPerson:item.idPerson, typePerson:'REVERSE'}
    //         });
    //         setBackIds(getBackIds);
    //     }
    // },[selectedPersons]);
    useEffect(() => {
        if(isPrinting && promiseResolveRef.current) {
            promiseResolveRef.current();
        }
    },[isPrinting, promiseResolveRef]);
    return (
        <div ref={ref} className="page">
            <figure className='box-front-id'>
                <img src={imgId} alt='test' className='front-id-img' />
            </figure>
            <figure className='box-front-id'>
                <img src={imgId} alt='test' className='front-id-img' />
            </figure>
            <figure className='box-front-id'>
                <img src={imgId} alt='test' className='front-id-img' />
            </figure>
            <figure className='box-front-id'>
                <img src={imgId} alt='test' className='front-id-img' />
            </figure>
            <figure className='box-front-id'>
                <img src={imgId} alt='test' className='front-id-img' />
            </figure>
            <figure className='box-front-id'>
                <img src={imgId} alt='test' className='front-id-img' />
            </figure>
            <figure className='box-front-id'>
                <img src={imgId} alt='test' className='front-id-img' />
            </figure>
            <figure className='box-front-id'>
                <img src={imgId} alt='test' className='front-id-img' />
            </figure>
            <figure className='box-front-id'>
                <img src={imgId} alt='test' className='front-id-img' />
            </figure>
            <figure className='box-front-id'>
                <img src={imgId} alt='test' className='front-id-img' />
            </figure>
        </div>
    );
})
export default Page;