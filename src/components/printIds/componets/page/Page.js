import React, {  useEffect } from 'react';
import FrontId from './components/frontId/FrontId';
import BackId from './components/backId/BackId';
import './page.css';
const Page = React.forwardRef((props, ref) => {
    const { promiseResolveRef, isPrinting, pages, currentPage, hideStyles, showBack } = props;
    useEffect(() => {
        if(isPrinting && promiseResolveRef.current) {
            promiseResolveRef.current();
        }
    },[isPrinting, promiseResolveRef]);
    return (
        <div ref={ref} className="page">
            {pages[currentPage]?.page.map((infoIdentity, index) => {
                //La primera validación es para imprimir el reverso de cada hoja cuando hay 5 o más credenciales.
                //la segunda validación es para juntar la parte delanteras con la trasera en una sola hoja, lo cual sucede cuando son 4 o menos credenciales.
                if((showBack && pages[currentPage]?.reverse) || (infoIdentity.typeCard === 'reverse' && !pages[currentPage]?.reverse)) {
                    return <BackId 
                        item={infoIdentity} 
                        position={(!pages[currentPage]?.reverse && pages[currentPage]?.page.length === 6 ) ? index+1 : index}
                        key={index} 
                        hideStyles={hideStyles}
                    />
                }
                return <FrontId item={infoIdentity} key={index} />
            })}
            {pages[currentPage]?.page.length === 0 &&
                <div className='credentials-not-found'>
                    <p>No hay credenciales para imprimir</p>
                </div>
            }
        </div>
    );
})
export default Page;