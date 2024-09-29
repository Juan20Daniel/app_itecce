import React, { useContext, useLayoutEffect, useEffect, useState } from 'react';
import GenerateIdContext from '../../../../context/generateId/GenerateIdContext';
import FrontId from '../frontId/FrontId';
import BackId from '../backId/BackId';
import './content.css';

const Content = React.forwardRef((props, ref) => {
    const [ frintIds, setFrontIds ] = useState(null);
    const [ backIds, setBackIds ] = useState(null);
    const { generateIdState } = useContext(GenerateIdContext);
    const { selectedPersons } = generateIdState;
    const { promiseResolveRef, isPrinting, showBack, hideStyles } = props;
    useLayoutEffect(() => {
        if(selectedPersons.length <= 4) {
            let addReverse = [];
            for(let i=0; i<=selectedPersons.length-1; i++) {
                addReverse.push({idPerson:selectedPersons[i].idPerson, typePerson:'REVERSE'});
            }
            setFrontIds([...selectedPersons, ...addReverse]);
        } else {
            setFrontIds(selectedPersons);
            const getBackIds = selectedPersons.map(item => {
                return {idPerson:item.idPerson, typePerson:'REVERSE'}
            });
            setBackIds(getBackIds);
        }
    },[selectedPersons]);
    useEffect(() => {
        if(isPrinting && promiseResolveRef.current) {
            promiseResolveRef.current();
        }
    },[isPrinting, promiseResolveRef]);
    return (
        <div ref={ref} className='box-ids'>
            {!showBack &&
                frintIds?.map((item, index) => {
                    if(item.typePerson !== 'REVERSE') {
                        return <FrontId key={index} position={index} item={item} showBack={showBack} />
                    } else {
                        return <BackId
                            key={index}
                            position={selectedPersons.length !== 3 ? index : index + 1}
                            item={item}
                            showBack={showBack}
                            hideStyles={hideStyles}
                        />
                    }
                })
            }
            {showBack &&
                backIds?.map((item, index) => (
                    <BackId 
                        key={index}
                        position={index}
                        item={item}
                        showBack={showBack}
                        hideStyles={hideStyles}
                    />
                ))
            }
        </div>
    );
})

export default Content;