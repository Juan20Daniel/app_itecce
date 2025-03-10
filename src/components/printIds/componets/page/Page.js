import React, {  useContext, useEffect } from 'react';
import FrontId from './components/frontId/FrontId';
import BackId from './components/backId/BackId';
import CredentialsSheetContext from '../../../../context/credentialsSheet/CredentialsSheetContext';
import PrintContext from '../../../../context/print/PrintContext';
import CredencialsNotFound from './components/credencialsNotFound/CredencialsNotFound';
import './page.css';

const Page = React.forwardRef(() => {
    const {componentRef, promiseResolveRef, hideStyles } = useContext(PrintContext);
    const { pages, currentPage, showBack, isPrinting } = useContext(CredentialsSheetContext);
    useEffect(() => {
        if(isPrinting && promiseResolveRef.current) {
            promiseResolveRef.current();
        }
    },[isPrinting, promiseResolveRef]);
    return (
        <div ref={componentRef} className="page">
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
                <CredencialsNotFound />
            }
        </div>
    );
});

export default Page;